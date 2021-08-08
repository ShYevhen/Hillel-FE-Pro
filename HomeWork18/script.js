window.onload = initPageConfig;

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
    return localStorage.getItem("userName");
}

function obtainUserNameFromCookie() {
    if (document.cookie.includes(encodeURIComponent("userName"))) {
        const startIndex = document.cookie.indexOf(encodeURIComponent("userName")) + encodeURIComponent("userName").length + 1;
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
        document.cookie = `${encodeURIComponent("userName")}=${encodeURIComponent(userName)}`;
    } else {
        localStorage.setItem("userName", userName);
    }
}
