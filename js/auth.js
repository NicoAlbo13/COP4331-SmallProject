//Log in 
document.getElementById("loginResult").innerHTML = "";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {

        // Hash the passwords after recieving the plain password

        const plainPass = document.getElementById("logIn_pass").value;
        const hashed = md5(plainPass);
        
        // read the values from the input fields and store them in an object
        const data = {
            login: document.getElementById("logInUser").value,
            password: hashed
        };

        // calling the login API endpoint
        const res = await fetch("LAMPAPI/login.php",{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if(result.error ===""){
            sessionStorage.setItem("userID", result.id);
            sessionStorage.setItem("name", result.firstName);
            
            window.location.href = "account.html";
        }else{

            const resultShow = document.getElementById("loginResult");
            resultShow.style.color = "red";
            resultShow.innerHTML = "Incorrect Login!";

            // clear success after 3s
            setTimeout(() => {
                resultShow.innerHTML = "";
            }, 3000);
        }
        
    } catch (error) {
        document.getElementById("loginResult").innerHTML ="Server Error Try again"
    }
    
});

// Sign up

document.getElementById("signUpForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {

        // Hash the passwords after recieving the plain password
        const plainPass = document.getElementById("signUp_pass").value;
        const hashed = md5(plainPass);

        const data = {
            firstName: document.getElementById("signUpFirstName").value,
            lastName: document.getElementById("signUpLastName").value,
            login: document.getElementById("signUpUser").value,
            password: hashed
        };

        const res = await fetch("LAMPAPI/createUser.php", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if(result.error ===""){
            document.getElementById("signUpForm").reset();
            
            const resultShow = document.getElementById("signUpResult");
            resultShow.style.color = "green";
            resultShow.innerHTML = "Account successfully added!";

            // clear success after 3s
            setTimeout(() => {
                resultShow.innerHTML = "";
            }, 3000);

            
        }else{
            document.getElementById("signUpResult").innerHTML = result.error;
        }
        
    } catch (error) {
        document.getElementById("signUpResult").innerHTML ="Server Error Try again"
    }
    
})
