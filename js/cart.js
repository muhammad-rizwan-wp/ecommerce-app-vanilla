import { saveCart, loadCart } from "./storage.js";

let cart = loadCart();

export function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
}

export function increaseQty(id) {
  const item = cart.find((item) => item.id == id);

  if (item) {
    item.qty++;
  }

  saveCart(cart);
}

export function decreaseQty(id) {
  const item = cart.find((item) => item.id == id);

  if (item) {
    item.qty--;

    if (item.qty <= 0) {
      cart = cart.filter((item) => item.id != id);
    }
  }

  saveCart(cart);
}

export function removeItem(id) {
  cart = cart.filter((item) => item.id != id);
  saveCart(cart);
}

export function getCart() {
  return cart;
}

export function getTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}
