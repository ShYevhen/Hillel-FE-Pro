const loginDiv = document.querySelector(".login");
const chatDiv = document.querySelector(".container");
const submitBtn = document.querySelector(".submit");
const userInput = document.querySelector(".un");
const errorEl = document.querySelector(".error-login");
const userDisp = document.querySelector(".un-disp span");
const logoutBtn = document.querySelector(".un-disp button");
const userTemplate = document.getElementById("user-template");
const messageTemplate = document.getElementById("message-template");
const chatUsers = document.querySelector(".chat-users > div");
const chatBody = document.querySelector(".chat-body > div");
const btn = document.querySelector(".answer-btn");
const input = document.querySelector(".msg-input");
const reconnectionInput = document.querySelector(".reconnection");

export function displayLogin() {
    loginDiv.classList.remove("hidden");
}
export function displayChat(handleLogout, handleReconnect) {
    loginDiv.classList.add("hidden");
    chatDiv.classList.remove("hidden");
    logoutHandler(handleLogout);
    reconnectionInput.onchange = handleReconnect;
}
export function loginHandler(handleUsername) {
    submitBtn.onclick = () => {
        if (isValidInput(userInput?.value)) {
            switchError(false);
            handleUsername(userInput.value);
        } else {
            switchError(true);
            userInput.value = "";
        }
    };
}

export function setUsername(username) {
    userDisp.textContent = username;
}

export function addUserToList(user) {
    if (!user.name) {
        return;
    }
    const clone = document.importNode(userTemplate.content, true);
    clone.querySelector(".avatar img").src = user.icon;
    clone.querySelector(".name").textContent = user.name;
    chatUsers.append(clone);
}

export function addMessageToList(message, isRight) {
    const clone = document.importNode(messageTemplate.content, true);
    clone.querySelector(".avatar img").src = message.icon;
    clone.querySelector(".name").textContent = message.username;
    clone.querySelector(".text").textContent = message.message;
    clone.querySelector(".time").textContent = message.sendtime;
    clone.querySelector(".answer").classList.add(isRight ? "right" : "left");
    chatBody.append(clone);
}

export function scrollToLastMsg() {
    chatBody.scrollTop = chatBody.scrollHeight;
}

export function sendMsgBtn(sendMessage) {
    btn.onclick = sendMessage;
}

export function changeBtn(isDisabled) {
    btn.disabled = isDisabled;
}

export function getInputValue() {
    const inputValue = input?.value?.trim();
    input.value = "";
    return inputValue;
}

function isValidInput(username) {
    return /[\wа-яА-я]{3,}/.test(username);
}

function logoutHandler(handleLogout) {
    logoutBtn.onclick = handleLogout;
}

function switchError(isDisplay) {
    if (isDisplay) {
        errorEl.classList.remove("hidden");
    } else {
        errorEl.classList.add("hidden");
    }
}
