// Firebase configuration (replace with your project's config)
const firebaseConfig = {
    apiKey: "AIzaSyDGGoyLp4FMlKPzpPtyU_og4K3VhGA_nb8",
    authDomain: "jrnsnittech.firebaseapp.com",
    projectId: "jrnsnittech" ,
    // ... include other configuration keys as needed
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Get DOM elements
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const googleBtn = document.getElementById('google-signin');
  const messageDiv = document.getElementById('message');
  const spinner = document.getElementById('spinner');
  const registerLink = document.getElementById('register-link');
  const registerModal = document.getElementById('register-modal');
  const closeModal = document.getElementById('close-modal');
  const registerForm = document.getElementById('register-form');
  const resetLink = document.getElementById('reset-link');
  const resetModal = document.getElementById('reset-modal');
  const closeResetModal = document.getElementById('close-reset-modal');
  const resetForm = document.getElementById('reset-form');
  const welcomeDiv = document.getElementById('welcome');
  const logoutBtn = document.getElementById('logout');
  
  // Utility functions
  function showSpinner() {
    spinner.style.display = 'block';
  }
  
  function hideSpinner() {
    spinner.style.display = 'none';
  }
  
  function showMessage(msg) {
    messageDiv.innerText = msg;
  }
  
  function clearMessage() {
    messageDiv.innerText = '';
  }
  
  // Listen for authentication state changes
  auth.onAuthStateChanged(user => {
    hideSpinner();
    if (user) {
      // For email/password users, check if email is verified
      if (!user.emailVerified && user.providerData[0].providerId !== "google.com") {
        showMessage("Please verify your email. Check your inbox and then login again.");
        auth.signOut();
        return;
      }
      document.querySelector('.container').style.display = 'none';
      welcomeDiv.style.display = 'block';
    } else {
      document.querySelector('.container').style.display = 'block';
      welcomeDiv.style.display = 'none';
    }
  });
  
  /// Handle login with email and password
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    clearMessage();
    showSpinner();
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        hideSpinner();
        if (userCredential.user.emailVerified) {
            showMessage("Welcome!");
            window.location.href = "https://atjrzzz.github.io/jrsnittech/index.html"; // Redirect after login
        } else {
            showMessage("Please verify your email before proceeding.");
            auth.signOut();
        }
      })
      .catch(error => {
        hideSpinner();
        showMessage(error.message);
      });
  });
  
  // Handle Google Sign-In
googleBtn.addEventListener('click', () => {
    clearMessage();
    showSpinner();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(result => {
        hideSpinner();
        showMessage("Welcome!");
        window.location.href = "https://atjrzzz.github.io/jrsnittech/index.html"; // Redirect after Google login
      })
      .catch(error => {
        hideSpinner();
        showMessage("email & password invalid");
      });
  });
  
  // Open registration modal
  registerLink.addEventListener('click', () => {
    registerModal.style.display = 'block';
  });
  
  // Close registration modal
  closeModal.addEventListener('click', () => {
    registerModal.style.display = 'none';
  });
  

  
  // Open password reset modal
  resetLink.addEventListener('click', () => {
    resetModal.style.display = 'block';
  });
  
  // Close password reset modal
  closeResetModal.addEventListener('click', () => {
    resetModal.style.display = 'none';
  });
  
  // Handle password reset
  resetForm.addEventListener('submit', e => {
    e.preventDefault();
    clearMessage();
    showSpinner();
    const email = document.getElementById('reset-email').value;
    auth.sendPasswordResetEmail(email)
      .then(() => {
        hideSpinner();
        showMessage("Password reset email sent!");
        resetModal.style.display = 'none';
      })
      .catch(error => {
        hideSpinner();
        showMessage("error.message");
      });
  });
  
  // Handle logout
  logoutBtn.addEventListener('click', () => {
    auth.signOut();
    showMessage("Logged out successfully!");
  });

function registerUser(email, password) {
    // ...existing code...
    if (isValidRegistration(email, password)) {
        if (isEmailVerified(email)) {
            window.location.href = "https://another-site.com";
        } else {
            alert("Please verify your email before proceeding.");
        }
    } else {
        alert("Registration failed. Please check your details and try again.");
    }
}

function isEmailVerified(email) {
    // Logic to check if the email is verified
    // This is a placeholder function, replace with actual verification logic
    return true; // Change this to actual verification check
}
