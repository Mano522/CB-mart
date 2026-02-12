// Cart Management System
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products[productId];
    if (product) {
        // Check if item already exists to increment quantity (optional improvement)
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(product.name + " added to cart!");
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(); // Refresh the UI
}

function renderCart() {
    const tbody = document.querySelector("#cart tbody");
    if (!tbody) return;

    tbody.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item, index) => {
        const priceNum = parseInt(item.price.replace('₹', ''));
        const rowSubtotal = priceNum * item.quantity;
        subtotal += rowSubtotal;

        tbody.innerHTML += `
            <tr>
                <td><a href="#" onclick="removeFromCart(${index}); return false;"><i class="far fa-times-circle"></i></a></td>
                <td><img src="${item.image}" alt=""></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><input type="number" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)"></td>
                <td>₹${rowSubtotal}</td>
            </tr>
        `;
    });

    updateTotals(subtotal);
}

function updateQuantity(index, newQty) {
    if (newQty < 1) newQty = 1;
    cart[index].quantity = parseInt(newQty);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function updateTotals(subtotal) {
    const subtotalDisplay = document.querySelector("#subtotal table tr:nth-child(1) td:nth-child(2)");
    const totalDisplay = document.querySelector("#subtotal table tr:nth-child(3) td:nth-child(2)");

    if (subtotalDisplay) subtotalDisplay.innerText = "₹" + subtotal;
    if (totalDisplay) totalDisplay.innerText = "₹" + subtotal;
}

function buyNow(productId) {
    const product = products[productId];
    if (product) {
        // For 'Buy Now', we replace the cart with just this item and go to checkout
        cart = [{
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        }];
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'checkout.html';
    }
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your order! Your items will be shipped soon.");
    cart = [];
    localStorage.removeItem('cart');
    window.location.href = 'success.html';
}

// Initialize rendering if on cart page
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("cart")) {
        renderCart();
    }
});
