function addProduct(event) {
    event.preventDefault();
    const productInput = document.querySelector(".product-input");
    const priceInput = document.querySelector(".price-input");
    const quantityInput = document.querySelector(".quantity-input");
    const productValue = productInput.value.trim();
    const priceValue = Number.parseFloat(priceInput.value);
    const quantityValue = Number.parseInt(quantityInput.value);
    if (!isValidInputs(productValue, priceValue, quantityValue)) {
        return;
    }
    productInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
    addNewProduct(productValue, priceValue, quantityValue);
}

function isValidInputs(productValue, priceValue, quantityValue) {
    if (productValue.length < 3) {
        showError("Wrong input for product name");
        return false;
    } else if (Object.is(priceValue, NaN) || !/^\d+(\.\d{1,2})?$/.test(priceValue)) {
        showError("Wrong input for product price");
        return false;
    } else if (Object.is(quantityValue, NaN) || quantityValue < 1) {
        showError("Wrong input for product quantity");
        return false;
    }
    return true;
}

function addNewProduct(productValue, priceValue, quantityValue) {
    const template = document.getElementById("row-template");
    template.content.querySelector('[data-title="Product"]').textContent = productValue;
    template.content.querySelector('[data-title="Quantity"]').textContent = quantityValue;
    template.content.querySelector('[data-title="Price"]').textContent = `${priceValue} $`;
    template.content.querySelector('[data-title="Sum"]').textContent = `${priceValue * quantityValue} $`;
    const clone = document.importNode(template.content, true);
    const tableBody = document.querySelector(".product-table tbody");
    tableBody.append(clone);
    updateTotal(tableBody);
}

function updateTotal(tableBody) {
    let totalPrice = 0;
    for (let row of tableBody.children) {
        for (let column of row.children) {
            if (column.dataset.title === "Sum") {
                totalPrice += Number.parseFloat(column.textContent.replace(" $", ""));
                break;
            }
        }
    }
    const table = document.querySelector(".product-table");
    if (tableBody.children.length === 0) {
        table.classList.add("hidden");
    } else if (table.classList.contains("hidden")) {
        table.classList.remove("hidden");
    }
    document.querySelector(".total-price").textContent = `Total: ${Math.round(totalPrice * 100) / 100} $`;
}

function delProduct(event) {
    if (event.target.classList.contains("del-button")) {
        event.target.parentNode.parentNode.remove();
        updateTotal(document.querySelector(".product-table tbody"));
    }
}

function showError(errorMsg) {
    const errDiv = document.querySelector(".error-msg");
    errDiv.textContent = errorMsg;
    errDiv.classList.remove("hidden");
}

function hideError() {
    document.querySelector(".error-msg").classList.add("hidden");
}
