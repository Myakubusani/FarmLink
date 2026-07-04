function registerUser(){

const phone=document.getElementById("phone").value;

const pin=document.getElementById("pin").value;

const type=document.getElementById("userType").value;

if(phone=="" || pin=="" || type==""){

alert("Please fill all fields.");

return;

}

localStorage.setItem("phone",phone);

localStorage.setItem("pin",pin);

localStorage.setItem("type",type);

alert("Account created successfully!");

window.location="login.html";

}