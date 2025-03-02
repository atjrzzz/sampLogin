// script.js

// Firebase configuration (Replace with your own Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyDGGoyLp4FMlKPzpPtyU_og4K3VhGA_nb8",
    authDomain: "jrnsnittech.firebaseapp.com",
    projectId: "jrnsnittech",
    storageBucket: "jrnsnittech.firebasestorage.app",
    messagingSenderId: "397300477921",
    appId: "1:397300477921:web:b3adf6cec936b2ecfc2ca0",
    measurementId: "G-XL83DFE6K4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Show loading spinner
function showSpinner() {
    document.getElementById("spinner").style.display = "block";
}

// Hide loading spinner
function hideSpinner() {
    document.getElementById("spinner").style.display = "none";
}

// Display error message
function showError(message) {
    document.getElementById("error-message").innerText = message;
}

// Login function
function login() {
    showSpinner();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            hideSpinner();
            if (!userCredential.user.emailVerified) {
                showError("Please verify your email before logging in.");
                auth.signOut();
            } else {
                window.location.href = "/jemenezjerson/jemenezjerson.html"; // Redirect after login
            }
        })
        .catch((error) => {
            hideSpinner();
            showError(error.message);
        });
}

// Google Sign-In
function googleSignIn() {
    showSpinner();
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then(() => {
            hideSpinner();
            window.location.href = "/jemenezjerson/jemenezjerson.html"; // Redirect after login
        })
        .catch((error) => {
            hideSpinner();
            showError(error.message);
        });
}

// Password reset
function resetPassword() {
    const email = document.getElementById("email").value;
    if (!email) {
        showError("Please enter your email to reset password.");
        return;
    }
    auth.sendPasswordResetEmail(email)
        .then(() => {
            showError("Password reset email sent!");
        })
        .catch((error) => {
            showError(error.message);
        });
}

// Register function
function register() {
    showSpinner();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            hideSpinner();
            userCredential.user.sendEmailVerification();
            showError("Verification email sent. Please check your inbox.");
            auth.signOut();
        })
        .catch((error) => {
            hideSpinner();
            showError(error.message);
        });
}

// Session management
auth.onAuthStateChanged((user) => {
    if (user) {
        if (user.emailVerified) {
            window.location.href = "/jemenezjerson/jemenezjerson.html"; // Redirect if logged in
        } else {
            showError("Please verify your email before accessing the site.");
            auth.signOut();
        }
    }
});
