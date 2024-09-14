const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const signupForm = document.querySelector("form.signup");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

signupBtn.onclick = () => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
};

loginBtn.onclick = () => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
};

signupLink.onclick = () => {
    signupBtn.click();
    return false;
};

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    // Replace with your login logic
    if (email === 'user@example.com' && password === 'password') {
        alert('Login successful');
    } else {
        document.getElementById('loginError').innerText = 'Invalid credentials';
    }
});

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;
    var confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (password !== confirmPassword) {
        document.getElementById('signupError').innerText = 'Passwords do not match';
    } else {
        alert('Signup successful');
    }
});