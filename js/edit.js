import { db } from "./auth.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const productId = localStorage.getItem("editProduct");

const farmerName = document.getElementById("farmerName");
const location = document.getElementById("location");
const quantity = document.getElementById("quantity");
const price = document.getElementById("price");

async function loadProduct() {

    try {

        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            alert("Product not found.");
            window.location.href = "dashboard.html";
            return;
        }

        const product = docSnap.data();

        farmerName.value = product.farmerName;
        location.value = product.location;
        quantity.value = product.quantity;
        price.value = product.price;

    } catch (error) {
        alert(error.message);
    }

}

loadProduct();

document.getElementById("saveBtn").addEventListener("click", async () => {

    try {

        await updateDoc(doc(db, "products", productId), {

            farmerName: farmerName.value,
            location: location.value,
            quantity: quantity.value,
            price: price.value

        });

        alert("✅ Product updated successfully!");

        window.location.href = "dashboard.html";

    } catch (error) {

        alert(error.message);

    }

});