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