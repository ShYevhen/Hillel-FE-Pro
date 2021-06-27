function totalAmount(products) {
    alert(`Общая стоимость вашего заказа: ${countTotalAmount(products)}$`);
}

function countTotalAmount(products) {
    let amountCounter = 0;
    if (products && products.length > 0) {
        for (let i = 0; i < products.length; i++) {
            amountCounter += products[i].quantity * products[i].price;
        }
    }
    return amountCounter;
}

function avaragePriceOfOneProduct(products) {
    alert(`Средняя стоимость одного товара в заказе: ${countAvaragePrice(products)}$`);
}

function countAvaragePrice(products) {
    let averagePrice = 0;
    let amountCounter = 0;
    let quantityCounter = 0;
    if (products && products.length > 0) {
        for (let i = 0; i < products.length; i++) {
            amountCounter += products[i].quantity * products[i].price;
            quantityCounter += products[i].quantity;
        }
        averagePrice = amountCounter / quantityCounter;
    }
    return averagePrice;
}

function printSorted(products) {
    let listOfProductsInOrder = "Список товаров в заказе:";
    alert(listOfProductsInOrder + prepareItemsList(products));
}

function prepareItemsList(products) {
    let itemsList = "";
    sortTheList(products, "price", true);
    if (products && products.length > 0) {
        for (let i = 0; i < products.length; i++) {
            itemsList += `\r\n${products[i].title} Стоимость: ${products[i].price} Кол-во: ${products[i].quantity} Общая стоимость: ${
                products[i].quantity * products[i].price
            }`;
        }
    }
    itemsList += `\r\n\r\nОбщая стоимость вашего заказа: ${countTotalAmount(products)}$`;
    return itemsList;
}

function sortTheList(products, fieldName, cheapFirst) {
    if (!products || !fieldName || products.length === 0) {
        return;
    }

    for (let i = 0; i < products.length - 1; i++) {
        let wasSwap = false;
        for (let j = 0; j < products.length - i - 1; j++) {
            if (
                (products[j][fieldName] > products[j + 1][fieldName] && cheapFirst) ||
                (products[j][fieldName] < products[j + 1][fieldName] && !cheapFirst)
            ) {
                let swap = products[j];
                products[j] = products[j + 1];
                products[j + 1] = swap;
                wasSwap = true;
            }
        }
        if (!wasSwap) {
            break;
        }
    }
}

function customReverse(itemsList) {
    if (!itemsList || itemsList.length === 0) {
        return;
    }

    for (let i = 0; i < itemsList.length / 2 - (itemsList.length % 2); i++) {
        let temp = itemsList[i];
        itemsList[i] = itemsList[itemsList.length - 1 - i];
        itemsList[itemsList.length - 1 - i] = temp;
    }
    return itemsList;
}
