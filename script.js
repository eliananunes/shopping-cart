const items = document.querySelector('.items');

async function getProductstList() {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    const request = await fetch(url);
    const computers = await request.json().then((value) => 
        value.results.forEach((computer) => {
            const productItem = createProductItem(computer);
            items.appendChild(productItem);
        }));
    return computers;
};

window.onload = () => {
    getProductstList();
};