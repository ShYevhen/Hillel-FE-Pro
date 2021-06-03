let userName;
do {
    userName = prompt("Enter your name");
    if (userName) {
        userName = userName.trim();
        userName = userName.replace(/\s{2,}/, " ");
    }
} while (!userName || !/^[a-zA-Z]{2,}(\s[a-zA-Z]{2,}){0,2}$/.test(userName));
let outputMsg = `Hi, ${userName}. JS rules!!!`;
alert(outputMsg);

let resultDiv = document.querySelector('.result');
if (resultDiv) {
    resultDiv.innerHTML = outputMsg;
}