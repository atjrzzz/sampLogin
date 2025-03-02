const firebaseConfig = {
    aapiKey: "AIzaSyDGGoyLp4FMlKPzpPtyU_og4K3VhGA_nb8",
  authDomain: "jrnsnittech.firebaseapp.com",
  projectId: "jrnsnittech",
  storageBucket: "jrnsnittech.firebasestorage.app",
  messagingSenderId: "397300477921",
  appId: "1:397300477921:web:b3adf6cec936b2ecfc2ca0",
  measurementId: "G-XL83DFE6K4",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// DOM Elements
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error-message');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Error Messages Mapping
const errorMessages = {
    'auth/invalid-email': 'Please enter a valid email address',
    'auth/user-disabled': 'This account has been disabled',
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/email-already-in-use': 'Email already in use',
    'auth/weak-password': 'Password should be at least 6 characters',
    'auth/too-many-requests': 'Too many attempts. Try again later',
    'auth/network-request-failed': 'Network error. Please check your connection'
};

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

function showError(error) {
    const message = errorMessages[error.code] || error.message;
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Auth State Handling
auth.onAuthStateChanged(user => {
    if (user) {
        if (user.emailVerified) {
            window.location.href = '/jemenezjerson/jemenezjerson.html';
        } else {
            auth.signOut();
            showError({ code: 'auth/unverified-email', message: 'Please verify your email first' });
        }
    }
    hideLoader();
});

// Login Handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoader();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        alert(`Welcome back, ${email}! Redirecting...`);
        window.location.href = '/jemenezjerson/jemenezjerson.html';
    } catch (error) {
        showError(error);
    } finally {
        hideLoader();
    }
});

// Registration Handler
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoader();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await userCredential.user.sendEmailVerification();
        alert('Verification email sent! Please check your inbox.');
        toggleForms();
    } catch (error) {
        showError(error);
    } finally {
        hideLoader();
    }
});

// Add other handlers (Google Sign-In, Password Reset) similar to previous example
// Remember to update all handlers with modern error handling
