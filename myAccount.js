const current_name = sessionStorage.getItem("name");
const userID = sessionStorage.getItem("userID");

console.log("Debug - Name in storage:", current_name);
console.log("Debug - ID in storage:", userID);

if(!userID){
    window.location.href = "index.html";

}
else{
    document.getElementById("accountName").innerHTML = current_name || "User"
}

