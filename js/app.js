$(document).ready(function(){
    $('#eye').click(function(){
        $(this).toggleClass('open');
        $(this).children('i').toggleClass('fa-eye-slash fa-eye');
        if($(this).hasClass('open')){
            $(this).prev().attr('type', 'text');
        }else{
            $(this).prev().attr('type', 'password');
        }
    });
});
function CheckLogin(){
    const isLoggedIn = !!localStorage.getItem("token");
    if(isLoggedIn){
        window.location.href = "./smarthome/bai3.html"; // Redirect to your main page after login
    }
}

function login(event){
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút đăng nhập
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");

    if (usernameField && passwordField) {
        const username = usernameField.value.trim();
        const password = passwordField.value.trim();
        const existingAccounts = JSON.parse(localStorage.getItem('accounts')) || [];

        const checkLogin = existingAccounts.some(account => account.username === username && account.password === password);
        
        if (checkLogin) {
            const token = existingAccounts.find(account => account.username === username).token;
            localStorage.setItem("token", token);
            CheckLogin();
        } else {
            alert("Invalid username or password.");
        }
    } else {
        console.error("Input fields not found.");
    }
}
