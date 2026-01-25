//Log in 

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // read the values from the input fields and store them in an object
    const data = {
        username: document.getElementById("logInUser").value,
        password: document.getElementById("logIn_pass").value
    };

    // calling the login API endpoint
    const res = await fetch("LAMPAPI/login.php",{
        method: "POST",
        headers: { "content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if(result.success){
        window.location.href = "account.html";
    }else{
        alert(result.message);
    }
    
});

// Sign up

document.getElementById("signUpForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        first: document.getElementById("signUpFirstName").value,
        last: document.getElementById("signUpLastName").value,
        username: document.getElementById("signUpUser").value,
        password: document.getElementById("signUp_pass").value,
    };

    const res = await fetch("LAMPAPI/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if(result.success){
        window.location.href = "account.html";
    }else{
        alert(result.message);
    }
    
})
