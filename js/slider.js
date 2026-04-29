export function renderSlider(products){
    const slider = document.querySelector("#slider");

    const featured = products.slice(0, 5);

    slider.innerHTML = `
        <div class="slides">
            ${
                featured.map((product) => `
                    <div class="slide">
                        <img src="${product.image}" />
                        <h3>${product.title}</h3>
                    </div>
                `).join("")
            }
        </div>
    `
}