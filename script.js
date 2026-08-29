/* =========================================================
   SHOPORA E-COMMERCE WEBSITE
   COMPLETE JAVASCRIPT
   ========================================================= */


/* ================= PRODUCT DATABASE ================= */

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1999,
        oldPrice: 2999,
        rating: "⭐⭐⭐⭐⭐",
        reviews: 125,
        image: "headphone.avif"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2499,
        oldPrice: 3499,
        rating: "⭐⭐⭐⭐☆",
        reviews: 89,
        image: "Watch.avif"
    },

    {
        id: 3,
        name: "Premium Running Shoes",
        category: "Shoes",
        price: 1799,
        oldPrice: 2499,
        rating: "⭐⭐⭐⭐⭐",
        reviews: 210,
        image: "shoes.avif"
    },

    {
        id: 4,
        name: "Premium Backpack",
        category: "Fashion",
        price: 999,
        oldPrice: 1499,
        rating: "⭐⭐⭐⭐☆",
        reviews: 76,
        image: "backpack.avif"
    },

    {
        id: 5,
        name: "Smartphone",
        category: "Electronics",
        price: 15999,
        oldPrice: 18999,
        rating: "⭐⭐⭐⭐⭐",
        reviews: 320,
        image: "phone.avif"
    },

    {
        id: 6,
        name: "Bluetooth Earbuds",
        category: "Electronics",
        price: 1299,
        oldPrice: 1999,
        rating: "⭐⭐⭐⭐☆",
        reviews: 145,
        image: "earbuds.webp"
    },

    {
        id: 7,
        name: "Men's Casual T-Shirt",
        category: "Fashion",
        price: 699,
        oldPrice: 999,
        rating: "⭐⭐⭐⭐⭐",
        reviews: 98,
        image: "tshirt.webp"
    },

    {
        id: 8,
        name: "Women handbag",
        category: "Fashion",
        price: 1199,
        oldPrice: 1799,
        rating: "⭐⭐⭐⭐☆",
        reviews: 87,
        image: "handbag.avif"
    },

    {
        id: 9,
        name: "Face Beauty Kit",
        category: "Beauty",
        price: 899,
        oldPrice: 1299,
        rating: "⭐⭐⭐⭐⭐",
        reviews: 156,
        image: "beauty.avif"
    },

    {
        id: 10,
        name: "Home Decor Lamp",
        category: "Home",
        price: 799,
        oldPrice: 1199,
        rating: "⭐⭐⭐⭐☆",
        reviews: 65,
        image: "home.avif"
    }

];


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

let cart =
    JSON.parse(localStorage.getItem("shoporaCart")) || [];

let wishlist =
    JSON.parse(localStorage.getItem("shoporaWishlist")) || [];


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const cartCount =
    document.getElementById("cartCount");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const featuredProducts =
    document.getElementById("featuredProducts");

const trendingProducts =
    document.getElementById("trendingProducts");

const newsletterForm =
    document.getElementById("newsletterForm");


/* =========================================================
   SAVE CART
   ========================================================= */

function saveCart() {

    localStorage.setItem(
        "shoporaCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   SAVE WISHLIST
   ========================================================= */

function saveWishlist() {

    localStorage.setItem(
        "shoporaWishlist",
        JSON.stringify(wishlist)
    );

}


/* =========================================================
   UPDATE CART COUNT
   ========================================================= */

function updateCartCount() {

    if (!cartCount) return;

    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    cartCount.textContent = total;

}


/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(productId) {

    const product =
        products.find(
            product =>
                product.id === productId
        );

    if (!product) return;


    const existing =
        cart.find(
            item =>
                item.id === productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    showNotification(
        `${product.name} added to cart 🛒`
    );

}


/* =========================================================
   REMOVE FROM CART
   ========================================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );

    saveCart();

    updateCartCount();

}


/* =========================================================
   INCREASE QUANTITY
   ========================================================= */

function increaseQuantity(productId) {

    const item =
        cart.find(
            product =>
                product.id === productId
        );

    if (!item) return;

    item.quantity++;

    saveCart();

    updateCartCount();

}


/* =========================================================
   DECREASE QUANTITY
   ========================================================= */

function decreaseQuantity(productId) {

    const item =
        cart.find(
            product =>
                product.id === productId
        );

    if (!item) return;


    if (item.quantity > 1) {

        item.quantity--;

    } else {

        removeFromCart(productId);

    }


    saveCart();

    updateCartCount();

}


/* =========================================================
   CLEAR CART
   ========================================================= */

function clearCart() {

    cart = [];

    saveCart();

    updateCartCount();

    showNotification(
        "Cart cleared 🛒"
    );

}


/* =========================================================
   WISHLIST
   ========================================================= */

function toggleWishlist(productId) {

    const product =
        products.find(
            item =>
                item.id === productId
        );

    if (!product) return;


    const index =
        wishlist.indexOf(productId);


    if (index === -1) {

        wishlist.push(productId);

        showNotification(
            `${product.name} added to wishlist ❤️`
        );

    } else {

        wishlist.splice(index, 1);

        showNotification(
            `${product.name} removed from wishlist`
        );

    }


    saveWishlist();

    updateWishlistButtons();

}


/* =========================================================
   UPDATE WISHLIST BUTTONS
   ========================================================= */

function updateWishlistButtons() {

    document
        .querySelectorAll(".wishlist-btn")
        .forEach(button => {

            const id =
                Number(
                    button.dataset.productId
                );


            if (wishlist.includes(id)) {

                button.textContent = "❤️";

            } else {

                button.textContent = "🤍";

            }

        });

}


/* =========================================================
   CREATE PRODUCT CARD
   ========================================================= */

function createProductCard(product) {

    return `

        <article class="product-card">

            <div class="product-image">

                <span class="badge">
                    SALE
                </span>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <button
                    class="wishlist-btn"
                    data-product-id="${product.id}"
                    aria-label="Add to wishlist"
                >
                    🤍
                </button>

            </div>


            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>
                    ${product.name}
                </h3>


                <div class="rating">

                    ${product.rating}

                    <span>
                        (${product.reviews})
                    </span>

                </div>


                <div class="price">

                    <span class="current-price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </span>

                    <span class="old-price">
                        ₹${product.oldPrice.toLocaleString("en-IN")}
                    </span>

                </div>


                <button
                    class="add-cart-btn"
                    data-product-id="${product.id}"
                >
                    Add to Cart
                </button>

            </div>

        </article>

    `;

}


/* =========================================================
   DISPLAY TRENDING PRODUCTS
   ========================================================= */

function displayTrendingProducts() {

    if (!trendingProducts) return;


    const trending =
        products.slice(4, 10);


    trendingProducts.innerHTML =
        trending
            .map(createProductCard)
            .join("");


    updateWishlistButtons();

}


/* =========================================================
   SEARCH PRODUCTS
   ========================================================= */

function searchProducts() {

    if (!searchInput) return;


    const keyword =
        searchInput.value
            .trim()
            .toLowerCase();


    if (keyword === "") {

        showNotification(
            "Please enter a product name 🔍"
        );

        return;

    }


    const results =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(keyword)

            ||

            product.category
                .toLowerCase()
                .includes(keyword)

        );


    if (results.length === 0) {

        showNotification(
            "No product found 😔"
        );

        return;

    }


    if (featuredProducts) {

        featuredProducts.innerHTML =
            results
                .map(createProductCard)
                .join("");


        updateWishlistButtons();


        featuredProducts.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================================================
   SEARCH BUTTON
   ========================================================= */

if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        searchProducts
    );

}


/* =========================================================
   SEARCH USING ENTER
   ========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                searchProducts();

            }

        }
    );

}


/* =========================================================
   CATEGORY FILTER
   ========================================================= */

function filterByCategory(category) {

    const result =
        products.filter(
            product =>
                product.category.toLowerCase()
                === category.toLowerCase()
        );


    if (featuredProducts) {

        featuredProducts.innerHTML =
            result
                .map(createProductCard)
                .join("");


        updateWishlistButtons();


        featuredProducts.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================================
   GLOBAL CLICK EVENTS
   ========================================================= */

document.addEventListener(
    "click",
    function(event) {


        /* ---------- ADD TO CART ---------- */

        const cartButton =
            event.target.closest(
                ".add-cart-btn"
            );


        if (cartButton) {

            const id =
                Number(
                    cartButton.dataset.productId
                );

            addToCart(id);

        }


        /* ---------- WISHLIST ---------- */

        const wishlistButton =
            event.target.closest(
                ".wishlist-btn"
            );


        if (wishlistButton) {

            const id =
                Number(
                    wishlistButton.dataset.productId
                );

            toggleWishlist(id);

        }

    }
);


/* =========================================================
   NEWSLETTER
   ========================================================= */

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const emailInput =
                document.getElementById("email");


            const email =
                emailInput.value.trim();


            if (!email) {

                showNotification(
                    "Please enter your email 📧"
                );

                return;

            }


            showNotification(
                "Successfully subscribed! 🎉"
            );


            newsletterForm.reset();

        }
    );

}


/* =========================================================
   NOTIFICATION
   ========================================================= */

function showNotification(message) {

    const old =
        document.querySelector(
            ".shopora-notification"
        );


    if (old) {
        old.remove();
    }


    const notification =
        document.createElement("div");


    notification.className =
        "shopora-notification";


    notification.textContent =
        message;


    notification.style.position = "fixed";
    notification.style.top = "20px";
    notification.style.right = "20px";
    notification.style.padding = "14px 20px";
    notification.style.background = "#2563eb";
    notification.style.color = "#ffffff";
    notification.style.borderRadius = "8px";
    notification.style.fontWeight = "600";
    notification.style.zIndex = "9999";
    notification.style.boxShadow =
        "0 10px 25px rgba(0,0,0,0.2)";
    notification.style.animation =
        "shoporaNotification 0.3s ease";


    document.body.appendChild(
        notification
    );


    setTimeout(
        () => {

            notification.remove();

        },
        2500
    );

}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    targetId === "#" ||
                    targetId === "#login" ||
                    targetId === "#wishlist" ||
                    targetId === "#cart"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


/* =========================================================
   INITIALIZE SHOPORA
   ========================================================= */

updateCartCount();

displayTrendingProducts();

updateWishlistButtons();


/* =========================================================
   DEBUG MESSAGE
   ========================================================= */

console.log(
    "🛍️ Shopora E-Commerce loaded successfully!"
);

console.log(
    `Products: ${products.length}`
);

console.log(
    `Cart Items: ${cart.length}`
);

console.log(
    `Wishlist Items: ${wishlist.length}`
);