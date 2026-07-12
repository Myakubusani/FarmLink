// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5pSgyuln0G8bdVT54Evf-9jw7s3JroUg",
  authDomain: "farmlink-29241.firebaseapp.com",
  projectId: "farmlink-29241",
  storageBucket: "farmlink-29241.firebasestorage.app",
  messagingSenderId: "391295522315",
  appId: "1:391295522315:web:17e7db1ea0aaa2680c190e",
  measurementId: "G-T1RL67MQR5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };