import "./style.css";
import "./styles/login.css";
import "./styles/chat.css";

import * as storage from "./modules/localStorage.js";
import * as dom from "./modules/domWorker.js";
import { Message } from "./modules/message.js";
import moment from "moment";
import { ChatSocket } from "./modules/socket";

function importAll(r) {
    let images = {};
    r.keys().map((item) => {
        images[item.replace("./", "")] = r(item);
    });
    return images;
}

const images = importAll(require.context("./icons", false, /\.(png|jpe?g|svg)$/));

let USER_NAME;
let usersList = [];
let messagesList = [];
let chat = new ChatSocket({
    changeBtn,
    addMessageToChat,
    isReconnect: false,
});

window.onload = () => {
    initDefaultPage();
};

function initDefaultPage() {
    let username = storage.getUser();
    if (username) {
        setUsername(username);
        goToChat();
    } else {
        goToLogin();
    }
}

function setUsername(username) {
    USER_NAME = username;
    dom.setUsername(username);
    processUserHistory(storage.getUserHistory(username));
}

function goToChat() {
    dom.displayChat(handleLogout, handleReconnect);
    dom.sendMsgBtn(sendMessage);
    chat.initConnection();
}

function goToLogin() {
    dom.displayLogin();
    dom.loginHandler(handleUsername);
}

function handleUsername(username) {
    setUsername(username);
    storage.setUser(username);
    goToChat();
}

function handleReconnect(event) {
    chat.setReconnect(event.currentTarget.checked);
}

function processUserHistory(historyList) {
    if (!historyList) {
        return;
    }
    let addedUsers = [];
    historyList.forEach((item) => {
        if (!addedUsers.includes(item.username)) {
            let user = { name: item.username, icon: item.icon };
            addedUsers.push(item.username);
            usersList.push(user);
            if (user.name !== USER_NAME) {
                dom.addUserToList(user);
            }
        }
        messagesList.push(item);
        dom.addMessageToList(item, item.username === USER_NAME);
    });
    setTimeout(dom.scrollToLastMsg, 0);
}

function handleLogout() {
    if (window.confirm("Clear message history?")) {
        storage.clearUserHistory(USER_NAME);
    }
    storage.clearUser();
    location.reload();
}

function addMessageToChat(data) {
    let message = new Message(data.username, data.message);
    let user = usersList.find((item) => item.name === message.username);
    if (!user) {
        user = {
            name: message.username,
            icon: images[usersList.length < 10 ? `${usersList.length}.png` : `${usersList.length % 10}.png`],
        };
        usersList.push(user);
        if (user.name !== USER_NAME) {
            dom.addUserToList(user);
        }
    }
    message.icon = user.icon;
    message.sendtime = moment().format("MM/DD/YYYY, HH:mm:ss");
    messagesList.push(message);
    storage.setUserHistory(USER_NAME, messagesList);
    dom.addMessageToList(message, message.username === USER_NAME);
    dom.scrollToLastMsg();
}

function changeBtn(isDisabled) {
    dom.changeBtn(isDisabled);
}

function sendMessage() {
    const value = dom.getInputValue();
    if (!value) {
        return;
    }
    const msg = new Message(USER_NAME, value);
    chat.socket.send(msg.toStringForSend());
}
