import { auth } from "./auth.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

function login() {

  const phone = document.getElementById("phone").value;
  const pin = document.getElementById("pin").value;

  const email = phone + "@farmlink.com";
  const password = "FarmLink" + pin;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

      localStorage.setItem("uid", userCredential.user.uid);

      window.location.href = "dashboard.html";

  })
    .catch((error) => {
      alert(error.message);
    });

}

window.login = login;