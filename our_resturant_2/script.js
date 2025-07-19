const foodData = {
  burger: [
    { name: "Classic Burger", price: 80000, img: "burger1.jpg" },
    { name: "Cheese Burger", price: 95000, img: "burger2.jpg" },
    { name: "Spicy Burger", price: 90000, img: "burger2.jpg" },
    { name: "Double Burger", price: 110000, img: "burger4.jpg" },
  ],
  pizza: [
    { name: "Margherita", price: 120000, img: "margherita.jpg" },
    { name: "Pepperoni", price: 130000, img: "peperoni.jpg" },
    { name: "Vegetarian", price: 125000, img: "vegetrian.jpg" },
    { name: "BBQ Chicken", price: 135000, img: "bbq.jpg" },
  ],
  sandwich: [
    { name: "Chicken Sandwich", price: 75000, img: "chicken sandwich.jpg" },
    { name: "Club Sandwich", price: 85000, img: "club sandwich.jpg" },
    { name: "Veggie Sandwich", price: 70000, img: "vegi sandwich.jpg" },
    { name: "Tuna Sandwich", price: 80000, img: "tuna sandwich.jpg" },
  ],
  dessert: [
    { name: "Chocolate Cake", price: 60000, img: "chocolate cake.jpg" },
    { name: "Cheesecake", price: 65000, img: "chees cake.jpg" },
    { name: "Fruit Tart", price: 55000, img: "tart.jpg" },
    { name: "Ice Cream", price: 50000, img: "ice creem.jpg" },
  ],
};

const itemsSection = document.getElementById("items-section");
const cart = {};
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartCountEl = document.getElementById("cart-count");

document.querySelectorAll(".menu li").forEach(li => {
  li.addEventListener("click", () => {
    const category = li.dataset.category;
    renderItems(category);
  });
});

function renderItems(category) {
  itemsSection.innerHTML = "";

  foodData[category].forEach((food, index) => {
    const card = document.createElement("div");
    card.className = "item-card";
    card.style.animationDelay = `${index * 0.1}s`; // ← هر کارت با تأخیر بیاد

    card.innerHTML = `
      <img src="${food.img}" alt="${food.name}" />
      <div class="item-info">
        <h3>${food.name}</h3>
        <p>${food.price.toLocaleString()} Toman</p>
        <button onclick="addToCart('${food.name}', ${food.price})">Add to Cart</button>
      </div>
    `;
    itemsSection.appendChild(card);
  });
}

function addToCart(name, price) {
  if (!cart[name]) {
    cart[name] = { price, quantity: 1 };
  } else {
    cart[name].quantity++;
  }
  updateCart();
}

function updateCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  let count = 0;
  for (const item in cart) {
    const { price, quantity } = cart[item];
    const li = document.createElement("li");
    li.innerHTML = `${item} × ${quantity} = ${(price * quantity).toLocaleString()} Toman 
      <button onclick="removeFromCart('${item}')">✖</button>`;
    cartItemsEl.appendChild(li);
    total += price * quantity;
    count += quantity;
  }
  cartTotalEl.textContent = total.toLocaleString();
  cartCountEl.textContent = count;
}

function removeFromCart(name) {
  delete cart[name];
  updateCart();
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("hidden");
}

function checkout() {
  alert("Checkout is not implemented yet.");
}