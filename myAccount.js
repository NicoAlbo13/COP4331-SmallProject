// retrieve user info saved during login
const current_name = sessionStorage.getItem("name");
const userID = sessionStorage.getItem("userID");

// caching elements to avoid repeat lookups
const searchInput = document.getElementById("search");
const contacts = document.querySelector(".contacts");




// Debugging to check if info is being pulled

//console.log("Debug - Name in storage:", current_name);
//console.log("Debug - ID in storage:", userID);

// **************************NOTE***********************************************
// REMOVE the comments on USER CHECK for the server version to work

// IF working on LOCAL keep USER CHECK as comments since you wont be able to 
// access account.html without verifying user



// USER CHECK

if(!userID){
    window.location.href = "index.html";

}
else{
    document.getElementById("accountName").innerHTML = current_name || "User"
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

        // IF result exist loop through and build cards
        if(data.results && data.results.length > 0){

            data.results.forEach(contact => {

                const card = document.createElement('div');

                card.className = 'contact-card';

                card.innerHTML =  `
                        <h3> ${contact.firstName} ${contact.lastName}</h3>
                        <p><strong>Email:</strong> ${contact.email}</p>
                        <p><strong>Phone:</strong> ${contact.phone}</p>
                        
                        <button class = "deleteBtn" onclick="deleteContact(${contact.id})">
                            <img src = "assets/delete_icon.svg" class ="trash>
                        </button>`;
                
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

// DELETE contacts
async function deleteContact(id) {
    
}



// Add contacts
document.getElementById('addContactsForm').addEventListener('submit', async function(e) {

    // Prevent broswer from refreshing
    e.preventDefault();

    // Package data into JSON
    const payload = {

        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
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

            fetchContacts(""); // refresh

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

searchInput.addEventListener('input', (e) => {

    fetchContacts(e.target.value);

});


// logout

document.getElementById("loggingOut").addEventListener('click', function (e) {

    e.preventDefault();
    
    sessionStorage.clear();

    window.location.href = 'index.html';
});

window.onload = () => fetchContacts("")