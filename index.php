<?php
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="css/login.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <div class="container" id = "container">

        <div class="formContainer signup">

            <form action="#">

                <h1>Create Account</h1>
                <input type="text" placeholder ="UserName">
                <input type="password" placeholder ="Password">
                <button>Sign Up</button>

            </form>

        </div>

        <div class="formContainer signin">

            <form action="#">

                <h1>Sign In</h1>
                <input type="text" placeholder ="UserName">
                <input type="password" placeholder ="Password">
                <button>Sign In</button>

            </form>

        </div>

        <div class="layerContainer">

            <div class="layer">

                <div class="layerPan layerLeft">

                    <h1>Welcome Back</h1>
                    <p>Ready to look like you've got it all together again?</p>
                    <button class ="fade" id ="signIn">Sign In</button>
                
                </div>

                <div class="layerPan layerRight">

                    <h1>No Account?</h1>
                    <p>Sign up to start managing your contacts like a professional, without the paperwork.</p>
                    <button class="fade" id="signUp">Sign Up</button>
               
                </div>

            </div>
        </div>

    </div>

    <script src="slider.js"></script>
</body>
</html>