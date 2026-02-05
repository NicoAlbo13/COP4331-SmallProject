// retrieve user info saved during login
const current_name = sessionStorage.getItem("name");
const userID = sessionStorage.getItem("userID");

// caching elements to avoid repeat lookups
const searchInput = document.getElementById("search");
const contacts = document.querySelector(".contacts");

// option filter
const chooseFilter = document.querySelector(".filterOption");
const menuFilter =  document.getElementById("filterMenu");



// Debugging to check if info is being pulled

//console.log("Debug - Name in storage:", current_name);
//console.log("Debug - ID in storage:", userID);

// **************************NOTE***********************************************
// REMOVE the comments on USER CHECK for the server version to work

// IF working on LOCAL keep USER CHECK as comments since you wont be able to 
// access account.html without verifying user



//------------------USER CHECK----------------------------------------------------------------------------------------------------

if(!userID){
    window.location.href = "index.html";

}
else{
    document.getElementById("accountName").innerHTML = current_name || "User"
}




//---------- format the phone number to show the required (555-555-5555)
function formatPhone(phoneString){

    // get rid of non nuumeric (saftey check basically)
    const clean = ('' + phoneString).replace(/\D/g, ''); // get every char not a digit 

    // check for length
    const correctLength = clean.match(/^(\d{3})(\d{3})(\d{4})$/); // group the digits into groups that matches the format 555-555-5555

    if(correctLength){
        return correctLength[1] + '-' + correctLength[2] + '-' + correctLength[3];

    }

    return phoneString;
}






// Gets contacts from DB based on a search string
//DEBUG: console.log("Sending search for User ID", userID);

async function fetchContacts(query = "") {
    try{

        // send POST request and current user id
        const response = await fetch('LAMPAPI/searchContacts.php', {

            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({search: query, userID: userID})

        });

        if(!response.ok){
            throw new Error("Server Error: " + response.status);
        }

        // Parse the JSON response from PHP

        const data = await response.json();

        // Clear container before rendering
        contacts.innerHTML ="";

        // filter the search
        // I use the [] in case the return is null plus without it, code can maybe crash
        let filtered = data.results || [];

        if(query.trim() !== ""){
            const lowerCap = query.toLowerCase();

            const cleanedNumber = lowerCap.replace(/\D/g, '');

            //filters checkboxes
            const findFirst = document.getElementById("first").checked;
            const findLast = document.getElementById("last").checked;
            const findEmail = document.getElementById("emailFilter").checked;
            const findPhone = document.getElementById("phoneFilter").checked;

            

            filtered = filtered.filter(contact => {


                // no checkboxes marked so do regular search for last and first
                if(!findFirst && !findLast && !findEmail && !findPhone){
                    
                    return contact.firstName.toLowerCase().startsWith(lowerCap) || contact.lastName.toLowerCase().startsWith(lowerCap);

                }

                // return the ones the user checked
                const matchedFirst = findFirst && contact.firstName.toLowerCase().startsWith(lowerCap);
                const matchedLast = findLast && contact.lastName.toLowerCase().startsWith(lowerCap);
                const matchedEmail = findEmail && contact.email.toLowerCase().startsWith(lowerCap);
                const matchedPhone = findPhone && contact.phone.toLowerCase().startsWith(cleanedNumber);

                return matchedFirst || matchedLast || matchedEmail || matchedPhone;


            });
        }

        // result exist loop through and build cards
        if(filtered.length > 0){

            filtered.forEach(contact => {

                const card = document.createElement('div');

                card.className = 'contact-card';

                const phoneNumberFormat = formatPhone(contact.phone);

                // has the contacts first/ last names, email, number and the option to delete and edit(TODO)
                card.innerHTML =  `
                        <h3> ${contact.firstName} ${contact.lastName}</h3>
                        <p><strong>Email:</strong> ${contact.email}</p>
                        <p><strong>Phone:</strong> ${phoneNumberFormat}</p>
                        
                        <div class = "cardBtn">

                            <button class = "editBtn" onclick="">
                                <img src = "assets/edit_icon.svg" class ="editIcon">
                            </button>

                            <button class = "deleteBtn" onclick="deleteContact(${contact.ID})">
                                <img src = "assets/delete_icon.svg" class ="trash">
                            </button>

                        </div>`;
                
                contacts.appendChild(card);
                
            });

        }
        else{

            // Show a message if no data found
            contacts.innerHTML = `
                    <div class="no-contacts">
                        <p>No contacts found.</p>
                    </div>`
        }
    }
    catch(error){

        console.error("Error fetching contacts:", error);
    }
}






//-------------DELETE contacts----------------------------------------------------------------------------------------------------
async function deleteContact(id) {
    
    const payload = {
        ID: id,
        userID: userID
    };

    try {
        
        const response = await fetch('LAMPAPI/deleteContact.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if(result.error ===""){

            // stays on search result after delete.
            fetchContacts(searchInput.value);
        }
        else{
            console.log("Error: " + result.error);
        }

    } catch (error) {
        console.error("Delete failed:", error);
    }
}






// ---------------------Add contacts----------------------------------------------------------------------------------------------------
document.getElementById('addContactsForm').addEventListener('submit', async function(e) {

    // Prevent broswer from refreshing
    e.preventDefault();

    // strip everything not a number and verify length 
    const raw = document.getElementById('phone').value.replace(/\D/g, '');

    if(raw.length !== 10 ){
        const resultShow = document.getElementById("addResult");
        resultShow.style.color = "red";
        resultShow.innerHTML = "Error: Phone must be 10 digits.";

        return;
    }

    // Package data into JSON
    const payload = {

        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: raw,
        userID: userID

    };

    try{

        const response = await fetch('LAMPAPI/addContact.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        // If PHP returns no error, reset and refresh the list of contact
        if(result.error === ""){

            this.reset();

            const resultShow = document.getElementById("addResult");
            resultShow.style.color = "green";
            resultShow.innerHTML = "Contact successfully added!";

            fetchContacts(""); // refresh

            // clear success after 3s
            setTimeout(() => {
                resultShow.innerHTML = "";
            }, 3000);

        }
        else{

            // display error 
            document.getElementById("addResult").innerHTML = result.error;
        }
    }
    catch(error){

        document.getElementById("addResult").innerHTML = "Server Error";
    }
    
});







// ------------------live search----------------------------------------------------------------------------------------------------
searchInput.addEventListener('input', (e) => {

    fetchContacts(e.target.value);

});





// this will hold the filter menu 
chooseFilter.addEventListener('click', () => {
    menuFilter.classList.toggle("show");
});

// click outside and itll cancel the hold and disappear
window.addEventListener('click', (e) => {
    if(!e.target.matches('.filterOption') && !menuFilter.contains(e.target)){
        menuFilter.classList.remove("show");
    }
})




// ---------------logout----------------------------------------------------------------------------------------------------

document.getElementById("loggingOut").addEventListener('click', function (e) {

    e.preventDefault();
    
    sessionStorage.clear();

    window.location.href = 'index.html';
});

window.onload = () => fetchContacts("");