document.addEventListener("DOMContentLoaded", () => {
    let mainComponent = document.getElementById("timedate");
    updateTime(mainComponent)();
    setInterval(updateTime(mainComponent), 1000);
});

const MONTH_ARR = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const DAY_ARR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function updateTime(mainComponent) {
    return function () {
        let currentMoment = new Date();
        const formatedDate = {
            month: MONTH_ARR[currentMoment.getMonth()],
            day: currentMoment.getDate(),
            year: currentMoment.getFullYear(),
            hour: `${currentMoment.getHours()}`.padStart(2, "0"),
            min: `${currentMoment.getMinutes()}`.padStart(2, "0"),
            sec: `${currentMoment.getSeconds()}`.padStart(2, "0"),
            weekday: DAY_ARR[currentMoment.getDay()],
        };

        updateTimeOnHtml(mainComponent, formatedDate);
    };
}

function updateTimeOnHtml(mainComponent, formatedDate) {
    for (let item of mainComponent.children) {
        if (item.nodeName.toLowerCase() === "span" && item.textContent !== formatedDate[item.id]) {
            item.textContent = formatedDate[item.id];
        }
    }
}
