// Products have 4 fields: name, price, category, and image path
const products = [
  {
    name: "Vintage Levi's 501 Jeans",
    price: 28.0,
    category: "Unisex",
    image_src: "../assets/images/levi_jeans.jpg",
  },
  {
    name: "Oversized Flannel Shirt",
    price: 14.0,
    category: "Unisex",
    image_src: "../assets/images/flannel_shirt.webp",
  },
  {
    name: "Y2K Cargo Pants",
    price: 22.5,
    category: "Men's",
    image_src: "../assets/images/cargo_pants.jpg",
  },
  {
    name: "Washed Graphic Tee",
    price: 9.0,
    category: "Unisex",
    image_src: "../assets/images/graphic_tee.webp",
  },
  {
    name: "High-Waist Mom Jeans",
    price: 24.0,
    category: "Women's",
    image_src: "../assets/images/mom_jeans.webp",
  },
  {
    name: "Corduroy Blazer",
    price: 32.0,
    category: "Men's",
    image_src: "../assets/images/corduroy_blazer.webp",
  },
  {
    name: "Slip Dress",
    price: 18.0,
    category: "Women's",
    image_src: "../assets/images/slip_dress.webp",
  },
  {
    name: "Baggy Chinos",
    price: 19.5,
    category: "Men's",
    image_src: "../assets/images/baggy_chinos.webp",
  },
  {
    name: "Knit Cardigan",
    price: 21.0,
    category: "Women's",
    image_src: "../assets/images/knit_cardigan.webp",
  },
  {
    name: "Denim Jacket",
    price: 27.0,
    category: "Unisex",
    image_src: "../assets/images/denim_jacket.webp",
  },
  {
    name: "Plaid Mini Skirt",
    price: 15.0,
    category: "Women's",
    image_src: "../assets/images/plaid_mini_skirt.webp",
  },
  {
    name: "Vintage Band Tee",
    price: 12.0,
    category: "Unisex",
    image_src: "../assets/images/vintage_band_tee.jpg",
  },
  {
    name: "Straight Leg Trousers",
    price: 20.0,
    category: "Men's",
    image_src: "../assets/images/straight_leg_trousers.webp",
  },
  {
    name: "Cropped Hoodie",
    price: 17.0,
    category: "Women's",
    image_src: "../assets/images/cropped_hoodie.webp",
  },
  {
    name: "Windbreaker Jacket",
    price: 35.0,
    category: "Unisex",
    image_src: "../assets/images/windbreaker.webp",
  },
];

const mens = products.filter((p) => p.category === "Men's");
const womens = products.filter((p) => p.category === "Women's");
const unisex = products.filter((p) => p.category === "Unisex");

const itemsGrid = document.querySelector(".items-grid");

itemsGrid.innerHTML = products
  .map((product) => {
    return `<div class="item">
      <img src=${product.image_src} />
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
