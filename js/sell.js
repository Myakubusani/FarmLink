import { db, app } from "./auth.js";

const currentUserType = localStorage.getItem("userType");

if (currentUserType !== "Farmer") {
    alert("Only farmers can sell produce.");
    window.location.href = "dashboard.html";
}

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth(app);


// =============================
// FarmLink - Sell Produce
// =============================

let selectedProduce = "";

// Select Produce Card
const produceCards = document.querySelectorAll(".produce-card");

produceCards.forEach(card => {

    card.addEventListener("click", () => {

        produceCards.forEach(c => {
            c.classList.remove("border-success");
        });

        card.classList.add("border-success");

        selectedProduce = card.dataset.produce;

    });

});

// Post Produce
document.getElementById("postBtn").addEventListener("click", () => {

    const quantity = document.getElementById("quantity").value.trim();
    const price = document.getElementById("price").value.trim();

    const farmerName = document.getElementById("farmerName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const location = document.getElementById("location").value.trim();
    const photoInput = document.getElementById("photo");
    const photoFile = photoInput.files[0];

    // Validation
    if (selectedProduce === "") {
        alert("Please select a produce.");
        return;
    }

    if (quantity === "" || price === "") {
        alert("Please fill Quantity and Price.");
        return;
    }

    if (farmerName === "" || phone === "" || location === "") {
        alert("Please fill all farmer information.");
        return;
    }

    let category = "";

switch (selectedProduce) {

    case "Corn":
    case "Rice":
    case "Beans":
        category = "Grains";
        break;

    case "Tomatoes":
    case "Onion":
    case "Yam":
        category = "Vegetables";
        break;

    case "Cow":
    case "Goat":
    case "Chicken":
    case "Eggs":
        category = "Livestock";
        break;

    default:
        category = "Other";
}

    // Product Object
    const produce = {
    id: Date.now(),
    postedAt: new Date().toLocaleString(),
    farmerName: farmerName,
    phone: phone,
    location: location,
    category: category,
    name: selectedProduce,
    quantity: quantity,
    price: price,
    photo: "",
    rating: 5,
    userId: localStorage.getItem("uid")};

    // Function to save product
    function saveProduct() {
    
const uid = localStorage.getItem("uid");

if (!uid) {
    alert("Please login first.");
    return;
}

produce.userId = uid;
produce.userId = auth.currentUser.uid;

addDoc(collection(db, "products"), produce)
  .then(() => {

    alert("✅ Produce posted successfully!");

    window.location.href = "dashboard.html";

  })
  .catch((error) => {

    alert("Error posting produce: " + error.message);

  });
    }

    // Save photo if selected
    if (photoFile) {

        const reader = new FileReader();

        reader.onload = function () {

            produce.photo = reader.result;

            saveProduct();

        };

        reader.readAsDataURL(photoFile);

    } else {

        saveProduct();

    }

});