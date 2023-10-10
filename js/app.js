// Constructor for product objects
function Product(title, price, description, image) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
}

// Function to fetch products from FakeStoreAPI
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}


// Function to render product items in cards using CSS Grid
async function renderProducts() {
    const productList = document.getElementById('product-list');
    
    const products = await fetchProducts();
    
    if (products && products.length > 0) {
        productList.innerHTML = ''; // Clear existing content

        // Create a container for the product cards using CSS Grid
        const productContainer = document.createElement('div');
        productContainer.classList.add('product-container');

        const productCards = products.map(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const productImage = document.createElement('img');
            productImage.src = product.image;

            const productTitle = document.createElement('h2');
            productTitle.textContent = product.title;

            const productPrice = document.createElement('p');
            productPrice.textContent = `Price: $${product.price}`;

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;

            productCard.appendChild(productImage);
            productCard.appendChild(productTitle);
            productCard.appendChild(productPrice);
            productCard.appendChild(productDescription);

            return productCard;
        });

        productContainer.append(...productCards);
        productList.appendChild(productContainer);
    } else {
        productList.innerHTML = '<p>No products available</p>';
    }
}

// Call the renderProducts function to display products on page load
renderProducts();
