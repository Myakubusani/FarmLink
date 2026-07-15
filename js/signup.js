import { auth, db } from "./auth.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function registerUser() {

  const phone = document.getElementById("phone").value.trim();
  const pin = document.getElementById("pin").value.trim();
  const userType = document.getElementById("userType").value;

  // Validation
  if (!phone || !pin || !userType) {
    alert("Please fill all fields.");
    return;
  }

  if (pin.length !== 6 || !/^\d{6}$/.test(pin)) {
    alert("PIN must be exactly 6 digits.");
    return;
  }

  // Convert phone number into Firebase email format
  const email = phone + "@farmlink.com";
  const password = "FarmLink" + pin;

  try {

    // Create Firebase Authentication account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = userCredential.user.uid;

    // Save user profile in Firestore
    await setDoc(doc(db, "users", uid), {
      phone: phone,
      userType: userType,
      createdAt: new Date().toISOString()
    });

    // Save current user information
    localStorage.setItem("uid", uid);
    localStorage.setItem("userType", userType);
    localStorage.setItem("phone", phone);

    alert("Account created successfully!");

    window.location.href = "dashboard.html";

  } catch (error) {

    console.error(error);

    if (error.code === "auth/email-already-in-use") {
      alert("This phone number already has an account. Please login instead.");
    } else {
      alert(error.message);
    }

  }
}

window.registerUser = registerUser;