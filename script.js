import { products } from './data.js';

const sortOrderSelect = document.getElementById('sortOrder');
const productNameInput = document.getElementById('productName');
const productsContainer = document.getElementById('products');
const menuToggle = document.querySelector('.menu-toggle');
const submenu = document.querySelector('.submenu');
const menuMobile = document.querySelector('.header__nav-item-mobile');
const submenuMobile = document.querySelector('.header__nav-item__menu');
const maxRange = document.getElementById('maxRange');
const maxValue = document.getElementById('maxValue');

const createProductHTML = (product, index) => {
  const productDiv = document.createElement('div');
  productDiv.classList.add('product');
  const starCount = 5 - product.rating;
  productDiv.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.srcImg}" alt="Foto do ${product.name}" class="product__image" data-index="${index}">
    <div class="proeduct__rating">
    ${' <i class="fas fa-star product__rating-star"></i>'.repeat(product.rating)}
    ${starCount > 0 ? ' <i class="far fa-star rating-empty"></i>'.repeat(starCount) : ''}
      <span>(${product.reviews})</span>
    </div>
    <p class="product__price">R$ ${product.price.toLocaleString('pt-BR')} no ${product.paymentMethod}
      <span class="product__price-old">${product.originalPrice.toLocaleString('pt-BR')}</span>
    </p>
    <p class="product__description">${product.description}</p>
    <button class="button button-gradient">Compre agora</button>
  `;
  return productDiv;
};

const renderProducts = (itemsProducts) => {
  productsContainer.innerHTML = '';
  console.log(itemsProducts);
  
  itemsProducts.forEach((item, index) => {
    productsContainer.appendChild(createProductHTML(item, index));
  });

  if (itemsProducts.length <= 0) {
    const notFoundTemplate = document.getElementById('not-found-template');
    const notFoundClone = notFoundTemplate.content.cloneNode(true);
    productsContainer.appendChild(notFoundClone);
  }
};

const filterProducts = () => {
  let filteredProducts = [...products];
  

  const sortOrder = sortOrderSelect.value;
  if (sortOrder === 'lowToHigh') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'highToLow') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating); // Ordena pela avaliação, maior para menor
  }

  renderProducts(filteredProducts);
};

const filterProductsByMaxPrice = () => {
  const maxPrice = parseInt(maxRange.value, 10);
  maxValue.textContent = `R$ ${maxPrice.toLocaleString('pt-BR')}`;

  const filteredProducts = products.filter(product => product.price <= maxPrice);

  renderProducts(filteredProducts);
};

const imgRenderHover = () => {
  productsContainer.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('product__image')) {
      const productIndex = e.target.dataset.index;
      e.target.src = products[productIndex].backImg;
    }
  });

  productsContainer.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('product__image')) {
      const productIndex = e.target.dataset.index;
      e.target.src = products[productIndex].srcImg;
    }
  });
};

const filterProductsByName = () => {
  let filteredProducts = [...products];
  console.log('tste');
  
  const productName = productNameInput.value.toLowerCase();
  if (productName) {
    filteredProducts = filteredProducts.filter(item => item.name.toLowerCase().includes(productName));
  }
  renderProducts(filteredProducts);

}



maxRange.addEventListener('input', filterProductsByMaxPrice);


renderProducts(products);
imgRenderHover();
filterProductsByMaxPrice(); 
sortOrderSelect.addEventListener('change', filterProducts);
productNameInput.addEventListener('keyup', filterProductsByName);
menuToggle.addEventListener('click', () => submenu.classList.toggle('show'));
menuMobile.addEventListener('click', () => submenuMobile.classList.toggle('show'));




