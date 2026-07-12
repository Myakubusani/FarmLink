import { auth } from "./auth.js";

import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


function registerUser(){

const phone=document.getElementById("phone").value;

const pin=document.getElementById("pin").value;

const type=document.getElementById("userType").value;

if(phone=="" || pin=="" || type==""){

alert("Please fill all fields.");

return;

}

const email = phone + "@farmlink.com";
const password = "FarmLink" + pin;

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

    localStorage.setItem("phone", phone);
    localStorage.setItem("pin", pin);
    localStorage.setItem("userType", type);

    alert("Account created successfully!");

    window.location.href = "login.html";
  })
  .catch((error) => {
    alert(error.message);
  });
}
window.registerUser = registerUser;