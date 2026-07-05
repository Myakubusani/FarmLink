// =============================
// FarmLink - Sell Produce
// =============================

let selectedProduce = "";

// Select produce
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

    if (selectedProduce === "") {
        alert("Please select a produce.");
        return;
    }

    if (quantity === "" || price === "") {
        alert("Please fill all fields.");
        return;
    }

    if (farmerName === "" || phone === "" || location === "") {
        alert("Please fill all farmer information.");
        return;
    }

    const produce = {
        id: Date.now(),
        postedAt: new Date().toLocaleString(),
        farmerName: farmerName,
        phone: phone,
        location: location,
        name: selectedProduce,
        quantity: quantity,
        price: price
    };

    let products = JSON.parse(localStorage.getItem("farmProducts")) || [];

    products.push(produce);

    localStorage.setItem("farmProducts", JSON.stringify(products));

    alert("✅ Produce posted successfully!");

    window.location.href = "dashboard.html";

});