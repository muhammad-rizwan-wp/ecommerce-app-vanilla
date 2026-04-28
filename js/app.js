import { getProducts } from "./api.js";
import { addToCart, decreaseQty, increaseQty, removeItem } from "./cart.js";
import { renderCart, renderProducts } from "./ui.js";
import { debounce } from "./utils.js";

let products = [];

async function init() {
  products = await getProducts();
  renderProducts(products);
  renderCart();
}

document.addEventListener("click", (e) => {
  const id = e.target.dataset.id;

  if (e.target.innerText === "Add to Cart") {
    const card = e.target.closest(".card");
    const id = card.dataset.id;

    const product = products.find((item) => item.id == id);
    addToCart(product);
    renderCart();
  }

  if (e.target.classList.contains("increase")) {
    increaseQty(id);
    renderCart();
  }

  if (e.target.classList.contains("decrease")) {
    decreaseQty(id);
    renderCart();
  }

  if (e.target.classList.contains("remove")) {
    removeItem(id);
    renderCart();
  }

});

document.querySelector("#search").addEventListener(
  "input",
  debounce((e) => {
    const keyword = e.target.value.toLowerCase();

    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(keyword),
    );

    renderProducts(filtered);
  }),
);

init();
