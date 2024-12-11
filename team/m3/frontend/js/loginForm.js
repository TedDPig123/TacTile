const exitButton = document.getElementById("exit-login");
const authPage = document.querySelector(".authentification-page");
exitButton.addEventListener("click", ()=>{
    authPage.style.display = 'none';

});

const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", ()=>{
    authPage.style.display = 'flex';
});