import { db } from "./auth.js";

import {
    collection,
    query,
    where,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const container = document.getElementById("ordersContainer");

async function loadOrders() {

    try {

        const snapshot = await getDocs(collection(db, "orders"));

        if (snapshot.empty) {

            container.innerHTML = `
                <div class="alert alert-info">
                    No orders available.
                </div>
            `;
            return;
        }

        container.innerHTML = "";

        snapshot.forEach((doc) => {

            const order = doc.data();
            const orderid = doc.id;

            container.innerHTML += `

            <div class="card shadow mb-3">

                <div class="card-body">

                    <h4>🌾 ${order.productName}</h4>

                    <p><strong>Farmer:</strong> ${order.farmerName}</p>

                    <p><strong>Price:</strong> ₦${Number(order.price).toLocaleString()}</p>

                    <p><strong>Status:</strong>
                        <span class="badge bg-warning text-dark">
                            ${order.status}
                        </span>
                    </p>

                    <p><strong>Ordered:</strong> ${order.orderedAt}</p>

                    <a href="tel:${order.phone}" class="btn btn-success">
                        📞 Call Farmer
                    </a>

                    <button
                    class="btn btn-danger"
                    onclick="deleteOrder('${doc.id}')">
                        🗑️ Delete Order
                    </button>

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

loadOrders();

async function deleteOrder(id) {

    if (!confirm("Are you sure you want to delete this order?")) {
        return;
    }

    try {
        await deleteDoc(doc(db, "orders", id));

        alert("Order deleted successfully.");

        loadOrders();

    } catch (error) {
        alert("Error deleting order: " + error.message);
    }
}

// Make function available to the HTML onclick
window.deleteOrder = deleteOrder;