import { db, auth } from "./auth.js";

import {
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// =====================================
// FarmLink Dashboard
// =====================================
const currentUserType = localStorage.getItem("userType");
const sellButton = document.getElementById("sellButton");

if (sellButton && currentUserType !== "Farmer") {
    sellButton.style.display = "none";
}
// Logged-in user
const currentUserId = localStorage.getItem("uid");
console.log("Current User ID:", currentUserId);
console.log("Current User Type:", currentUserType);

// Dashboard statistics
const totalProducts = document.getElementById("totalProducts");
const totalOrders = document.getElementById("totalOrders");
const totalValue = document.getElementById("totalValue");

// Products container and search
const container = document.getElementById("nearbyProduce");
const searchInput = document.getElementById("searchInput");

let products = [];

// =====================================
// Navigation
// =====================================

function goSell() {
    const userType = localStorage.getItem("userType");

    if (userType !== "Farmer") {
        alert("Only farmers can sell produce.");
        return;
    }

    window.location.href = "sell.html";
}

window.goSell = goSell;

function goBuy() {
    window.location.href = "buyers.html";
}

function goRatings() {
    window.location.href = "ratings.html";
}

function goProfile() {
    window.location.href = "profile.html";
}

function goOrders() {
    window.location.href = "orders.html";
}

function goFavorites() {
    window.location.href = "favorites.html";
}

// Make navigation functions available to HTML
window.goSell = goSell;
window.goBuy = goBuy;
window.goRatings = goRatings;
window.goProfile = goProfile;
window.goOrders = goOrders;
window.goFavorites = goFavorites;

// =====================================
// Load Products
// =====================================

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

        // Total products
        if (totalProducts) {
            totalProducts.textContent = products.length;
        }

        // Total product value
        let total = 0;

        products.forEach(product => {
            total += Number(product.price) || 0;
        });

        if (totalValue) {
            totalValue.textContent = "₦" + total.toLocaleString();
        }

    } catch (error) {

        console.error(error);
        alert("Unable to load products.");

    }

}

// =====================================
// Load Order Count
// =====================================

async function loadOrderCount() {

    try {

        const snapshot = await getDocs(collection(db, "orders"));

        if (totalOrders) {
            totalOrders.textContent = snapshot.size;
        }

    } catch (error) {

        console.error("Unable to load orders:", error);

    }

}

// =====================================
// Display Products
// =====================================

function displayProducts(productList) {

    if (!container) {
        return;
    }

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

        // Only the farmer who owns the product can edit/delete it
        const canManageProduct =
            currentUserType === "Farmer" &&
            product.userId === currentUserId;

        container.innerHTML += `

            <div class="card shadow mb-4">

                ${
                    product.photo
                        ? `
                            <img
                                src="${product.photo}"
                                class="card-img-top"
                                style="height:220px; object-fit:cover;"
                            >
                        `
                        : ""
                }

                <div class="card-body">

                    <div class="d-flex justify-content-between align-items-center">

                        <h4>🌾 ${product.name}</h4>

                        <button
                            class="btn ${
                                product.favorite
                                    ? "btn-danger"
                                    : "btn-outline-danger"
                            } btn-sm"
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

                        ${
                            canManageProduct
                                ? `
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
                                `
                                : ""
                        }

                    </div>

                </div>

            </div>

        `;

    });

}

// =====================================
// Search
// =====================================

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const keyword = this.value.toLowerCase();

        const filteredProducts = products.filter(product =>
            product.name
                .toLowerCase()
                .includes(keyword)
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

            sortedProducts.sort(
                (a, b) =>
                    Number(a.price) - Number(b.price)
            );

        }

        if (this.value === "high") {

            sortedProducts.sort(
                (a, b) =>
                    Number(b.price) - Number(a.price)
            );

        }

        if (this.value === "new") {

            sortedProducts.sort(
                (a, b) =>
                    Number(b.id) - Number(a.id)
            );

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

        console.error(error);
        alert(error.message);

    }

}

window.toggleFavorite = toggleFavorite;

// =====================================
// Delete Product
// =====================================

async function deleteProduct(id) {

    // Find the product before deleting
    const product = products.find(
        item => item.firestoreId === id
    );

    if (!product) {

        alert("Product not found.");
        return;

    }

    // Security check
    if (
        currentUserType !== "Farmer" ||
        product.userId !== currentUserId
    ) {

        alert("You are not allowed to delete this product.");
        return;

    }

    if (!confirm("Delete this product?")) {
        return;
    }

    try {

        await deleteDoc(
            doc(db, "products", id)
        );

        alert("Product deleted successfully.");

        loadProducts();

    } catch (error) {

        console.error(error);
        alert(error.message);

    }

}

window.deleteProduct = deleteProduct;

// =====================================
// View Product
// =====================================

function viewProduct(id) {

    localStorage.setItem(
        "selectedProduct",
        id
    );

    window.location.href = "product.html";

}

window.viewProduct = viewProduct;

// =====================================
// Edit Product
// =====================================

function editProduct(id) {

    const product = products.find(
        item => item.firestoreId === id
    );

    if (!product) {

        alert("Product not found.");
        return;

    }

    // Security check
    if (
        currentUserType !== "Farmer" ||
        product.userId !== currentUserId
    ) {

        alert("You are not allowed to edit this product.");
        return;

    }

    localStorage.setItem(
        "editProduct",
        id
    );

    window.location.href = "edit.html";

}

window.editProduct = editProduct;

// =====================================
// Logout
// =====================================

async function logout() {
  try {
    await signOut(auth);

    localStorage.removeItem("uid");
    localStorage.removeItem("userType");
    localStorage.removeItem("phone");

    window.location.href = "login.html";
  } catch (error) {
    console.error("Logout error:", error);
    alert("Unable to logout.");
  }
}

window.logout = logout;

// =====================================
// Start Dashboard
// =====================================

loadProducts();
loadOrderCount();

