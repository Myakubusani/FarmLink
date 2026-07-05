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

const produce = JSON.parse(localStorage.getItem("farmProduce"));

if (produce) {
    const container = document.getElementById("nearbyProduce");

    container.innerHTML += `
        <div class="card shadow-sm mb-3">
            <div class="card-body">
                <h5>🌽 ${produce.name}</h5>
                <p><strong>Quantity:</strong> ${produce.quantity}</p>
                <p><strong>Price:</strong> ₦${Number(produce.price).toLocaleString()}</p>

                <button class="btn btn-success w-100">
                    Contact Farmer
                </button>
            </div>
        </div>
    `;
}
