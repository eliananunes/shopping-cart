const items = document.querySelector('.items');

function createProductImageElement(imgSource) {
    const img = document.createElement('img');
    img.className = 'item-image';
    img.src = imgSource;
    return img;
}

function createCustomElement(element, className, innerText) {
    const e = document.createElement(element);
    e.className = className;
    e.innerText = innerText;
    return e;
}
  
function createProductItem({ id, title, thumbnail }) {
    const section = document.createElement('section');
    section.className = 'item';
  
    section.appendChild(createCustomElement('span', 'item-sku', id));
    section.appendChild(createCustomElement('span', 'item-title', title));
    section.appendChild(createProductImageElement(thumbnail));
    section.appendChild(
      createCustomElement('button', 'item-add', 'Adicionar ao carrinho!'),
    );
    return section;
}

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