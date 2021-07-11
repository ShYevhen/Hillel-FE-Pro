function changeTheYear() {
    const element = document.querySelector('.main-title span');
    element.textContent = 2020;
}

function removeWrongAttribute() {
    const elements = document.querySelectorAll('[my-attribute]');
    for (let i = 0; i < elements.length; i++) {
        elements[i].removeAttribute('my-attribute');
    }
}

function changeBackgound() {
    const elements = document.querySelectorAll('[data-id]');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = 'green';
    }
}

function setElemTextAndAddToParent(parent, element, text) {
    element.textContent = text;
    parent.appendChild(element);
    return element;
}

function addTheRow(tableBody) {
    const tr = document.createElement('tr');
    const companyTd = setElemTextAndAddToParent(tr, document.createElement('td'), 'My Company');
    const contactTd = setElemTextAndAddToParent(tr, companyTd.cloneNode(true), 'Kung Lao');
    const revenueTd = setElemTextAndAddToParent(tr, contactTd.cloneNode(true), '15B');
    revenueTd.style.backgroundColor = 'green';
    tableBody.lastElementChild.before(tr);
}

function removeFirstRow(tableBody) {
    tableBody.children[1].remove();
}

changeTheYear();
removeWrongAttribute();
changeBackgound();
const tableBody = document.querySelector('table tbody');
addTheRow(tableBody);
removeFirstRow(tableBody);