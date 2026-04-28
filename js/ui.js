import { getCart, getTotal } from "./cart.js";

export function renderProducts(products) {
  const conatiner = document.querySelector("#product-list");

  conatiner.innerHTML = products
    .map(
      (item) => `
                <div class="card" data-id="${item.id}">
                    <img src="${item.image}" />
                    <h4>${item.title}</h4>
                    <p>$${item.price}</p>
                    <button>Add to Cart</button>
                </div>
            `,
    )
    .join("");
}

export function renderCart() {
  const cartItems = document.querySelector("#cart-items");
  const total = document.querySelector("#cart-total");

  const cart = getCart();

  cartItems.innerHTML = cart
    .map((item) => {
      return ` <div class="cart-item">
        <p>${item.title}</p>
        <p>$${item.price}</p>
        <div class="buttons-group">
          <div class="controls">
            <button class="decrease" data-id=${item.id}>-</button>
            <span>${item.qty}</span>
            <button class="increase" data-id=${item.id}>+</button>
          </div>

          <button class="remove" data-id="${item.id}">Remove</button>
        </div>
    </div>`;
    })
    .join("");

  total.innerText = `Total: $${getTotal().toFixed(2)}`;
}
