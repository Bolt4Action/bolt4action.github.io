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
let editIndex;

const AdminInputs = {
    name: document.getElementById("productName"),
    price: document.getElementById("productPrice"),
    category: document.getElementById("productCategory"),
    description: document.getElementById("productDescription"),
    image: document.getElementById("productImage")
};

const AdminButtons = {
    addProductBtn: document.getElementById("addProductBtn"),
    submitEditBtn: document.getElementById("submitEditBtn"),
    cancelEditBtn: document.getElementById("cancelEditBtn"),
    undoAddBtn: document.getElementById("undoAddBtn"),
    undoEditBtn: document.getElementById("undoEditBtn"),
    undoDeleteBtn: document.getElementById("undoDeleteBtn")
}

const AdminEventListeners = {
    addProductClick: (() => {
        AdminButtons.addProductBtn.addEventListener("click", (e) => {
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
            clearInputs();
            updateProductsLocalStorage();
            displayProducts();
        });
    })(),
    undoAddClick: (() => {
        AdminButtons.undoAddBtn.addEventListener("click", () => {
            productsList.pop();
            ProductToasts.addToast.classList.remove("show");
            undoClearInputs();
            updateProductsLocalStorage();
            displayProducts();
            pageSections.adminSection.scrollIntoView();
        });
    })(),
    submitEditClick: (() => {
        AdminButtons.submitEditBtn.addEventListener("click", (e) => {
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
            AdminButtons.addProductBtn.classList.remove("d-none");
            AdminButtons.submitEditBtn.classList.add("d-none");
            AdminButtons.cancelEditBtn.classList.add("d-none");
            pageSections.productsSection.scrollIntoView();
            updateProductsLocalStorage();
            displayProducts();
        });
    })(),
    undoEditClick: (() => {
        AdminButtons.undoEditBtn.addEventListener("click", () => {
            productsList[editIndex] = tempProduct;
            ProductToasts.editToast.classList.remove("show");
            undoClearInputs();
            updateProductsLocalStorage();
            displayProducts();
        });
    })(),
    cancelEditClick: (() => {
        AdminButtons.cancelEditBtn.addEventListener("click", () => {
            AdminButtons.addProductBtn.classList.remove("d-none");
            AdminButtons.submitEditBtn.classList.add("d-none");
            AdminButtons.cancelEditBtn.classList.add("d-none");
            pageSections.productsSection.scrollIntoView();
            clearInputs();
        });
    })(),
    undoDeleteClick: (() => {
        AdminButtons.undoDeleteBtn.addEventListener("click", () => {
            productsList.splice(tempProduct.index, 0, tempProduct);
            ProductToasts.deleteToast.classList.remove("show");
            updateProductsLocalStorage();
            displayProducts();
        });
    })()
};

const ProductToasts = {
    addToast: document.getElementById('productAddedToast'),
    editToast: document.getElementById('productEditedToast'),
    deleteToast: document.getElementById('productDeletedToast')
}

const createdToasts = {
    createdAddToast: bootstrap.Toast.getOrCreateInstance(ProductToasts.addToast),
    createdEditToast: bootstrap.Toast.getOrCreateInstance(ProductToasts.editToast),
    createdDeleteToast: bootstrap.Toast.getOrCreateInstance(ProductToasts.deleteToast)
}

const pageSections = {
    adminSection: document.getElementById("admin-section"),
    productsSection: document.getElementById("products-section"),
}

let productsContainer = document.querySelector(".products-container");
let productsList = [];
let displayList = [];
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
        pageSections.adminSection.scrollIntoView();
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

function deleteProduct(index) {
    tempProduct = productsList.splice(index, 1)[0];
    createdToasts.createdDeleteToast.show()
    updateProductsLocalStorage();
    displayProducts();
    tempProduct.index = index;
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


localStorage.getItem("products") ? productsList = JSON.parse(localStorage.getItem("products")) : productsList = [];
displayProducts();