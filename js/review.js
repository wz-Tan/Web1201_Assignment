const input = document.getElementById('product-input');
const list = document.getElementById('dropdown');

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
        };
        list.appendChild(item);
    });
}
dropdownlist();

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
let stars = document.querySelectorAll(".ratings span");
let userRatings = 0;

for(let star of stars){
    star.addEventListener("click", function(){
        stars.forEach(s => s.removeAttribute("data-clicked"));
        this.setAttribute("data-clicked", "true");
        userRatings = this.dataset.rating;
        //test
        console.log(userRatings);
    });
}
// form
const reviewForm = document.getElementById('review-form');
const reviewsList = document.getElementById('reviews-list');

reviewForm.onsubmit = function(e){
    e.preventDefault(); //this prevent website reset DO NOT REMOVE AGAIN

    const product = document.getElementById('product-input').value;
    const username = document.getElementById('username').value;
    const rating = userRatings;
    const review = document.getElementById('review').value;

    const starRate = "\u2605".repeat(rating) + "\u2606".repeat(5-rating);

    const newReview = document.createElement('div');
    newReview.className = 'review-card';

    newReview.innerHTML = `
        <div class="review-card-header">
            <h3 class="text-small text-bold text-accent">${product}</h3>
            <div class="review-card-star">${starRate}</div>
        </div>
        <span class="review-card-user text-small">Reviewed by: ${username}</span>
        <p class="review-card-text">${review}</p>`;

    reviewsList.prepend(newReview);

    reviewForm.reset();
    userRatings=0;
    stars.forEach(s => s.removeAttribute("data-clicked"));

    //test
    const formTest = {
        product: document.getElementById('product-input').value,
        rating: userRatings,
        username: document.getElementById('username').value,
        review: document.getElementById('review').value
    };
    console.log(formTest);
};
