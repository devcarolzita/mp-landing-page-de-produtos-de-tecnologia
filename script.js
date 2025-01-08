import { products } from './data.js';

const sortOrderSelect = document.getElementById('sortOrder');
const productNameInput = document.getElementById('productName');
const productsContainer = document.getElementById('products');
const menuToggle = document.querySelector('.menu-toggle');
const submenu = document.querySelector('.submenu');
const menuMobile = document.querySelector('.header__nav-item-mobile');
const submenuMobile = document.querySelector('.header__nav-item__menu');

const createProductHTML = (product, index) => {
  const productDiv = document.createElement('div');
  productDiv.classList.add('product');
  const starCount = 5 - product.rating;
  productDiv.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.srcImg}" alt="Foto do ${product.name}" class="imageProduct" data-index="${index}">
    <div class="product__rating">
      ${'<i class="fas fa-star product__rating-star"></i>'.repeat(product.rating)}
      ${starCount > 0 ? '<i class="far fa-star"></i>'.repeat(starCount) : ''}
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
  itemsProducts.forEach((item, index) => {
    productsContainer.appendChild(createProductHTML(item, index));
  });
};

const filterProducts = () => {
  let filteredProducts = [...products];
  const productName = productNameInput.value.toLowerCase();
  if (productName) {
    filteredProducts = filteredProducts.filter(item => item.name.toLowerCase().includes(productName));
  }

  const sortOrder = sortOrderSelect.value;
  if (sortOrder === 'lowToHigh') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'highToLow') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  renderProducts(filteredProducts);
};

const imgRenderHover = () => {
  productsContainer.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('imageProduct')) {
      const productIndex = e.target.dataset.index;
      e.target.src = products[productIndex].backImg;
    }
  });

  productsContainer.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('imageProduct')) {
      const productIndex = e.target.dataset.index;
      e.target.src = products[productIndex].srcImg;
    }
  });
};

sortOrderSelect.addEventListener('change', filterProducts);
productNameInput.addEventListener('keyup', filterProducts);

menuToggle.addEventListener('click', () => submenu.classList.toggle('show'));
menuMobile.addEventListener('click', () => submenuMobile.classList.toggle('show'));

window.onload = () => {
  renderProducts(products);
  imgRenderHover();
};

