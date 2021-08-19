const LI_TEMPLATE = document.getElementById("li-template");
const UL_ELEM = document.querySelector(".task-list");
const DETAIL_DIV = document.querySelector(".detail");
let TODOS_LIST = [];

function fetchTasks(event) {
    event.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then((resp) => {
            if (resp.status == 200) {
                return resp.json();
            } else {
                throw Error(`Bad response code: ${resp.status}`);
            }
        })
        .then((data) => {
            processTotos(data);
            hideButton();
        })
        .catch((error) => {
            processError(error);
        });
}

function processTotos(todosList) {
    TODOS_LIST = todosList;
    todosList.forEach((todo_i) => {
        addTodo(todo_i);
    });
}
function addTodo(todo) {
    let liHtml = LI_TEMPLATE.innerHTML
        .replaceAll("{{title}}", todo.title)
        .replace("{{todoId}}", todo.id)
        .replace("{{classes}}", todo.completed ? "task done" : "task");
    UL_ELEM.insertAdjacentHTML("beforeend", liHtml);
}
function processError(error) {
    console.error(error.message);
}
function hideButton() {
    document.querySelector(".load")?.classList.add("hidden");
}
function showButton() {
    document.querySelector(".load")?.classList.remove("hidden");
}
function handleClick(event) {
    if (event.target.classList.contains("remove")) {
        processRemoveClick(event);
    } else if (event.target.closest(".task")) {
        obtainTaskDetails(event.target.closest(".task"));
    }
}
function processRemoveClick(event) {
    event.stopPropagation();
    const liElem = event.target.parentNode;
    TODOS_LIST.splice(
        TODOS_LIST.findIndex((todo_i) => todo_i.id === +liElem.dataset.id),
        1
    );
    liElem.remove();
    if (TODOS_LIST.length === 0) {
        showButton();
    }
}
function obtainTaskDetails(elem) {
    const task = TODOS_LIST.find((todo_i) => todo_i.id === +elem.dataset.id);
    fetch(`https://jsonplaceholder.typicode.com/users/${task.userId}`)
        .then((resp) => {
            if (resp.status == 200) {
                return resp.json();
            } else {
                throw Error(`Bad response code: ${resp.status}`);
            }
        })
        .then((data) => {
            showTaskDetails(data, task);
        })
        .catch((error) => {
            processError(error);
        });
}

function showTaskDetails(userData, taskData) {
    DETAIL_DIV.querySelector(".title").textContent = taskData.title;
    DETAIL_DIV.querySelector(".username").textContent = userData.username;
    const complInput = DETAIL_DIV.querySelector(".switch input");
    complInput.checked = taskData.completed;
    complInput.onclick = updateTaskStatus(taskData);
    DETAIL_DIV.dataset.id = taskData.id;
    UL_ELEM.classList.add("hidden");
    DETAIL_DIV.classList.remove("hidden");
}

function updateTaskStatus(task) {
    return function (event) {
        task.completed = !task.completed;
        event.target.checked = task.completed;
    };
}

function handleCloseDetail() {
    UL_ELEM.classList.remove("hidden");
    DETAIL_DIV.classList.add("hidden");
    const todoElem = document.querySelector(`[data-id="${DETAIL_DIV.dataset.id}"]`);
    const task = TODOS_LIST.find((todo_i) => todo_i.id === +DETAIL_DIV.dataset.id);
    if (task.completed) {
        todoElem.classList.add("done");
    } else {
        todoElem.classList.remove("done");
    }
}
