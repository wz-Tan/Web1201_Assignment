//initialize
const input = document.getElementById("product-input");
const list = document.getElementById("dropdown");
const productImage = document.getElementById("product-image");
const reviewForm = document.getElementById("review-form");
const reviewsList = document.getElementById("reviews-list");
const stars = document.querySelectorAll(".ratings span");
const reviewTextarea = document.getElementById("review");
const charCountDisplay = document.getElementById("char-count");
const maxChars = 200;

let userRatings = 0;

//dummy data for review
const dummyData = [
    {
        username: "Alan_Tan",
        product: "Vintage Levi's 501 Jeans",
        rating: 5,
        text: "I like jeans its cool",
        image: "./assets/images/levi_jeans.jpg"
    },
    {
        username: "Joe",
        product: "Y2K Cargo Pants",
        rating: 4,
        text: "Cool pants with pockets",
        image: "./assets/images/cargo_pants.jpg"
    },
    {
        username: "Qi Wen",
        product: "Vintage Band Tee",
        rating: 5,
        text: "Cheap shirt",
        image: "./assets/images/vintage_band_tee.jpg"
    }
]

let storedReviews = localStorage.getItem("reviews");
if (!storedReviews){
  localStorage.setItem("reviews", JSON.stringify(dummyData));
  storedReviews = JSON.stringify(dummyData);
}

function addReview(username, product, rating, review, imgSrc){
    const starRate = "\u2605".repeat(rating) + "\u2606".repeat(5 - rating);

  const newReview = document.createElement("div");
  newReview.className = "review-card";

  newReview.innerHTML = `
        <div class="review-card-header">
            <img src="${imgSrc}" class="review-item-img">
            <div>
                <h3 class="text-semibold text-accent">${product}</h3>
                <div class="review-card-star">${starRate}</div>
            </div>
        </div>
        <span class="review-card-user text-small">Reviewed by: ${username}</span>
        <p class="review-card-text">${review}</p>`;

  reviewsList.prepend(newReview);
}

JSON.parse(storedReviews).forEach(item => {
    addReview(item.username, item.product, item.rating, item.text, item.image);
});

//dropdown menu
function dropdownlist() {
  list.innerHTML = "";
  allProducts.forEach((p) => {
    const item = document.createElement("div");
    item.className = "dropdown-item";
    item.innerText = p.name;
    item.onclick = () => {
      input.value = p.name;
      list.style.display = "none";
      productImage.src = p.image_src;
      productImage.style.display = "block";
    };
    list.appendChild(item);
  });
}
dropdownlist();

//search bar
input.onfocus = () => (list.style.display = "block");
input.oninput = (e) => {
  const val = e.target.value.toLowerCase();
  const items = list.querySelectorAll(".dropdown-item");
  list.style.display = "block";
  items.forEach((item) => {
    let match = item.innerText.toLowerCase().includes(val);
    item.style.display = match ? "block" : "none";
  });
};

document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown-container")) {
    list.style.display = "none";
  }
});

// ratings
for (let star of stars) {
  star.addEventListener("click", function () {
    stars.forEach((s) => s.removeAttribute("data-clicked"));
    this.setAttribute("data-clicked", "true");
    userRatings = this.dataset.rating;
    //test
    console.log(userRatings);
  });
}
// form submission
reviewForm.onsubmit = function (e) {
  e.preventDefault(); //this prevent website reset DO NOT REMOVE AGAIN
    if(userRatings === 0){
      alert("Please select a rating 1-5");
      return
    }
    const product = document.getElementById('product-input').value;
    const exist = allProducts.some(p => p.name === product);
        if (!exist){
            alert("please select a valid option");
            return;
        }

    const username = document.getElementById('username').value;
    const rating = userRatings;
    const review = document.getElementById('review').value;
    const imgSrc = document.getElementById('product-image').src;

    const newReviewObj = {
      username: username,
      product: product,
      rating: rating,
      text: review,
      image: imgSrc
    };

    let currentData = JSON.parse(localStorage.getItem("reviews"));
    currentData.push(newReviewObj);
    localStorage.setItem("reviews", JSON.stringify(currentData));

  addReview(username, product, rating, review, imgSrc);

  //reset form
  reviewForm.reset();
  userRatings = 0;
  stars.forEach((s) => s.removeAttribute("data-clicked"));
  productImage.style.display = "none";
  productImage.src = "";
  charCountDisplay.innerText = `0 / ${maxChars}`;
  charCountDisplay.classList.remove("limit-reached");
};

reviewTextarea.addEventListener("input", () => {
    const currentLength = reviewTextarea.value.length;
    charCountDisplay.innerText = `${currentLength} / ${maxChars}`;

    if (currentLength >= maxChars) {
        charCountDisplay.classList.add("limit-reached");
    } else {
        charCountDisplay.classList.remove("limit-reached");
    }
});