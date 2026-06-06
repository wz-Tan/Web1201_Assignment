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
const itemQuery = document.querySelector("#item-query");

// Currently Active Product List and Pricing Filter
let currentProducts = allProducts;
let currentCategory = "All";
let currentPricing = "ascending";
let queriedProducts = null;

// Search for An Item
itemQuery.addEventListener("input", (e) => {
  const input = e.target.value.toLowerCase();
  let filteredProducts;
  // Reset on Empty Input
  if (!input || input === undefined) {
    queriedProducts = null;
  }
  // User Input
  else {
    filteredProducts = currentProducts.filter((product) =>
      product.name.toLowerCase().includes(input),
    );

    // There Are Products
    if (filteredProducts.length > 0) {
      queriedProducts = filteredProducts;
    }

    // No Products Found (Blank Products + No Apparels Found)
    else {
      document.querySelector(".items-grid").innerHTML =
        `<h2 class="text-medium text-bold">No Products Found.</h2>`;
      return; // Early Exit
    }
  }

  applyFilters(currentCategory, currentPricing);
});

// Logic to Filter Out Category
categoryRadio.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    // Reset on Category Selection
    queriedProducts = null;
    itemQuery.value = "";

    const selectedCategory = e.target.value;
    currentCategory = selectedCategory;

    applyFilters(currentCategory, currentPricing);
  });
});

// Logic to Sort Items
pricingRadio.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const selectedPricing = e.target.value;
    currentPricing = selectedPricing;
    applyFilters(currentCategory, currentPricing);
  });
});

// Change Title of the Webpage
function changeTitle() {
  const title = document.querySelector("#title");
  const textContent = queriedProducts ? "Queried" : currentCategory;

  title.textContent = `${textContent} Apparels`;
}

// Sort Products Based on Category
function sortProductCategory(category) {
  // Reset to All Products
  if (category === "All") {
    currentProducts = allProducts;
  }
  // Filter To The Selected Category
  else {
    currentProducts = allProducts.filter((p) => p.category === category);
  }
}

// Sort Products Based on Pricing
function sortProductPricing(pricing) {
  // Display Queried Products if Present, Else Stick With Current
  const displayedProducts = queriedProducts ? queriedProducts : currentProducts;

  // Swap if the difference is positive, ascending shifts the value to the right and vice versa
  if (pricing === "ascending") {
    return displayedProducts.sort((a, b) => a.price - b.price);
  } else {
    return displayedProducts.sort((a, b) => b.price - a.price);
  }
}

// Redraws Products, Basically a setState Redraw
function redrawProducts() {
  const itemsGrid = document.querySelector(".items-grid");

  // Display Queried Products if Present, Else Stick With Current
  const displayedProducts = queriedProducts ? queriedProducts : currentProducts;

  itemsGrid.innerHTML = displayedProducts
    .map((product) => {
      return `<div class="item">
        <img src=${product.image_src} alt=${product.name}/>
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

// Core Function, Slaps Category and Pricing
function applyFilters(category, pricing) {
  sortProductCategory(category);
  sortProductPricing(pricing);
  changeTitle(category);
  redrawProducts();
}

// Init With All
changeTitle("All");
redrawProducts(currentProducts, currentPricing);
