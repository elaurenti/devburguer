const buttonNewBurguer = document.querySelector('.newBurguer');
const buttonMap = document.querySelector('.Map');
const buttonReduce = document.querySelector('.Reduce');
const buttonFilter = document.querySelector('.Filter');
let productsDisplayed = false; // Variável para controlar se os produtos foram mostrados

// Função para exibir os produtos
function showProducts(products) {
    const containerCard = document.querySelector('.container-card');
    containerCard.innerHTML = ''; // Limpa os produtos anteriores

    products.forEach(product => {
        const newCard = document.createElement('div');
        newCard.classList.add('card');

        const img = document.createElement('img');
        img.src = product.src;

        const h3 = document.createElement('h3');
        h3.textContent = product.name;

        const p = document.createElement('p');
        p.classList.add('price');
        p.textContent = `R$${product.price}`;

        const button = document.createElement('button');
        button.classList.add('button-card');
        button.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';

        newCard.appendChild(img);
        newCard.appendChild(h3);
        newCard.appendChild(p);
        newCard.appendChild(button);

        containerCard.appendChild(newCard);
    });

    // Desabilita o botão após clicar nele
    buttonNewBurguer.disabled = true;
}

// Função para exibir os produtos iniciais
function showInitialProducts() {
    // Supondo que menuOptions esteja definido em algum lugar
    showProducts(menuOptions);
}

// Event listener para o botão de "New Burger"
buttonNewBurguer.addEventListener('click', function() {
    if (productsDisplayed) {
        // Se os produtos já foram exibidos, limpa o contêiner
        const containerCard = document.querySelector('.container-card');
        containerCard.innerHTML = '';
        productsDisplayed = false;
        buttonNewBurguer.disabled = false; // Reativa o botão
    } else {
        // Se os produtos não foram exibidos, mostra-os
        showInitialProducts();
        productsDisplayed = true; // Atualiza a variável para indicar que os produtos foram exibidos
        buttonNewBurguer.disabled = true; // Desativa o botão
    }
});

// Função para aplicar um desconto de 10% nos preços dos produtos
function mapProducts(menu) {
    return menu.map(product => ({
        ...product,
        price: product.price * 0.9,
    }));
}

// Event listener para o botão "Map"
buttonMap.addEventListener('click', function() {
    const newPrice = mapProducts(menuOptions); // Aplica o desconto
    showProducts(newPrice); // Exibe os produtos com os novos preços
});

// Função para filtrar os produtos por preço
function filterProductsByPrice(products, maxPrice) {
    return products.filter(product => product.price <= maxPrice);
}

// Event listener para o botão "Filter"
buttonFilter.addEventListener('click', function() {
    const maxPrice = 30; // Defina o preço máximo desejado
    const filteredProducts = filterProductsByPrice(menuOptions, maxPrice);
    showProducts(filteredProducts); // Exibe os produtos filtrados
});

// Função para calcular o preço total dos produtos
function calculateTotalPrice(products) {
    return products.reduce((total, product) => total + product.price, 0);
}

// Event listener para o botão "Reduce"
buttonReduce.addEventListener('click', function() {
    const totalPrice = calculateTotalPrice(menuOptions);
    alert(`O preço total dos produtos é: R$${totalPrice.toFixed(2)}`);
});

function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut() {
    setTimeout(loader, 3000);
}

window.onload = fadeOut;
