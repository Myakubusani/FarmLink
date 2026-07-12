import { db, auth } from "./auth.js";

import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const container = document.getElementById("myProducts");

async function loadMyProducts() {

    const user = auth.currentUser;

    if (!user) {
        container.innerHTML = `
            <div class="alert alert-danger">
                Please login first.
            </div>
        `;
        return;
    }

    try {

        const q = query(
            collection(db, "products"),
            where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {

            container.innerHTML = `
                <div class="alert alert-info">
                    You haven't posted any products yet.
                </div>
            `;
            return;
        }

        container.innerHTML = "";

        snapshot.forEach((doc) => {

            const product = doc.data();

            container.innerHTML += `

            <div class="card shadow mb-3">

                <div class="card-body">

                    <h4>🌾 ${product.name}</h4>

                    <p><strong>Category:</strong> ${product.category}</p>

                    <p><strong>Price:</strong> ₦${Number(product.price).toLocaleString()}</p>

                    <p><strong>Quantity:</strong> ${product.quantity}</p>

                    <p><strong>Location:</strong> ${product.location}</p>

                </div>

            </div>

            `;

        });

    } catch (error) {

        container.innerHTML = `
            <div class="alert alert-danger">
                ${error.message}
            </div>
        `;

    }

}

loadMyProducts();