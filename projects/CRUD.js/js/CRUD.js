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
let AdminInputs = {
    name: document.getElementById("productName"),
    price: document.getElementById("productPrice"),
    category: document.getElementById("productCategory"),
    description: document.getElementById("productDescription"),
    image: document.getElementById("productImage")
};

let AdminButtons = {
    addProductBtn: document.getElementById("addProductBtn"),
    submitEditBtn: document.getElementById("submitEditBtn"),
    cancelEditBtn: document.getElementById("cancelEditBtn")
}


const ProductToasts = {
    addToast : document.getElementById('productAddedToast'),
    editToast : document.getElementById('productEditedToast'),
    deleteToast : document.getElementById('productDeletedToast'),
    undoAddBtn : document.getElementById("undoAddBtn"),
    undoEditBtn : document.getElementById("undoEditBtn"),
    undoDeleteBtn : document.getElementById("undoDeleteBtn"),
}

const createdToasts = {
    createdAddToast : bootstrap.Toast.getOrCreateInstance(ProductToasts.addToast),
    createdEditToast : bootstrap.Toast.getOrCreateInstance(ProductToasts.editToast),
    createdDeleteToast : bootstrap.Toast.getOrCreateInstance(ProductToasts.deleteToast)
}

let productsList = [];
let displayList = [];
let productsContainer = document.querySelector(".products-container");
let editIndex;
let tempProduct = 
{
    name: "",
    price: "",
    category: "",
    description: "",
    index: -1
}

let updateProductsLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify(productsList));
}

undoAddBtn.addEventListener("click", () => {
    productsList.pop();
    ProductToasts.addToast.classList.remove("show");
    undoClearInputs();
    displayProducts();
    adminSection.scrollIntoView();
})

undoEditBtn.addEventListener("click", () => {
    productsList[editIndex] = tempProduct;
    ProductToasts.editToast.classList.remove("show");
    undoClearInputs();
    displayProducts();
})

addProductBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!isValidProduct()) {
        showInvalidProductInputs();
        return;
    }
    let product = {
        name: AdminInputs.name.value,
        price: AdminInputs.price.value,
        category: AdminInputs.category.value,
        description: AdminInputs.description.value,
        image: AdminInputs.image.files.length > 0 ? AdminInputs.image.files[0].name : "default.png",
    }
    productsList.push(product);
    createdToasts.createdAddToast.show();
    updateProductsLocalStorage();
    clearInputs();
    displayProducts();
})

function showInvalidProductInputs() {
    AdminInputs.name.classList.contains("is-valid") ? null : AdminInputs.name.classList.add("is-invalid");
    AdminInputs.price.classList.contains("is-valid") ? null : AdminInputs.price.classList.add("is-invalid");
    AdminInputs.description.classList.contains("is-valid") ? null : AdminInputs.description.classList.add("is-invalid");
    if (AdminInputs.category.value === "") {
        AdminInputs.category.classList.add("is-invalid");
        AdminInputs.category.classList.remove("is-valid");
    } else {
        AdminInputs.category.classList.add("is-valid");
        AdminInputs.category.classList.remove("is-invalid");
    }
}

submitEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!isValidProduct()) {
        showInvalidProductInputs();
        return;
    }
    let product = {
        name: AdminInputs.name.value,
        price: AdminInputs.price.value,
        category: AdminInputs.category.value,
        description: AdminInputs.description.value,
        image: AdminInputs.image.files.length > 0 ? AdminInputs.image.files[0].name : "default.png",
    }
    tempProduct = productsList[editIndex];
    productsList[editIndex] = product;
    clearInputs();
    createdToasts.createdEditToast.show();
    updateProductsLocalStorage();
    displayProducts();
    AdminButtons.addProductBtn.classList.remove("d-none");
    AdminButtons.submitEditBtn.classList.add("d-none");
    AdminButtons.cancelEditBtn.classList.add("d-none");
    productsSection.scrollIntoView();
})

cancelEditBtn.addEventListener("click", () => {
    AdminButtons.addProductBtn.classList.remove("d-none");
    AdminButtons.submitEditBtn.classList.add("d-none");
    AdminButtons.cancelEditBtn.classList.add("d-none");
    productsSection.scrollIntoView();
    clearInputs();
})



let clearInputs = () => {
    tempProduct.name = AdminInputs.name.value;
    tempProduct.price = AdminInputs.price.value;
    tempProduct.category = AdminInputs.category.value;
    tempProduct.description = AdminInputs.description.value;
    AdminInputs.name.value = "";
    AdminInputs.price.value = "";
    AdminInputs.category.value = "";
    AdminInputs.description.value = "";
    AdminInputs.image.value = "";
    AdminInputs.name.classList.remove("is-valid", "is-invalid");
    AdminInputs.price.classList.remove("is-valid", "is-invalid");
    AdminInputs.category.classList.remove("is-valid", "is-invalid");
    AdminInputs.description.classList.remove("is-valid", "is-invalid");
    AdminInputs.image.classList.remove("is-valid", "is-invalid");
}

function undoClearInputs() {
    AdminInputs.name.value = tempProduct.name;
    AdminInputs.price.value = tempProduct.price;
    AdminInputs.category.value = tempProduct.category;
    AdminInputs.description.value = tempProduct.description;
}




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
    productGrid.classList.add("col-lg-3", "col-sm-6", "d-flex");
    let productCard = document.createElement("div");
    productCard.classList.add("card", "product-card");

    productGrid.appendChild(productCard);

    let img = document.createElement("img");
    img.src = "imgs/" + (product.image);
    img.classList.add("card-img-top", "img-fixed-height");
    img.alt = "...";
    productCard.appendChild(img);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "d-flex", "flex-column", "justify-content-between");
    productCard.appendChild(cardBody);

    let contentRow = document.createElement("div");
    contentRow.classList.add("row", "pb-4");

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

    let cardText = document.createElement("p");
    cardText.classList.add("card-text", "col-12");
    cardText.textContent = product.description;

    contentRow.appendChild(cardTitle);
    contentRow.appendChild(cardPrice);
    contentRow.appendChild(cardCategory);
    contentRow.appendChild(cardText); 

    let buttonRow = document.createElement("div");
    buttonRow.classList.add("row", "justify-content-evenly");

    let editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-outline-warning", "col-5");
    editButton.innerHTML = "<i class='fa fa-edit'></i> Edit";
    editButton.addEventListener("click", () => {
        pullProductData(product);
        adminSection.scrollIntoView();
        addProductBtn.classList.add("d-none");
        submitEditBtn.classList.remove("d-none");
        cancelEditBtn.classList.remove("d-none");
        editIndex = index;
    })
    
    
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-outline-danger", "col-5");
    deleteButton.innerHTML = "<i class='fa fa-trash me-1'></i>Delete";
    deleteButton.addEventListener("click", () => {
        deleteProduct(index);
    })
    
    buttonRow.appendChild(editButton);
    buttonRow.appendChild(deleteButton);
    
    cardBody.appendChild(contentRow);
    cardBody.appendChild(buttonRow);
    
    productCard.appendChild(cardBody);
    
    
    
    return productGrid;
}

function pullProductData(product) {
    AdminInputs.name.value = product.name;
    AdminInputs.price.value = product.price;
    AdminInputs.category.value = product.category;
    AdminInputs.description.value = product.description;
    // AdminInputs.image.value = product.image;    //! Not Working
}

undoDeleteBtn.addEventListener("click", () => {
    undoDeleteProduct();
    productDeletedToast.classList.remove("show");
})

function deleteProduct(index) {
    tempProduct = productsList.splice(index, 1)[0];
    createdToasts.createdDeleteToast.show()
    updateProductsLocalStorage();
    displayProducts();
    tempProduct.index = index;
}

function undoDeleteProduct() {
    productsList.splice(tempProduct.index, 0, tempProduct);
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
    return /^.{3,20}$/.test(AdminInputs.name.value);
}
function isValidPrice() {
    return (/^\d{1,5}(\.\d{2})?$/.test(AdminInputs.price.value) && AdminInputs.price.value > 0);
}
function isValidCategory() {
    return /.+/.test(AdminInputs.category.value);
}
function isValidDescription() {
    return /^.{10,300}$/.test(AdminInputs.description.value);
}


//Feedback on Inputs

AdminInputs.name.addEventListener("input", () => {
    if (isValidName()) {
        AdminInputs.name.classList.remove("is-invalid");
        AdminInputs.name.classList.add("is-valid");
        nameInvalidBox.classList.remove("show");
    } else if (!isValidName() && AdminInputs.name.value.length > 0) {
        AdminInputs.name.classList.remove("is-valid");
        AdminInputs.name.classList.add("is-invalid");
    }
    else {
        AdminInputs.name.classList.remove("is-valid");
        AdminInputs.name.classList.remove("is-invalid");
        nameInvalidBox.classList.remove("show");
    }
})

let nameInvalidBox = document.getElementById("nameInvalidBox");
AdminInputs.name.addEventListener("blur", () => {
    if (isValidName() || AdminInputs.name.value == "") {
        nameInvalidBox.classList.remove("show");
    } else {
        nameInvalidBox.classList.add("show");
    }
})

AdminInputs.price.addEventListener("input", () => {
    if (isValidPrice()) {
        AdminInputs.price.classList.remove("is-invalid");
        AdminInputs.price.classList.add("is-valid");
        priceInvalidBox.classList.remove("show");
    } else if (!isValidPrice() && AdminInputs.price.value.length > 0) {
        AdminInputs.price.classList.remove("is-valid");
        AdminInputs.price.classList.add("is-invalid");
    }
    else {
        AdminInputs.price.classList.remove("is-valid");
        AdminInputs.price.classList.remove("is-invalid");
        priceInvalidBox.classList.remove("show");
    }
})

let priceInvalidBox = document.getElementById("priceInvalidBox");
AdminInputs.price.addEventListener("blur", () => {
    if (isValidPrice() || AdminInputs.price.value == "") {
        priceInvalidBox.classList.remove("show");
    } else {
        priceInvalidBox.classList.add("show");
    }
})

AdminInputs.description.addEventListener("input", () => {
    if (isValidDescription()) {
        AdminInputs.description.classList.remove("is-invalid");
        AdminInputs.description.classList.add("is-valid");
        descriptionInvalidBox.classList.remove("show");
    } else if (!isValidDescription() && AdminInputs.description.value.length > 0) {
        AdminInputs.description.classList.remove("is-valid");
        AdminInputs.description.classList.add("is-invalid");
    }
    else {
        AdminInputs.description.classList.remove("is-valid");
        AdminInputs.description.classList.remove("is-invalid");
        descriptionInvalidBox.classList.remove("show");
    }
})

let descriptionInvalidBox = document.getElementById("DescriptionInvalidBox");
AdminInputs.description.addEventListener("blur", () => {
    if (isValidDescription() || AdminInputs.description.value == "") {
        descriptionInvalidBox.classList.remove("show");
    } else {
        descriptionInvalidBox.classList.add("show");
    }
})


AdminInputs.category.addEventListener("input", () => {
    if (isValidCategory()) {
        AdminInputs.category.classList.remove("is-invalid");
        AdminInputs.category.classList.add("is-valid");
        // categoryInvalidBox.classList.remove("show");
    } else if (!isValidCategory() && AdminInputs.category.value.length > 0) {
        AdminInputs.category.classList.remove("is-valid");
        AdminInputs.category.classList.add("is-invalid");
    }
    else {
        AdminInputs.category.classList.remove("is-valid");
        AdminInputs.category.classList.remove("is-invalid");
    }
})

// let categoryInvalidBox = document.getElementById("categoryInvalidBox");
// AdminInputs.category.addEventListener("blur", () => {
//     if (isValidCategory()) {
//         categoryInvalidBox.classList.remove("show");
//     } else {
//         categoryInvalidBox.classList.add("show");
//     }
// })



localStorage.getItem("products") ? productsList = JSON.parse(localStorage.getItem("products")) : productsList = [];
displayProducts();