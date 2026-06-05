// Products have 4 fields: name, price, category, and image path
const products = [
  { name: "Vintage Levi's 501 Jeans", price: 28.0, category: "Unisex" },
  { name: "Oversized Flannel Shirt", price: 14.0, category: "Unisex" },
  { name: "Y2K Cargo Pants", price: 22.5, category: "Men's" },
  { name: "Washed Graphic Tee", price: 9.0, category: "Unisex" },
  { name: "High-Waist Mom Jeans", price: 24.0, category: "Women's" },
  { name: "Corduroy Blazer", price: 32.0, category: "Men's" },
  { name: "Slip Dress", price: 18.0, category: "Women's" },
  { name: "Baggy Chinos", price: 19.5, category: "Men's" },
  { name: "Knit Cardigan", price: 21.0, category: "Women's" },
  { name: "Denim Jacket", price: 27.0, category: "Unisex" },
  { name: "Plaid Mini Skirt", price: 15.0, category: "Women's" },
  { name: "Vintage Band Tee", price: 12.0, category: "Unisex" },
  { name: "Straight Leg Trousers", price: 20.0, category: "Men's" },
  { name: "Cropped Hoodie", price: 17.0, category: "Women's" },
  { name: "Windbreaker Jacket", price: 35.0, category: "Unisex" },
];

const mens = products.filter((p) => p.category === "Men's");
const womens = products.filter((p) => p.category === "Women's");
const unisex = products.filter((p) => p.category === "Unisex");

const itemsGrid = document.querySelector(".items-grid");

itemsGrid.innerHTML = products
  .map((product) => {
    return `<div class="item">
      <img src="assets/images/shirt_1.webp" />
      <h1 class="text-medium text-bold product-name">
          ${product.name}
      </h1>
      <p class="text-medium product-description">
        ${product.category}
      </p>
      <h2 class="text-medium text-bold product-price">
      RM ${product.price.toFixed(2)}
      </h2>
  </div>`;
  })
  .join("");
