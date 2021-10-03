export function getUser() {
    return localStorage.getItem("username");
}

export function setUser(username) {
    localStorage.setItem("username", username);
}

export function clearUser() {
    localStorage.removeItem("username");
}

export function getUserHistory(username) {
    return JSON.parse(localStorage.getItem(username));
}

export function setUserHistory(username, msgHistory) {
    localStorage.setItem(username, JSON.stringify(msgHistory));
}

export function clearUserHistory(username) {
    localStorage.removeItem(username);
}
