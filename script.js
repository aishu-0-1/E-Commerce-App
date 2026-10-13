
const products = [
    { id: 1, name: "T-Shirt", price: 499, emoji: "👕" },
    { id: 2, name: "Shoes", price: 999, emoji: "👟" },
    { id: 3, name: "Handbag", price: 799, emoji: "👜" },
    { id: 4, name: "Headphones", price: 599, emoji: "🎧" },
    { id: 5, name: "Watch", price: 699, emoji: "⌚" },
    { id: 6, name: "Sunglasses", price: 299, emoji: "🕶️" }
];

let cart = [];

const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const searchInput = document.getElementById("search");
const message = document.getElementById("message");

function displayProducts(items) {
    productsContainer.innerHTML = "";

    items.forEach(product => {
        const card = document.createElement("div");
        card.className = "product";

        const emoji = document.createElement("div");
        emoji.className = "emoji";
        emoji.textContent = product.emoji;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = `₹${product.price}`;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.addEventListener("click", () => addToCart(product.id));

        card.append(emoji, name, price, button);
        productsContainer.appendChild(card);
    });
}

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    message.textContent = "";
    displayCart();
}

function displayCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        const name = document.createElement("span");
        name.textContent = `${item.emoji} ${item.name} × ${item.quantity}`;

        const price = document.createElement("span");
        price.textContent = `₹${item.price * item.quantity}`;

        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.addEventListener("click", () => {
            cart = cart.filter(product => product.id !== item.id);
            displayCart();
        });

        row.append(name, price, remove);
        cartItems.appendChild(row);
    });

    totalElement.textContent = total;
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query)
    );

    displayProducts(filteredProducts);
});

document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length === 0) {
        message.textContent = "Please add a product to your cart first.";
        return;
    }

    message.textContent = `Demo order placed! Total: ₹${totalElement.textContent}`;
    cart = [];
    displayCart();
});

displayProducts(products);
displayCart();

