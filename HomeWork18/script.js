window.onload = initPageConfig;
const LOGIN_KEY = "userName"

function initPageConfig() {
    const useCookie = confirm("Enable cookie?");
    const userName = obtainUserName(useCookie);
    if (userName) {
        showWelcome(userName);
    } else {
        document.querySelector(".form-login").classList.remove("hide");
        const btn = document.querySelector(".btn-login");
        btn.addEventListener("click", loginToThePage(useCookie));
    }
}

function obtainUserName(useCookie) {
    if (useCookie) {
        return obtainUserNameFromCookie();
    }
    return localStorage.getItem(LOGIN_KEY);
}

function obtainUserNameFromCookie() {
    if (document.cookie.includes(encodeURIComponent(LOGIN_KEY))) {
        const startIndex = document.cookie.indexOf(encodeURIComponent(LOGIN_KEY)) + encodeURIComponent(LOGIN_KEY).length + 1;
        const lastIndex = document.cookie.indexOf("; ", startIndex);
        return decodeURIComponent(document.cookie.substring(startIndex, lastIndex !== -1 ? lastIndex : document.cookie.length));
    }
}

function loginToThePage(useCookie) {
    return function (event) {
        event.preventDefault();
        const errDiv = document.querySelector(".err-msg");
        const userName = event.currentTarget.parentNode.firstElementChild.value;
        if (!userName) {
            errDiv.classList.remove("hide");
            return;
        }
        saveUserName(userName, useCookie);
        document.querySelector(".form-login").classList.add("hide");
        showWelcome(userName);
    };
}

function showWelcome(userName) {
    const spanForName = document.querySelector(".user-name");
    spanForName.textContent = userName;
    spanForName.parentNode.classList.remove("hide");
}

function saveUserName(userName, useCookie) {
    if (useCookie) {
        document.cookie = `${encodeURIComponent(LOGIN_KEY)}=${encodeURIComponent(userName)}`;
    } else {
        localStorage.setItem(LOGIN_KEY, userName);
    }
}
