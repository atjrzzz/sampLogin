import { auth } from './firebase.js';

const loginForm = document.getElementById('loginForm');
const forgotPasswordLink = document.getElementById('forgotPassword');
const googleButton = document.querySelector('.google-btn');
const loadingSpinner = document.getElementById('loadingSpinner');
const welcomeModal = document.getElementById('welcomeModal');
const welcomeMessage = document.getElementById('welcomeMessage');

let isSignUpForm = false;

// Toggle between login and signup forms
function toggleForm() {
    const formFields = document.querySelectorAll('.form-container input');
    const submitButton = loginForm.querySelector('button');
    const toggleButton = document.querySelector('.toggle-form');
    
    if (isSignUpForm) {
        formFields[1].placeholder = 'Password';
        submitButton.textContent = 'Login';
        toggleButton.textContent = 'Sign Up';
        isSignUpForm = false;
    } else {
        formFields[1].placeholder = 'Confirm Password';
        submitButton.textContent = 'Sign Up';
        toggleButton.textContent = 'Login';
        isSignUpForm = true;
    }
}

// Email/Password Authentication
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoading();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        if (isSignUpForm) {
            const confirmPassword = password; // Implement confirmation check
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }
            await auth.createUserWithEmailAndPassword(email, password);
            const actionCodeSettings = {
                url: 'https://your-domain.com/verified'
            };
            await sendVerificationEmail(email, actionCodeSettings);
            alert('Verification email sent');
        } else {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            if (!user.emailVerified) {
                alert('Email not verified');
                auth.signOut();
            } else {
                showWelcomeMessage(user.email);
            }
        }
        hideLoading();
    } catch (error) {
        alert(error.message);
        hideLoading();
    }
});

// Password Reset
forgotPasswordLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = prompt('Enter your email for reset');
    if (email) {
        try {
            await auth.sendPasswordResetEmail(email);
            alert('Password reset email sent');
        } catch (error) {
            alert(error.message);
        }
    }
});

// Google Sign-In
function googleSignIn() {
    showLoading();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            showWelcomeMessage(user.email);
            hideLoading();
        })
        .catch((error) => {
            alert(error.message);
            hideLoading();
        });
}

// Utilities
function showLoading() {
    loadingSpinner.style.display = 'block';
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
}

function showWelcomeMessage(email) {
    welcomeMessage.textContent = `Welcome, ${email}`;
    welcomeModal.style.display = 'block';
}

function closeModal() {
    welcomeModal.style.display = 'none';
}

// Check auth state
auth.onAuthStateChanged(user => {
    if (user) {
        if (!user.emailVerified && !user.providerData[0].providerId.includes('google')) {
            auth.signOut();
            alert('Email not verified');
        }
    }
});
