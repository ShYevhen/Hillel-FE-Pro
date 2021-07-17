function addTaskHandler(event) {
    event.preventDefault();
    const newTask = obtainInputValue();
    if (!isValidTask(newTask)) {
        console.warn("Wrong input for task");
        return;
    }

    addTaskNodes(newTask);
}

function clickOnTaskHandler(event) {
    event.currentTarget.classList.toggle("done");
}

function removeTaskHandler(event) {
    event.stopPropagation();
    event.currentTarget.parentNode.remove();
}

function obtainInputValue() {
    const inputElem = document.querySelector(".task-input");
    let inputValue = "";
    if (inputElem) {
        inputValue = inputElem.value;
        inputElem.value = null;
    }
    return inputValue.trim();
}

function isValidTask(task) {
    return /[\wа-яА-я]+/.test(task);
}

function addTaskNodes(task) {
    const ulElem = document.querySelector(".task-list");
    const liElem = createTaskElement();
    const spanElem = document.createElement("span");
    spanElem.textContent = task;
    spanElem.title = task;
    liElem.append(spanElem);
    createRemoveBtn(liElem);
    ulElem.append(liElem);
}

function createTaskElement() {
    const liElem = document.createElement("li");
    liElem.classList.add("task");
    liElem.addEventListener("click", clickOnTaskHandler);
    return liElem;
}

function createRemoveBtn(parentNode) {
    const btnElem = document.createElement("button");
    btnElem.classList.add("btn");
    btnElem.classList.add("remove");
    btnElem.title = "Delete";
    btnElem.addEventListener("click", removeTaskHandler);
    parentNode.append(btnElem);
}
