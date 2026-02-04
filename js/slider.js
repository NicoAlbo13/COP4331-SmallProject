const signUpBtn = document.getElementById('signUp');
const signInBtn = document.getElementById('signIn');
const contain = document.getElementById('container');

signUpBtn.addEventListener('click', () => {
    contain.classList.add("rightPanel");
});

signInBtn.addEventListener('click', () => {
    contain.classList.remove("rightPanel");
});