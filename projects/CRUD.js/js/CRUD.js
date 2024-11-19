"use strict";
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
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productCategoryInput = document.getElementById("productCategory");
const productDescriptionInput = document.getElementById("productDescription");
const productImageInput = document.getElementById("productImage");
const addProductBtn = document.querySelector(".admin-dashboard button[type='submit']");
const submitEditBtn = document.getElementById("submitEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let productsList = [];
let displayList = [];
let deletedProductsList = [];


let updateProductsLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify(productsList));
}

addProductBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!isValidProduct()) {
        showInvalidProductInputs();
        return;
    }
    let product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
        image: productImageInput.files.length > 0 ? productImageInput.files[0].name : "default.png",
    }
    productsList.push(product);
    updateProductsLocalStorage();
    clearInputs();
    displayProducts();
})

function showInvalidProductInputs() {
    productNameInput.classList.contains("is-valid") ? null : productNameInput.classList.add("is-invalid");
    productPriceInput.classList.contains("is-valid") ? null : productPriceInput.classList.add("is-invalid");
    productDescriptionInput.classList.contains("is-valid") ? null : productDescriptionInput.classList.add("is-invalid");
    if (productCategoryInput.value === "") {
        productCategoryInput.classList.add("is-invalid");
        productCategoryInput.classList.remove("is-valid");
    } else {
        productCategoryInput.classList.add("is-valid");
        productCategoryInput.classList.remove("is-invalid");
    }
}

let editIndex;
submitEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!isValidProduct()) {
        showInvalidProductInputs();
        return;
    }
    let product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
        image: productImageInput.files.length > 0 ? productImageInput.files[0].name : "default.png",
    }
    productsList[editIndex] = product;
    clearInputs();
    updateProductsLocalStorage();
    displayProducts();
    addProductBtn.classList.remove("d-none");
    submitEditBtn.classList.add("d-none");
    cancelEditBtn.classList.add("d-none");
    productsSection.scrollIntoView();
})

cancelEditBtn.addEventListener("click", () => {
    addProductBtn.classList.remove("d-none");
    submitEditBtn.classList.add("d-none");
    cancelEditBtn.classList.add("d-none");
    productsSection.scrollIntoView();
    clearInputs();
})


let clearInputs = () => {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
    productImageInput.value = "";
    productNameInput.classList.remove("is-valid", "is-invalid");
    productPriceInput.classList.remove("is-valid", "is-invalid");
    productCategoryInput.classList.remove("is-valid", "is-invalid");
    productDescriptionInput.classList.remove("is-valid", "is-invalid");
    productImageInput.classList.remove("is-valid", "is-invalid");
}

let productsContainer = document.querySelector(".products-container");



function displayProducts(filterMethod = "") {
    productsContainer.textContent = "";
    switch (filterMethod) {
        case "searchTerm":
            filterBySearchTerm();
            break;
        case "":
            displayAllProducts();
            break;
    }
    productEmptyCheck();
    displayList = [];
}

function displayAllProducts() {
    displayList = productsList;
    for (let i = 0; i < displayList.length; i++) {
        productsContainer.appendChild(createProductCard(displayList[i], i));
    }
}

function productEmptyCheck() {
    if (displayList.length === 0) {
        let noProducts = document.createElement("p");
        noProducts.classList.add("text-center");
        noProducts.classList.add("display-5");
        noProducts.classList.add("opacity-50");
        noProducts.textContent = "No Products to display.";
        productsContainer.appendChild(noProducts);
    }
}
const adminSection = document.getElementById("admin-section");
const productsSection = document.getElementById("products-section");

function createProductCard(product, index, nameHighlight = "") {
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
    cardTitle.classList.add("card-title", "col-7", "mb-0");

    cardTitle.textContent = product.name;
    if (nameHighlight) {
        cardTitle.innerHTML = cardTitle.innerHTML.toLowerCase().replaceAll(nameHighlight, `<span class="highlight">${nameHighlight}</span>`)
        cardTitle.classList.add("text-capitalize");
    }

    let cardPrice = document.createElement("h5");
    cardPrice.classList.add("card-price", "col-5", "mb-0", "text-end", "fst-italic", "fw-normal");
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
    editButton.innerHTML = "<i class='fa fa-edit'></i> Edit";
    editButton.addEventListener("click", () => {
        pullProductData();
        adminSection.scrollIntoView();
        addProductBtn.classList.add("d-none");
        submitEditBtn.classList.remove("d-none");
        cancelEditBtn.classList.remove("d-none");
        editIndex = index;
    })

    function pullProductData() {
        productNameInput.value = product.name;
        productPriceInput.value = product.price;
        productCategoryInput.value = product.category;
        productDescriptionInput.value = product.description;
        // productImageInput.value = product.image;    //! Not Working
    }

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-outline-danger", "col-5");
    deleteButton.innerHTML = "<i class='fa fa-trash me-1'></i>Delete";
    deleteButton.addEventListener("click", () => {
        deleteProduct(index);
    })

    buttonRow.appendChild(editButton);
    buttonRow.appendChild(deleteButton);

    cardBody.appendChild(row);
    cardBody.appendChild(cardText);
    cardBody.appendChild(buttonRow);

    productCard.appendChild(cardBody);



    return productGrid;
}
const undoDeleteBtn = document.getElementById("undoDeleteBtn");
undoDeleteBtn.addEventListener("click", () => {
    undoDeleteProduct();
    undoDeleteToast.classList.remove("show");
})

const undoDeleteToast = document.getElementById('undoDeleteToast')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(undoDeleteToast);
function deleteProduct(index) {
    let deletedProduct = productsList.splice(index, 1)[0];
    toastBootstrap.show()
    updateProductsLocalStorage();
    displayProducts();
    deletedProduct.index = index;
    deletedProductsList.unshift(deletedProduct);
}

function undoDeleteProduct() {
    let deletedProduct = deletedProductsList.shift();
    productsList.splice(deletedProduct.index, 0, deletedProduct);
    updateProductsLocalStorage();
    displayProducts();
}

// Search
let searchInput = document.getElementById("product-search");
searchInput.addEventListener("input", () => {
    filterBySearchTerm();
    displayProducts("searchTerm");
})

function filterBySearchTerm() {
    displayList = [];
    for (let i = 0; i < productsList.length; i++) {
        if (productsList[i].name.toLowerCase().includes(searchInput.value.toLowerCase())) {
            displayList.push(productsList[i]);
        }
    }
    for (let i = 0; i < displayList.length; i++) {
        productsContainer.appendChild(createProductCard(displayList[i], i, searchInput.value.toLowerCase()));
    }
}


//Validation


function isValidProduct() {
    return (isValidName() && isValidPrice() && isValidCategory() && isValidDescription());
}

function isValidName() {
    return /^.{3,20}$/.test(productNameInput.value);
}
function isValidPrice() {
    return (/^\d{1,5}(\.\d{2})?$/.test(productPriceInput.value) && productPriceInput.value > 0);
}
function isValidCategory() {
    return /.+/.test(productCategoryInput.value);
}
function isValidDescription() {
    return /^.{10,300}$/.test(productDescriptionInput.value);
}


//Feedback on Inputs

productNameInput.addEventListener("input", () => {
    if (isValidName()) {
        productNameInput.classList.remove("is-invalid");
        productNameInput.classList.add("is-valid");
        nameInvalidBox.classList.remove("show");
    } else if (!isValidName() && productNameInput.value.length > 0) {
        productNameInput.classList.remove("is-valid");
        productNameInput.classList.add("is-invalid");
    }
    else {
        productNameInput.classList.remove("is-valid");
        productNameInput.classList.remove("is-invalid");
        nameInvalidBox.classList.remove("show");
    }
})

let nameInvalidBox = document.getElementById("nameInvalidBox");
productNameInput.addEventListener("blur", () => {
    if (isValidName() || productNameInput.value == "") {
        nameInvalidBox.classList.remove("show");
    } else {
        nameInvalidBox.classList.add("show");
    }
})

productPriceInput.addEventListener("input", () => {
    if (isValidPrice()) {
        productPriceInput.classList.remove("is-invalid");
        productPriceInput.classList.add("is-valid");
        priceInvalidBox.classList.remove("show");
    } else if (!isValidPrice() && productPriceInput.value.length > 0) {
        productPriceInput.classList.remove("is-valid");
        productPriceInput.classList.add("is-invalid");
    }
    else {
        productPriceInput.classList.remove("is-valid");
        productPriceInput.classList.remove("is-invalid");
        priceInvalidBox.classList.remove("show");
    }
})

let priceInvalidBox = document.getElementById("priceInvalidBox");
productPriceInput.addEventListener("blur", () => {
    if (isValidPrice() || productPriceInput.value == "") {
        priceInvalidBox.classList.remove("show");
    } else {
        priceInvalidBox.classList.add("show");
    }
})

productDescriptionInput.addEventListener("input", () => {
    if (isValidDescription()) {
        productDescriptionInput.classList.remove("is-invalid");
        productDescriptionInput.classList.add("is-valid");
        descriptionInvalidBox.classList.remove("show");
    } else if (!isValidDescription() && productDescriptionInput.value.length > 0) {
        productDescriptionInput.classList.remove("is-valid");
        productDescriptionInput.classList.add("is-invalid");
    }
    else {
        productDescriptionInput.classList.remove("is-valid");
        productDescriptionInput.classList.remove("is-invalid");
        descriptionInvalidBox.classList.remove("show");
    }
})

let descriptionInvalidBox = document.getElementById("DescriptionInvalidBox");
productDescriptionInput.addEventListener("blur", () => {
    if (isValidDescription() || productDescriptionInput.value == "") {
        descriptionInvalidBox.classList.remove("show");
    } else {
        descriptionInvalidBox.classList.add("show");
    }
})


productCategoryInput.addEventListener("input", () => {
    if (isValidCategory()) {
        productCategoryInput.classList.remove("is-invalid");
        productCategoryInput.classList.add("is-valid");
        categoryInvalidBox.classList.remove("show");
    } else if (!isValidCategory() && productCategoryInput.value.length > 0) {
        productCategoryInput.classList.remove("is-valid");
        productCategoryInput.classList.add("is-invalid");
    }
    else {
        productCategoryInput.classList.remove("is-valid");
        productCategoryInput.classList.remove("is-invalid");
    }
})

let categoryInvalidBox = document.getElementById("categoryInvalidBox");
productCategoryInput.addEventListener("blur", () => {
    if (isValidCategory() || productCategoryInput.value == "") {
        categoryInvalidBox.classList.remove("show");
    } else {
        categoryInvalidBox.classList.add("show");
    }
})



localStorage.getItem("products") ? productsList = JSON.parse(localStorage.getItem("products")) : productsList = [];
displayProducts();