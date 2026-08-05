const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product-card");

searchInput.addEventListener("input", function () {

    let value = this.value.toLowerCase().trim();

    // Smart keywords
    if (value === "tshirt" || value === "t shirt") value = "t-shirt";
    if (value === "pant") value = "pants";
    if (value === "shirt pant" || value === "shirt pants") value = "shirt pants combo";

    products.forEach(product => {

        const title = product.querySelector("h3").textContent.toLowerCase();

        // Show all when search box is empty
        if (value === "") {
            product.style.display = "block";
            return;
        }

        // Shirt
        if (value === "shirt") {
            if (title === "shirt" || title === "shirt pants combo") {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
            return;
        }

        // Pants
        if (value === "pants") {
            if (title === "pants" || title === "shirt pants combo") {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
            return;
        }

        // Other searches
        if (title.includes(value)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });

});
const hearts = document.querySelectorAll(".wishlist");

let saved = JSON.parse(localStorage.getItem("wishlist")) || [];

hearts.forEach((heart, index) => {

    if (saved.includes(index)) {
        heart.classList.add("active");
        heart.innerHTML = "♥";
    }

    heart.addEventListener("click", function () {

        this.classList.toggle("active");

        if (this.classList.contains("active")) {
            this.innerHTML = "♥";

            if (!saved.includes(index)) {
                saved.push(index);
            }

        } else {
            this.innerHTML = "♡";
            saved = saved.filter(i => i !== index);
        }

        localStorage.setItem("wishlist", JSON.stringify(saved));

    });

});
const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
        themeBtn.innerHTML = "☀️";
    }else{
        themeBtn.innerHTML = "🌙";
    }
});
const shareButtons = document.querySelectorAll(".share-btn");

shareButtons.forEach(button => {
    button.addEventListener("click", async () => {
        const link = button.parentElement.querySelector(".shop-btn").href;

        try {
            await navigator.share({
                title: "OutfitCode.in",
                text: "Check out this product",
                url: link
            });
        } catch (e) {
            // User cancelled share
        }
    });
});
function filterCategory(category) {
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        const title = product.querySelector("h3").textContent.toLowerCase();

        if (category === "all") {
            product.style.display = "block";
        } else if (title.includes(category)) {
            product.style.display = "block";
        } else if (category === "shirt" && title.includes("shirt pants combo")) {
            product.style.display = "block";
        } else if (category === "pants" && title.includes("shirt pants combo")) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}
const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

setInterval(() => {

    slides[currentSlide].classList.remove("active");

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");

},3000);