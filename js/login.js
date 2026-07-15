import { auth, db } from "./auth.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function login() {

  const phone = document.getElementById("phone").value.trim();
  const pin = document.getElementById("pin").value.trim();

  if (!phone || !pin) {
    alert("Please enter your phone number and PIN.");
    return;
  }

  if (pin.length !== 6 || !/^\d{6}$/.test(pin)) {
    alert("PIN must be exactly 6 digits.");
    return;
  }

  // Same format used during signup
  const email = phone + "@farmlink.com";
  const password = "FarmLink" + pin;

  try {

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = userCredential.user.uid;

    // Get Farmer/Buyer role from Firestore
    const userSnapshot = await getDoc(
      doc(db, "users", uid)
    );

    if (!userSnapshot.exists()) {
      alert("User profile not found.");
      return;
    }

    const userData = userSnapshot.data();

    // Save login information
    localStorage.setItem("uid", uid);
    localStorage.setItem("userType", userData.userType);
    localStorage.setItem("phone", userData.phone);

    alert("Login successful!");

    window.location.href = "dashboard.html";

  } catch (error) {

    console.error(error);

    if (error.code === "auth/invalid-credential") {
      alert("Incorrect phone number or PIN.");
    } else {
      alert(error.message);
    }

  }
}

window.login = login;