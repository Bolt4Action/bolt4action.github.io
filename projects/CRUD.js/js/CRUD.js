//Landing Section
let landingButton = document.querySelector(".landing-button");
let landingButtonText = document.querySelector(".landing-button span");

landingButton.addEventListener("click", () => {
    landingButtonText.classList.add("hidden");

})

landingButtonText.addEventListener("transitionend", () => {
    landingButtonText.classList.remove("hidden");
    landingButtonText.innerHTML = "Loading...";
})


// CRUD Operations
let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let productDescriptionInput = document.getElementById("productDescription");
let productImageInput = document.getElementById("productImage");
let addProductBtn = document.querySelector(".admin-dashboard button[type='submit']");
let editProductBtn = document.querySelector(".admin-dashboard button[type='button']");
let productsList = [];


addProductBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
        image: productImageInput.files.length > 0 ? productImageInput.files[0].name : "default.png",
    }
    productsList.push(product);
    resetForms();    
    displayProducts();
})

let editIndex;
editProductBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
        image: productImageInput.files.length > 0 ? productImageInput.files[0].name : "default.png",
    }
    productsList[editIndex] = product;
    resetForms();
    displayProducts();
    addProductBtn.classList.remove("d-none");
    editProductBtn.classList.add("d-none");
     
})


let resetForms = () => {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
    productImageInput.value = "";
}

let productsContainer = document.querySelector(".products-container");

function displayProducts() {
    productsContainer.textContent = "";
    for (let i = 0; i < productsList.length; i++) {
        productsContainer.appendChild(createProductCard(productsList[i], i));
    }
    if (productsList.length === 0) {
        let noProducts = document.createElement("p");
        noProducts.classList.add("text-center");
        noProducts.classList.add("display-5");
        noProducts.textContent = "No Products to show.";
        productsContainer.appendChild(noProducts);
    }
}

function createProductCard(product, index) {
    let productGrid = document.createElement("div");
    productGrid.classList.add("col-lg-3", "col-sm-6");
    let productCard = document.createElement("div");
    productCard.classList.add("card", "product-card");

    productGrid.appendChild(productCard);

    let img = document.createElement("img");
    img.src = "imgs/" + (product.image);
    img.classList.add("card-img-top", "img-fixed-height");
    img.alt = "...";
    productCard.appendChild(img);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let row = document.createElement("div");
    row.classList.add("row");

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title", "col-6", "mb-0");
    cardTitle.textContent = product.name;

    let cardPrice = document.createElement("h5");
    cardPrice.classList.add("card-price", "col-6", "mb-0", "text-end", "fst-italic", "fw-normal");
    cardPrice.textContent = `$${product.price}`;

    let cardCategory = document.createElement("h5");
    cardCategory.classList.add("card-category", "fw-lighter", "col-12", "h6", "text-end");
    cardCategory.textContent = product.category;

    row.appendChild(cardTitle);
    row.appendChild(cardPrice);
    row.appendChild(cardCategory);

    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = product.description;

    let buttonRow = document.createElement("div");
    buttonRow.classList.add("row", "justify-content-evenly");

    let editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-outline-warning", "col-5");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
        productNameInput.value = product.name;
        productPriceInput.value = product.price;
        productCategoryInput.value = product.category;
        productDescriptionInput.value = product.description;
        // productImageInput.value = product.image;
        addProductBtn.classList.add("d-none");
        editProductBtn.classList.remove("d-none");
        editIndex = index;
    })

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-outline-danger", "col-5");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        productsList.splice(index, 1);
        displayProducts();
    })

    buttonRow.appendChild(editButton);
    buttonRow.appendChild(deleteButton);

    cardBody.appendChild(row);
    cardBody.appendChild(cardText);
    cardBody.appendChild(buttonRow);

    productCard.appendChild(cardBody);

    return productGrid;
}


// Search
// searchInput = document.getElementById("product-search");
// searchInput.addEventListener("input", () => {
    
