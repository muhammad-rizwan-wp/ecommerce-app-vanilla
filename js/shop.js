import { getProducts } from "./api.js";
import { renderProducts } from "./ui.js";

let allProducts = [];

async function init() {
  allProducts = await getProducts();

  renderProducts(allProducts);
  populateCategories(allProducts);
}

function populateCategories(products) {
  const select = document.querySelector("#category-filter");

  const categories = [...new Set(products.map((product) => product.category))];

  select.innerHTML += categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");
}

document.querySelector("#search").addEventListener("input", (e) => {
  filterProducts();
});

document.querySelector("#category-filter").addEventListener("change", () => {
  filterProducts();
});

function filterProducts() {
  const keyword = document.querySelector("#search").value.toLowerCase();
  const category = document.querySelector("#category-filter").value;

  let filtered = allProducts;

  if (category !== "all") {
    filtered = filtered.filter((product) => product.category === category);
  }

  if (keyword) {
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(keyword),
    );
  }

  renderProducts(filtered);
}

init();
