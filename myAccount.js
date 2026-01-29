const current_name = sessionStorage.getItem("name");
const userID = sessionStorage.getItem("userID");

if(!userID){
    window.location.href = "index.html";

}
else{
    document.getElementById("accountName").innerHTML = current_name || "User"
}

