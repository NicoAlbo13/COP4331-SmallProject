const current_name = sessionStorage.getItem("name");
const userID = sessionStorage.getItem("userID");




// Debugging to check if info is being pulled

//console.log("Debug - Name in storage:", current_name);
//console.log("Debug - ID in storage:", userID);

// **************************NOTE***********************************************
// REMOVE the comments on USER CHECK for the server version to work

// IF working on LOCAL keep USER CHECK as comments since you wont be able to 
// access account.html without verifying user



// USER CHECK
/*
if(!userID){
    window.location.href = "index.html";

}
else{
    document.getElementById("accountName").innerHTML = current_name || "User"
}

*/

document.getElementById("loggingOut").addEventListener('click', function (e) {
    e.preventDefault();
    
    sessionStorage.clear();

    window.location.href = 'index.html';
});