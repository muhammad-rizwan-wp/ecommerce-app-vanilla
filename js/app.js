import { getProducts } from "./api.js";
import { addToCart, decreaseQty, increaseQty, removeItem } from "./cart.js";
import { renderSlider } from "./slider.js";
import { renderCart, renderProducts } from "./ui.js";
import { debounce } from "./utils.js";

let products = [];

async function init() {
  products = await getProducts();

  renderSlider(products);
  renderCategories(products);
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

function renderCategories(products) {
  const container = document.querySelector("#categories");

  const categories = [...new Set(products.map((product) => product.category))];

  container.innerHTML = categories
    .map(
      (category) => `
    <div class="category">
      <h2>${category}</h2>
      <div class="row">
        ${products
          .filter((product) => product.category === category)
          .slice(0, 4)
          .map(
            (item) => `
            <div class="card">
              <img src="${item.image}" />
              <p>${item.title}</p>
            </div>
          `,
          )
          .join("")}
      </div>
    </div>
  `,
    )
    .join("");
}

init();
