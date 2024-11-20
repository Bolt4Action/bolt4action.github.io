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

let invalidBoxes = {
    nameInvalidBox: document.getElementById("nameInvalidBox"),
    priceInvalidBox: document.getElementById("priceInvalidBox"),
    categoryInvalidBox: document.getElementById("categoryInvalidBox"),
    descriptionInvalidBox: document.getElementById("descriptionInvalidBox")
}


AdminInputs.name.addEventListener("input", () => {
    if (isValidName()) {
        AdminInputs.name.classList.remove("is-invalid");
        AdminInputs.name.classList.add("is-valid");
        invalidBoxes.nameInvalidBox.classList.remove("show");
    } else if (!isValidName() && AdminInputs.name.value.length > 0) {
        AdminInputs.name.classList.remove("is-valid");
        AdminInputs.name.classList.add("is-invalid");
    }
    else {
        AdminInputs.name.classList.remove("is-valid");
        AdminInputs.name.classList.remove("is-invalid");
        invalidBoxes.nameInvalidBox.classList.remove("show");
    }
})

AdminInputs.name.addEventListener("blur", () => {
    if (isValidName() || AdminInputs.name.value == "") {
        invalidBoxes.nameInvalidBox.classList.remove("show");
    } else {
        invalidBoxes.nameInvalidBox.classList.add("show");
    }
})

AdminInputs.price.addEventListener("input", () => {
    if (isValidPrice()) {
        AdminInputs.price.classList.remove("is-invalid");
        AdminInputs.price.classList.add("is-valid");
        invalidBoxes.priceInvalidBox.classList.remove("show");
    } else if (!isValidPrice() && AdminInputs.price.value.length > 0) {
        AdminInputs.price.classList.remove("is-valid");
        AdminInputs.price.classList.add("is-invalid");
    }
    else {
        AdminInputs.price.classList.remove("is-valid");
        AdminInputs.price.classList.remove("is-invalid");
        invalidBoxes.priceInvalidBox.classList.remove("show");
    }
})

AdminInputs.price.addEventListener("blur", () => {
    if (isValidPrice() || AdminInputs.price.value == "") {
        invalidBoxes.priceInvalidBox.classList.remove("show");
    } else {
        invalidBoxes.priceInvalidBox.classList.add("show");
    }
})

AdminInputs.description.addEventListener("input", () => {
    if (isValidDescription()) {
        AdminInputs.description.classList.remove("is-invalid");
        AdminInputs.description.classList.add("is-valid");
        invalidBoxes.descriptionInvalidBox.classList.remove("show");
    } else if (!isValidDescription() && AdminInputs.description.value.length > 0) {
        AdminInputs.description.classList.remove("is-valid");
        AdminInputs.description.classList.add("is-invalid");
    }
    else {
        AdminInputs.description.classList.remove("is-valid");
        AdminInputs.description.classList.remove("is-invalid");
        invalidBoxes.descriptionInvalidBox.classList.remove("show");
    }
})

AdminInputs.description.addEventListener("blur", () => {
    if (isValidDescription() || AdminInputs.description.value == "") {
        invalidBoxes.descriptionInvalidBox.classList.remove("show");
    } else {
        invalidBoxes.descriptionInvalidBox.classList.add("show");
    }
})


AdminInputs.category.addEventListener("input", () => {
    if (isValidCategory()) {
        AdminInputs.category.classList.remove("is-invalid");
        AdminInputs.category.classList.add("is-valid");
    } else if (!isValidCategory() && AdminInputs.category.value.length > 0) {
        AdminInputs.category.classList.remove("is-valid");
        AdminInputs.category.classList.add("is-invalid");
    }
    else {
        AdminInputs.category.classList.remove("is-valid");
        AdminInputs.category.classList.remove("is-invalid");
    }
})