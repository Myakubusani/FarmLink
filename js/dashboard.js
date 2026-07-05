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

const container = document.getElementById("nearbyProduce");
const searchInput = document.getElementById("searchInput");

let products = JSON.parse(localStorage.getItem("farmProducts")) || [];

displayProducts(products);

// =============================
// Display Products
// =============================
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

        let whatsappLink = "#";

        if (product.phone) {
            whatsappLink = "https://wa.me/234" + product.phone.substring(1);
        }

        container.innerHTML += `

        <div class="card shadow mb-3">

            <div class="card-body">

            ${
    product.photo
        ? `<img src="${product.photo}"
               class="img-fluid rounded mb-3"
               style="height:200px;width:100%;object-fit:cover;">`
        : ""
}

<h3>🌾 ${product.name}</h3>


                <p><strong>👨 Farmer:</strong> ${product.farmerName || "Unknown Farmer"}</p>

                <p><strong>📍 Location:</strong> ${product.location || "Unknown"}</p>

                <p><strong>📦 Quantity:</strong> ${product.quantity}</p>

                <p><strong>💰 Price:</strong> ₦${Number(product.price).toLocaleString()}</p>

                <p><strong>🕒 Posted:</strong> ${product.postedAt || "Recently"}</p>

                <div class="d-grid gap-2">

                    <a
                        href="${product.phone ? "tel:" + product.phone : "#"}"
                        class="btn btn-success">
                        📞 Call Farmer
                    </a>

                    <a
                        href="${whatsappLink}"
                        target="_blank"
                        class="btn btn-outline-success">
                        💬 WhatsApp Farmer
                    </a>

                    <button
                        class="btn btn-danger"
                        onclick="deleteProduct(${product.id})">
                        🗑 Delete Product
                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// =============================
// Search
// =============================

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const keyword = this.value.toLowerCase();

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(keyword)
        );

        displayProducts(filtered);

    });

}

// =============================
// Delete Product
// =============================

function deleteProduct(id) {

    if (!confirm("Delete this product?")) {
        return;
    }

    products = products.filter(product => product.id !== id);

    localStorage.setItem(
        "farmProducts",
        JSON.stringify(products)
    );

    displayProducts(products);

}