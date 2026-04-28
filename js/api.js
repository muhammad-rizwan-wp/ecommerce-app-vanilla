export async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    return await res.json();
  } catch (error) {
    console.error("API Error: ", error);
    return [];
  }
}
