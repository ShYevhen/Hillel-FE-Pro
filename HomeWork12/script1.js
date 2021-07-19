document.addEventListener("DOMContentLoaded", () => {
    const titleNode = document.getElementById("title");
    titleNode.style.fontSize = "24px";
});

document.addEventListener("click", (event) => {
    console.log('bubble', event.target);
});
document.addEventListener("click", (event) => {
    console.log('pogr', event.target);
}, true);

window.onload = () => {
    document.getElementById("removeAttrBtn").addEventListener("click", removeMyAttribute, { once: true });
    document.getElementById("setGreenBtn").addEventListener("click", addGreenBackground, true);
    document.getElementById("addRowBtn").addEventListener("click", addNewRow);
    document.getElementById("removeSecondRowBtn").addEventListener("click", removeSecondRow);

    sumTotal();
};

function updateRevenueYear() {
    const inputText = obtainInputValue();
    if (!isValidYear(inputText)) {
        console.warn("Wrong input for year");
        return;
    }
    const spanWithYear = document.querySelector("#title span");
    spanWithYear.textContent = inputText;
}

function obtainInputValue() {
    const inputElem = document.querySelector(".form-control");
    const inputText = inputElem.value;
    inputElem.value = "";
    return inputText;
}

function isValidYear(year) {
    return /^[1-9]{1}\d*$/.test(year);
}

function removeMyAttribute() {
    document.querySelector("[my-attribute]").removeAttribute("my-attribute");
}

function addGreenBackground(event) {
    event.stopPropagation();
    const nodesForUpdate = document.querySelectorAll("[data-id]");
    for (let i = 0; i < nodesForUpdate.length; i++) {
        nodesForUpdate[i].style.backgroundColor = "green";
    }
}

function addNewRow() {
    const tbodyNode = document.querySelector("table tbody");
    addRowToTable(tbodyNode);
}

function addRowToTable(tableBody) {
    const tr = document.createElement("tr");
    addTdNode(tr, "My Company");
    addTdNode(tr, "Kung Lao");
    const tdNode = addTdNode(tr, "15B");
    tdNode.setAttribute("data-id", "added");
    tableBody.lastElementChild.before(tr);
    sumTotal();
}

function addTdNode(parent, text) {
    const element = document.createElement("td");
    element.textContent = text;
    parent.append(element);
    return element;
}

function removeSecondRow() {
    const tbodyNode = document.querySelector("table tbody");
    if (tbodyNode.children.length > 2) {
        tbodyNode.children[1].remove();
    }
    sumTotal();
}

function sumTotal() {
    const nodesList = document.querySelectorAll("[data-id]");
    const sumRevenue = sumNumbersFromNodes(Array.from(nodesList));
    document.getElementById("summ").textContent = convertToMillion(sumRevenue);
}

function convertToNumber(textNumber) {
    return Number(textNumber.replace("B", "e9").replace("M", "e6"));
}

function sumNumbersFromNodes(nodesArr) {
    return nodesArr.reduce((sum, nodeItem) => sum + convertToNumber(nodeItem.textContent), 0);
}

function convertToMillion(number) {
    return `${number / Number("1e6")}M`;
}
