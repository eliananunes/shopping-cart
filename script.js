const items = document.querySelector('.items');
const cartItemsList = document.querySelector('.cart-items');

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
  
function createProductSection({ id, title, thumbnail }) {
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
            const productItem = createProductSection(computer);
            items.appendChild(productItem);
        }));
    return computers;
};

function getProductId(item) {
    return item.querySelector('span.item-sku').innerText;
}

function createCartItemElement({ title, price }) {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerText = `${title} | Preço: $${price}`;
    li.addEventListener('click', removeCartItem);
    return li;
}

function removeCartItem({ target }) {
    target.remove();
  }

async function addProductToCart(id) {
    const url = `https://api.mercadolibre.com/items/${id}`;
    const request = await fetch(url);
    const response = await request.json().then((item) => {
        const cartItem = createCartItemElement(item);
        cartItemsList.appendChild(cartItem);
    });
    return response;
}
  
document.addEventListener('click', ({ target }) => {
    if (target.className === 'item-add') {
      return addProductToCart(getProductId(target.parentElement));
    }
});

window.onload = () => {
    getProductstList();
};