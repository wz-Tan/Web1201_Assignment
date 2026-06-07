//initialize
const input = document.getElementById('product-input');
const list = document.getElementById('dropdown');
const productImage = document.getElementById('product-image');
const reviewForm = document.getElementById('review-form');
const reviewsList = document.getElementById('reviews-list');
const stars = document.querySelectorAll(".ratings span");

let userRatings = 0;

//dropdown menu
function dropdownlist() {
    list.innerHTML = '';
    allProducts.forEach(p =>{
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.innerText = p.name;
        item.onclick = () => {
            input.value =p.name;
            list.style.display = 'none';
            productImage.src = p.image_src;
            productImage.style.display = 'block';
        };
        list.appendChild(item);
    });
}
dropdownlist();

//search bar
input.onfocus = () => list.style.display = 'block';
input.oninput = (e) => {
    const val = e.target.value.toLowerCase();
    const items = list.querySelectorAll('.dropdown-item');
    list.style.display = 'block';
    items.forEach(item => {
    let match = item.innerText.toLowerCase().includes(val);
    item.style.display = match ? 'block' : 'none';
    });
};

document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-container')) {
        list.style.display = 'none';
    }
});

// ratings
for(let star of stars){
    star.addEventListener("click", function(){
        stars.forEach(s => s.removeAttribute("data-clicked"));
        this.setAttribute("data-clicked", "true");
        userRatings = this.dataset.rating;
        //test
        console.log(userRatings);
    });
}
// form submission
reviewForm.onsubmit = function(e){
    e.preventDefault(); //this prevent website reset DO NOT REMOVE AGAIN

    const product = document.getElementById('product-input').value;
    const username = document.getElementById('username').value;
    const rating = userRatings;
    const review = document.getElementById('review').value;
    const imgSrc = document.getElementById('product-image').src;

    const starRate = "\u2605".repeat(rating) + "\u2606".repeat(5-rating);

    const newReview = document.createElement('div');
    newReview.className = 'review-card';

    newReview.innerHTML = `
        <div class="review-card-header" style="display: flex; gap: 15px; align-items: center;">
            <img src="${imgSrc}" class="review-item-img">
            <div>
                <h3 class="text-small text-bold text-accent">${product}</h3>
                <div class="review-card-star">${starRate}</div>
            </div>
        </div>
        <span class="review-card-user text-small">Reviewed by: ${username}</span>
        <p class="review-card-text">${review}</p>`;

    reviewsList.prepend(newReview);

    //reset form
    reviewForm.reset();
    userRatings=0;
    stars.forEach(s => s.removeAttribute("data-clicked"));
    productImage.style.display = 'none';
    productImage.src ="";
};
