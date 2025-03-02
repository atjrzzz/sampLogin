// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyDGGoyLp4FMlKPzpPtyU_og4K3VhGA_nb8",
  authDomain: "jrnsnittech.firebaseapp.com",
  projectId: "jrnsnittech",
  storageBucket: "jrnsnittech.firebasestorage.app",
  messagingSenderId: "397300477921",
  appId: "1:397300477921:web:b3adf6cec936b2ecfc2ca0",
  measurementId: "G-XL83DFE6K4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
