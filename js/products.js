// Products have 4 fields: name, price, category, and image path
const allProducts = [
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

// Datasets
const mens = allProducts.filter((p) => p.category === "Men's");
const womens = allProducts.filter((p) => p.category === "Women's");
const unisex = allProducts.filter((p) => p.category === "Unisex");

// Radio Button to Choose Categories
const categoryRadio = document.querySelectorAll("input[name='category']");
const pricingRadio = document.querySelectorAll("input[name='pricing']");

// Currently Active Product List and Pricing Filter
let currentProducts = allProducts;
let currentPricing = "ascending";

// Logic to Filter Out Category
categoryRadio.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const selectedCategory = e.target.value;
    switch (selectedCategory) {
      case "Men's":
        currentProducts = mens;
        break;
      case "Women's":
        currentProducts = womens;
        break;
      case "Unisex":
        currentProducts = unisex;
        break;
      case "All":
        currentProducts = allProducts;
        break;
    }
    changeTitle(selectedCategory);
    mapProducts(currentProducts, currentPricing);
  });
});

// Logic to Sort Items
pricingRadio.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const selectedPricing = e.target.value;
    currentPricing = selectedPricing;
    mapProducts(currentProducts, currentPricing);
  });
});

// Sort Products Before Mapping
function sortProducts(products, pricing) {
  // Swap if the difference is positive, ascending shifts the value to the right and vice versa
  if (pricing === "ascending") {
    return products.sort((a, b) => a.price - b.price);
  } else {
    return products.sort((a, b) => b.price - a.price);
  }
}

// Maps Products and Filters By Pricing
function mapProducts(products, pricing) {
  const itemsGrid = document.querySelector(".items-grid");
  console.log("Pricing is ", pricing);
  products = sortProducts(products, pricing);
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
}

function changeTitle(categorySelected) {
  const title = document.querySelector("#title");
  title.textContent = `${categorySelected} Apparels`;
}

// Init With All
changeTitle("All");
mapProducts(currentProducts, currentPricing);
