function obtainUserInput(message) {
    let userInput = prompt(message);
    return userInput;
}

function validateUserInput(userInput, validInput) {
    return validInput.test(userInput);
}

const calculateDiameter = (radius) => radius * 2;

const calculateArea = (radius) => radius ** 2 * Math.PI;

const calculateCircumference = (radius) => 2 * Math.PI * radius;

function obtainOperation(enterOperationMsg, validOperations) {
    let selectedOperation = obtainUserInput(enterOperationMsg);
    if (validateUserInput(selectedOperation, validOperations)) {
        return selectedOperation;
    } else {
        alert("Нет такой команды");
        return obtainOperation(enterOperationMsg, validOperations);
    }
}

const enterRadiusMsg = "Введите радиус круга:";
const enterOperationMsg = "Введите номер команды чтобы посчитать: 1 - диаметр, 2 - площадь круга, 3 - длинну окружности";
const validRadius = /^[1-9]{1}[0-9]{0,}$/;
const validOperations = /^[1-3]{1}$/;
const availableOperations = {
    1: {
        message: "Диаметр окружности с радиусом {radius} равен {result}",
        calculate: calculateDiameter,
    },
    2: {
        message: "Площадь круга с радиусом {radius} равена {result}",
        calculate: calculateArea,
    },
    3: {
        message: "Длинна окружности с радиусом {radius} равена {result}",
        calculate: calculateCircumference,
    }
};

let radius = obtainUserInput(enterRadiusMsg);
if (validateUserInput(radius, validRadius)) {
    let operation = obtainOperation(enterOperationMsg, validOperations);
    let result = availableOperations[operation].calculate(+radius);
    alert(availableOperations[operation].message.replace("{radius}", radius).replace("{result}", result));
} else {
    alert("Нужно ввести число");
}
