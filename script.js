// Firebase configuration (replace with your project's config)
const firebaseConfig = {
  apiKey: "AIzaSyDGGoyLp4FMlKPzpPtyU_og4K3VhGA_nb8",
  authDomain: "jrnsnittech.firebaseapp.com",
  projectId: "jrnsnittech",
  storageBucket: "jrnsnittech.firebasestorage.app",
  messagingSenderId: "397300477921",
  appId: "1:397300477921:web:b3adf6cec936b2ecfc2ca0"
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
  
let loginMethod = ''; // Variable to trace login method

// Handle login with email and password
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  clearMessage();
  showSpinner();
  loginMethod = 'email'; // Set login method to email
  const email = emailInput.value;
  const password = passwordInput.value;
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      hideSpinner();
      if (userCredential.user.emailVerified) {
          showMessage("Welcome! You have logged in through your registered password.");
          console.log(`Logged in using: ${loginMethod}`);
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
   loginMethod = 'google'; // Set login method to Google
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      hideSpinner();
      const user = result.user;
      if (user.emailVerified) {
          showMessage("Welcome! You have logged in through Google Sign-In.");
          console.log(`Logged in using: ${loginMethod}`);
          window.location.href = "https://atjrzzz.github.io/jrsnittech/index.html"; // Redirect after Google login
      } else {
          user.updateProfile({ disabled: true }).then(() => {
              user.sendEmailVerification().then(() => {
                  showMessage("Verification email sent. Please verify your email before proceeding.");
                  auth.signOut();
              }).catch(error => {
                  showMessage("Error sending verification email: " + error.message);
              });
          }).catch(error => {
              showMessage("Error updating user profile: " + error.message);
          });
      }
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
  
  // Handle user registration
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    clearMessage();
    showSpinner();
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Send verification email
        userCredential.user.sendEmailVerification();
        hideSpinner();
        showMessage("Registration successful! Check your email for verification.");
        registerModal.style.display = 'none';
        console.log('Registered using: register form');
      })
      .catch(error => {
        hideSpinner();
        showMessage("Please Register");
      });
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
    auth.fetchSignInMethodsForEmail(email)
      .then(signInMethods => {
        if (signInMethods.length === 0) {
          hideSpinner();
          showMessage("Email is not registered.");
          resetModal.style.display = 'none';
        } else {
          auth.sendPasswordResetEmail(email)
            .then(() => {
              hideSpinner();
              showMessage("Password reset email sent!");
              resetModal.style.display = 'none';
            })
            .catch(error => {
              hideSpinner();
              showMessage(error.message);
            });
        }
      })
      .catch(error => {
        hideSpinner();
        showMessage(error.message);
      });
  });
  
  // Handle logout
  logoutBtn.addEventListener('click', () => {
    auth.signOut();
    showMessage("Logged out successfully!");
  });
