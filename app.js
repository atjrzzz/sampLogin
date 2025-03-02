// Firebase Config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// DOM Elements
const loader = document.querySelector('.loader');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const toggleForm = document.getElementById('toggle-form');
const errorMessage = document.querySelector('.error-message');
const googleSignIn = document.getElementById('google-signin');
const forgotPassword = document.getElementById('forgot-password');

// Show Loader
function showLoader() {
    loader.style.display = 'block';
}

// Hide Loader
function hideLoader() {
    loader.style.display = 'none';
}

// Toggle Forms
toggleForm.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
    document.getElementById('form-title').textContent = 
        registerForm.classList.contains('hidden') ? 'Login' : 'Register';
    toggleForm.textContent = 
        registerForm.classList.contains('hidden') ? 'Create Account' : 'Login Here';
});

// Handle Errors
function handleError(error) {
    errorMessage.textContent = error.message;
    setTimeout(() => {
        errorMessage.textContent = '';
    }, 5000);
}

// Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showLoader();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert('Welcome back!');
        })
        .catch(handleError)
        .finally(hideLoader);
});

// Register
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showLoader();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            userCredential.user.sendEmailVerification();
            alert('Verification email sent! Please check your inbox.');
        })
        .catch(handleError)
        .finally(hideLoader);
});

// Google Sign-In
googleSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    showLoader();
    const provider = new firebase.auth.GoogleAuthProvider();
    
    auth.signInWithPopup(provider)
        .then(() => {
            alert('Welcome!');
        })
        .catch(handleError)
        .finally(hideLoader);
});

// Password Reset
forgotPassword.addEventListener('click', (e) => {
    e.preventDefault();
    const email = prompt('Enter your email:');
    if (email) {
        auth.sendPasswordResetEmail(email)
            .then(() => alert('Password reset email sent!'))
            .catch(handleError);
    }
});

// Auth State Listener
auth.onAuthStateChanged((user) => {
    if (user) {
        if (!user.emailVerified) {
            alert('Please verify your email address.');
            auth.signOut();
        }
    }
    hideLoader();
});

// Initial Load Check
showLoader();
setTimeout(hideLoader, 2000);
