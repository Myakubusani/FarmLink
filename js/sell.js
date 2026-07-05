// =============================
// FarmLink - Sell Produce
// =============================

let selectedProduce = "";

// Select Produce Card
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

    const photoInput = document.getElementById("photo");
    const photoFile = photoInput.files[0];

    // Validation
    if (selectedProduce === "") {
        alert("Please select a produce.");
        return;
    }

    if (quantity === "" || price === "") {
        alert("Please fill Quantity and Price.");
        return;
    }

    if (farmerName === "" || phone === "" || location === "") {
        alert("Please fill all farmer information.");
        return;
    }

    // Product Object
    const produce = {
        id: Date.now(),
        postedAt: new Date().toLocaleString(),
        farmerName: farmerName,
        phone: phone,
        location: location,
        name: selectedProduce,
        quantity: quantity,
        price: price,
        photo: ""
    };

    // Function to save product
    function saveProduct() {

        let products = JSON.parse(localStorage.getItem("farmProducts")) || [];

        products.push(produce);

        localStorage.setItem("farmProducts", JSON.stringify(products));

        alert("✅ Produce posted successfully!");

        window.location.href = "dashboard.html";
    }

    // Save photo if selected
    if (photoFile) {

        const reader = new FileReader();

        reader.onload = function () {

            produce.photo = reader.result;

            saveProduct();

        };

        reader.readAsDataURL(photoFile);

    } else {

        saveProduct();

    }

});