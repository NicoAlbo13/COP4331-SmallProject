//Log in 
document.getElementById("loginResult").innerHTML = "";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        
        // read the values from the input fields and store them in an object
        const data = {
            login: document.getElementById("logInUser").value,
            password: document.getElementById("logIn_pass").value
        };

        // calling the login API endpoint
        const res = await fetch("LAMPAPI/login.php",{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if(result.error ===""){
            sessionStorage.setItem("userID", result.ID);
            sessionStorage.setItem("name", result.firstName);
            window.location.href = "account.html";
        }else{
            document.getElementById("loginResult").innerHTML = result.error;
        }
        
    } catch (error) {
        document.getElementById("loginResult").innerHTML ="Server Error Try again"
    }
    
});

// Sign up

document.getElementById("signUpForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {

        //
        const data = {
            first: document.getElementById("signUpFirstName").value,
            last: document.getElementById("signUpLastName").value,
            login: document.getElementById("signUpUser").value,
            password: document.getElementById("signUp_pass").value,
        };

        const res = await fetch("LAMPAPI/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if(result.error ===""){
            window.location.href = "account.html";
        }else{
            document.getElementById("signUpResult").innerHTML = result.error;
        }
        
    } catch (error) {
        document.getElementById("signUpResult").innerHTML ="Server Error Try again"
    }
    
})
