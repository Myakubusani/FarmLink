import { db } from "./auth.js";

import {
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const container = document.getElementById("favoritesContainer");

const uid = localStorage.getItem("uid");

async function loadFavorites() {

    if (!uid) {
        container.innerHTML = `
            <div class="alert alert-warning">
                Please log in first.
            </div>
        `;
        return;
    }

    const q = query(
        collection(db, "favorites"),
        where("userId", "==", uid)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        container.innerHTML = `
            <div class="alert alert-info">
                You haven't added any favorites yet.
            </div>
        `;
        return;
    }

    container.innerHTML = "";

    for (const favorite of snapshot.docs) {

        const productId = favorite.data().productId;

        const productSnap = await getDoc(doc(db, "products", productId));

        if (!productSnap.exists()) continue;

        const product = productSnap.data();

        container.innerHTML += `
            <div class="card mb-3 shadow">

                ${product.photo ? `
                <img src="${product.photo}"
                     class="card-img-top"
                     style="height:220px;object-fit:cover;">
                ` : ""}

                <div class="card-body">

                    <h4>🌾 ${product.name}</h4>

                    <span class="badge bg-success">
                        ${product.category}
                    </span>

                    <h3 class="text-success mt-2">
                        ₦${Number(product.price).toLocaleString()}
                    </h3>

                    <p><strong>Location:</strong> ${product.location}</p>

                    <button
                        class="btn btn-success w-100"
                        onclick="viewProduct('${productId}')">
                        👀 View Details
                    </button>

                </div>

            </div>
        `;
    }

}

function viewProduct(id) {

    localStorage.setItem("selectedProduct", id);

    window.location.href = "product.html";
                }
    window.viewProduct = viewProduct;

loadFavorites();