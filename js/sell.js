let selectedProduce = "";

// Select produce
const produceButtons = document.querySelectorAll(".btn-light");

produceButtons.forEach(button => {
    button.addEventListener("click", () => {

        produceButtons.forEach(btn => {
            btn.classList.remove("btn-success");
            btn.classList.add("btn-light");
        });

        button.classList.remove("btn-light");
        button.classList.add("btn-success");

        selectedProduce = button.innerText.trim();
    });
});

// Post Produce
document.getElementById("postBtn").addEventListener("click", () => {

    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;

    if (selectedProduce === "") {
        alert("Please select a produce.");
        return;
    }

    if (quantity === "" || price === "") {
        alert("Please fill all fields.");
        return;
    }

    const produce = {
        name: selectedProduce,
        quantity: quantity,
        price: price
    };

    localStorage.setItem("farmProduce", JSON.stringify(produce));

    alert("✅ Produce posted successfully!");

    window.location.href = "dashboard.html";
});