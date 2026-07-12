import { db } from "./auth.js";

import {
  doc,
  getDoc,
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const id = localStorage.getItem("selectedProduct");

const container = document.getElementById("productDetails");

async function loadProduct() {

    const docRef = doc(db, "products", id);

    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {

        container.innerHTML = `
        <div class="alert alert-danger">
            Product not found.
        </div>
        `;
        return;
    }

    const product = docSnap.data();

    container.innerHTML = `
    <div class="card shadow">
        <div class="card-body">

            <h2>🌾 ${product.name}</h2>

            <p class="badge bg-primary">${product.category}</p>

            <p class="fs-4 text-success">
                ₦${Number(product.price).toLocaleString()}
            </p>

            <p><strong>Farmer:</strong> ${product.farmerName}</p>

            <p><strong>Location:</strong> ${product.location}</p>

            <p><strong>Quantity:</strong> ${product.quantity}</p>

            <p><strong>Posted:</strong> ${product.postedAt}</p>

            <p class="text-warning">
                ${"⭐".repeat(product.rating || 5)}
            </p>

            <a href="tel:${product.phone}"
               class="btn btn-success w-100 mb-2">
               📞 Call Farmer
            </a>

            <a href="https://wa.me/234${product.phone.substring(1)}"
               target="_blank"
               class="btn btn-outline-success w-100">
               💬 WhatsApp Farmer
            </a>

            <button id="orderBtn" class="btn btn-primary w-100 mt-2">
    🛒 Place Order
</button>

        </div>
    </div>
    `;
}

loadProduct();

document.addEventListener("click", async (e) => {

    if (e.target.id === "orderBtn") {

        try {

            const productRef = doc(db, "products", id);
            const productSnap = await getDoc(productRef);

            if (!productSnap.exists()) {
                alert("Product not found.");
                return;
            }

            const product = productSnap.data();

            await addDoc(collection(db, "orders"), {
                buyerId: localStorage.getItem("uid"),
                productId: id,
                productName: product.name,
                farmerName: product.farmerName,
                phone: product.phone,
                price: product.price,
                status: "Pending",
                orderedAt: new Date().toLocaleString()
            });

            alert("🎉 Order placed successfully!");

        } catch (error) {

            alert(error.message);

        }

    }

});