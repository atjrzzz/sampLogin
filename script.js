import { firebaseConfig } from './firebase-config.js';
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Handle authentication flow
function handleLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Redirect to desired page
      window.location.href = '/jemenezjerson/jemenezjerson.html';
    })
    .catch((error) => {
      showError(error);
    });
}

// Helper functions for UI elements
function showForm(formId) {
  document.querySelectorAll('.form-container').forEach(form => form.style.display = 'none');
  document.getElementById(formId).style.display = 'block';
}

// Email verification and error handling
function sendVerificationEmail() {
  auth.currentUser.sendEmailVerification()
    .then(() => {
      showSuccessMessage('Verification email sent');
    })
    .catch((error) => showError(error));
}

// Loading states
function setLoading(isLoading) {
  document.getElementById('overlay').style.display = isLoading ? 'block' : 'none';
}

// Event Listeners
document.getElementById('login-btn').addEventListener('click', handleLogin);
document.getElementById('signup-btn').addEventListener('click', handleSignup);
document.getElementById('forgot-btn').addEventListener('click', handleForgotPassword);
// Add more event listeners...
