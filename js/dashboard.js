const totalProducts = document.getElementById("totalProducts");
const totalOrders = document.getElementById("totalOrders");
const totalValue = document.getElementById("totalValue");

import { db } from "./auth.js";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// =====================================
// FarmLink Dashboard
// =====================================

// Navigation
function goSell() {
    window.location.href = "sell.html";
}

function goBuy() {
    window.location.href = "buyers.html";
}

function goRatings() {
    window.location.href = "ratings.html";
}

function goProfile() {
    window.location.href = "profile.html";
}

// =====================================
// Load Products
// =====================================

const container = document.getElementById("nearbyProduce");
const searchInput = document.getElementById("searchInput");

let products = [];

async function loadProducts() {

    try {

        const snapshot = await getDocs(collection(db, "products"));

        products = [];

        snapshot.forEach((document) => {

            products.push({
                firestoreId: document.id,
                ...document.data()
            });

        });

        displayProducts(products);
        totalProducts.textContent = products.length;

let total = 0;

products.forEach(product => {
    total += Number(product.price);
});

totalValue.textContent = "₦" + total.toLocaleString();

    } catch (error) {

        console.error(error);

        alert("Unable to load products.");

    }

}

async function loadOrderCount() {

    const snapshot = await getDocs(collection(db, "orders"));

    totalOrders.textContent = snapshot.size;

}

loadOrderCount();
// =====================================
// Display Products
// =====================================

function displayProducts(productList) {

    container.innerHTML = "";

    if (productList.length === 0) {

        container.innerHTML = `
            <div class="alert alert-warning text-center">
                No produce available.
            </div>
        `;

        return;
    }

    productList.forEach(product => {

        container.innerHTML += `

        <div class="card shadow mb-4">

            ${
                product.photo
                    ? `<img src="${product.photo}"
                           class="card-img-top"
                           style="height:220px;object-fit:cover;">`
                    : ""
            }

            <div class="card-body">

                <div class="d-flex justify-content-between align-items-center">

                    <h4>🌾 ${product.name}</h4>

                    <button
                        class="btn ${product.favorite ? "btn-danger" : "btn-outline-danger"} btn-sm"
                        onclick="toggleFavorite('${product.firestoreId}')">
                        ❤️
                    </button>

                </div>

                <span class="badge bg-success">
                    ${product.category || "Other"}
                </span>

                <p class="text-warning mt-2">
                    ${"⭐".repeat(product.rating || 5)}
                </p>

                <h3 class="text-success">
                    ₦${Number(product.price).toLocaleString()}
                </h3>

                <div class="d-grid gap-2 mt-3">

    <button
        class="btn btn-success"
        onclick="viewProduct('${product.firestoreId}')">
        👀 View Details
    </button>

    <button
        class="btn btn-warning"
        onclick="editProduct('${product.firestoreId}')">
        ✏️ Edit
    </button>

    <button
        class="btn btn-outline-danger"
        onclick="deleteProduct('${product.firestoreId}')">
        🗑 Delete
    </button>

    

</div>

            </div>

        </div>

        `;

    });

}

// Show products
loadProducts();
// =====================================
// Search
// =====================================

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const keyword = this.value.toLowerCase();

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(keyword)
        );

        displayProducts(filteredProducts);

    });

}

// =====================================
// Category Filter
// =====================================

const categoryFilter = document.getElementById("categoryFilter");

if (categoryFilter) {

    categoryFilter.addEventListener("change", function () {

        if (this.value === "All") {
            displayProducts(products);
            return;
        }

        const filteredProducts = products.filter(product =>
            product.category === this.value
        );

        displayProducts(filteredProducts);

    });

}

// =====================================
// Sort Products
// =====================================

const sortFilter = document.getElementById("sortFilter");

if (sortFilter) {

    sortFilter.addEventListener("change", function () {

        let sortedProducts = [...products];

        if (this.value === "low") {
            sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
        }

        if (this.value === "high") {
            sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
        }

        if (this.value === "new") {
            sortedProducts.sort((a, b) => b.id - a.id);
        }

        displayProducts(sortedProducts);

    });

}

// =====================================
// Favorite
// =====================================

async function toggleFavorite(productId) {

    const uid = localStorage.getItem("uid");

    if (!uid) {
        alert("Please log in first.");
        return;
    }

    try {

        await addDoc(collection(db, "favorites"), {

            userId: uid,
            productId: productId

        });

        alert("❤️ Added to Favorites!");

    } catch (error) {

        alert(error.message);

    }

}

window.toggleFavorite = toggleFavorite;
// =====================================
// Delete Product
// =====================================

async function deleteProduct(id) {

    if (!confirm("Delete this product?")) {
        return;
    }

    try {

        await deleteDoc(doc(db, "products", id));

        alert("Product deleted successfully.");

        loadProducts();

    } catch (error) {

        alert(error.message);

    }

}

window.deleteProduct = deleteProduct;

// =====================================
// View Product
// =====================================

function viewProduct(id) {

    localStorage.setItem("selectedProduct", id);

    window.location.href = "product.html";

}

window.viewProduct = viewProduct;

function editProduct(id) {

    localStorage.setItem("editProduct", id);

    window.location.href = "edit.html";

}

window.editProduct = editProduct;

// Logout
function goOrders() {
    window.location.href = "orders.html";
}

window.goOrders = goOrders;

function logout() {
    window.location.href = "login.html";
}

window.logout = logout;

function goFavorites() {
    window.location.href = "favorites.html";
}

window.goFavorites = goFavorites;


    