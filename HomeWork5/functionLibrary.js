function validateRadius(userInput, errorMsg) {
    if (userInput && +userInput > 0) {
        return true;
    }
    alert(errorMsg);
    return false;
}

function validateOperation(userInput, errorMsg) {
    switch (userInput) {
        case "1":
        case "2":
        case "3": {
            return true;
        }
        default: {
            alert(errorMsg);
            return false;
        }
    }
}

function obtainRadius() {
    const message = "Введите радиус круга:";
    const errorMsg = "Нужно ввести число больше 0";
    let radius;
    do {
        radius = prompt(message);
    } while (!validateRadius(radius, errorMsg));
    return +radius;
}

function obtainOperation() {
    const message = "Введите номер команды чтобы посчитать: 1 - диаметр, 2 - площадь круга, 3 - длинну окружности";
    const errorMsg = "Нет такой команды";
    let operation;
    while (operation === undefined || !validateOperation(operation, errorMsg)) {
        operation = prompt(message);
    }
    return operation;
}

function calculateDiameter(radius) {
    return radius * 2;
}

function calculateArea(radius) {
    return Math.PI * radius ** 2;
}

function calculateCircumference(radius) {
    return 2 * Math.PI * radius;
}

function obtainResult(operation, radius) {
    switch (operation) {
        case "1": {
            alert(`Диаметр окружности с радиусом ${radius} равен ${calculateDiameter(radius)}`);
            break;
        }
        case "2": {
            alert(`Площадь круга с радиусом ${radius} равена ${calculateArea(radius)}`);
            break;
        }
        case "3": {
            alert(`Длинна окружности с радиусом ${radius} равена ${calculateCircumference(radius)}`);
            break;
        }
    }
}

function runRadiusProgram() {
    const radius = obtainRadius();
    const operation = obtainOperation();
    obtainResult(operation, radius);
}

// ------------ Addition functions ----------
function displayOddOrEven(minNumber, maxNumber, isOdd) {
    for (let i = minNumber; i <= maxNumber; i++) {
        let mod = i % 2;
        if ((mod === 1 && isOdd) || (mod === 0 && !isOdd)) {
            console.log(i);
        }
    }
}
