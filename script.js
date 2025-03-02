// Firebase Configuration
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
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Authentication Functions
function toggleAuthMode() {
    const form = document.getElementById('authForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const title = document.querySelector('h1');
    
    form.classList.toggle('signup');
    submitBtn.textContent = form.classList.contains('signup') ? 'Sign Up' : 'Login';
    title.textContent = form.classList.contains('signup') ? 'Sign Up' : 'Login';
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const isSignUp = document.getElementById('authForm').classList.contains('signup');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        showLoader();
        
        if (isSignUp) {
            await createUserWithEmailAndPassword(auth, email, password);
        } else {
            await signInWithEmailAndPassword(auth, email, password);
        }
        
        // Redirect after successful login
        const user = auth.currentUser;
        if (user) {
            if (!user.emailVerified) {
                alert('Please verify your email first');
                signOut(auth);
            } else {
                window.location.href = '/jemenezjerson/jemenezjerson.html';
            }
        }
    } catch (error) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = getErrorString(error.code);
        errorMessage.classList.remove('hidden');
    } finally {
        hideLoader();
    }
}

// Google Sign-In
async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
        showLoader();
        await signInWithPopup(auth, provider);
        window.location.href = '/jemenezjerson/jemenezjerson.html';
    } catch (error) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = getErrorString(error.code);
        errorMessage.classList.remove('hidden');
    } finally {
        hideLoader();
    }
}

// Error Handling
function getErrorString(errorCode) {
    switch (errorCode) {
        case 'auth/weak-password':
            return 'Password should be at least 6 characters';
        case 'auth/email-already-in-use':
            return 'Email already exists';
        case 'auth/user-not-found':
            return 'User not found';
        case 'auth/wrong-password':
            return 'Incorrect password';
        default:
            return 'An error occurred';
    }
}

// Password Reset
function showResetForm() {
    const resetForm = document.createElement('form');
    resetForm.innerHTML = `
        <input type="email" placeholder="Enter your email" id="resetEmail">
        <button type="button" onclick="sendPasswordReset()">Send Reset Link</button>
    `;
    document.querySelector('.form-container').replaceChild(resetForm, document.getElementById('authForm'));
}

async function sendPasswordReset() {
    const email = document.getElementById('resetEmail').value;
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset link sent!');
    } catch (error) {
        alert(getErrorString(error.code));
    }
}

// Loader Functions
function showLoader() {
    document.querySelector('.loader').classList.remove('hidden');
}

function hideLoader() {
    document.querySelector('.loader').classList.add('hidden');
}

// Event Listeners
document.getElementById('authForm').addEventListener('submit', handleFormSubmit);
document.querySelector('.google-btn').addEventListener('click', handleGoogleSignIn);
