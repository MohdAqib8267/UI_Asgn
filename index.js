const toastSuccess = document.getElementById('toast-success');
const registrationForm = document.getElementById('registrationForm');
function hideToast(){
    toastSuccess.classList.add('hidden');
}
function showToast(){
    toastSuccess.classList.remove('hidden');
    setTimeout(() => {
        hideToast();
        window.location.href = 'home.html';
    }, 2000);
}
registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeat-password').value;
    const contact = document.getElementById('contact').value;
    if(password !== repeatPassword){
        alert('password and confirm password does not match.');
        return;
    }
    if(username.trim() == "" || email.trim()=="" || password.trim()=="" || repeatPassword.trim()=="" || contact.trim()==""){
        alert("Please fill all the details correctly.");
    }
    localStorage.setItem(email,JSON.stringify({username,email,password,contact}));
    // localStorage.setItem("userEmail", email);
    showToast();
})
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userDetails = JSON.parse(localStorage.getItem(email));
    if (userDetails && userDetails.email === email && userDetails.password === password) {
        window.location.href = `home.html?e=${encodeURIComponent(email)}`;
    } else {
        alert("Email or password is incorrect");
    }
});