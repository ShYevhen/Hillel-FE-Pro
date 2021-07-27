document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".btn-counter.create");
    btn.addEventListener('click', createCounterHandler);
});

function createCounterHandler(event) {
    event.preventDefault();
    const input = document.querySelector(".counter-input");
    const inputValue = Number.parseInt(input.value);
    input.value = 0;
    if (Object.is(inputValue, NaN)) {
        console.warn("Wrong input for init counter value");
        return;
    }
    addNewCounter(inputValue);
}

function addNewCounter(initValue) {
    const template = document.getElementById('li-template');
    template.content.querySelector('.counter-value').textContent = initValue;
    const clone = document.importNode(template.content, true);
    clone.querySelector('.btn-counter.count').addEventListener('click', counterGenerator(initValue));
    document.querySelector(".counter-list").append(clone);
}

function counterGenerator(counterValue = 0) {
    return (event) => {
        event.currentTarget.parentNode.firstElementChild.textContent = ++counterValue;
    }
}