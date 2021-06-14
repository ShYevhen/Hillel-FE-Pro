function obtainUserInput(message, validInput) {
    let userInput = prompt(message);
    if (validateUserInput(userInput, validInput)) {
        return Number.parseFloat(userInput);
    }
}

function validateUserInput(userInput, validInput) {
    return validInput.test(userInput);
}

const calculateDiameter = (radius) => radius * 2;

const calculateArea = (radius) => radius ** 2 * Math.PI;

const calculateCircumference = (radius) => 2 * Math.PI * radius;

function obtainOperation(enterOperationMsg, validOperations) {
    let selectedOperation = obtainUserInput(enterOperationMsg, validOperations);
    if (selectedOperation) {
        return Number.parseInt(selectedOperation);
    } else {
        alert("Нет такой команды");
        return obtainOperation(enterOperationMsg, validOperations);
    }
}

const enterRadiusMsg = "Введите радиус круга:";
const enterOperationMsg = "Введите номер команды чтобы посчитать: 1 - диаметр, 2 - площадь круга, 3 - длинну окружности";
const validRadius = /^([1-9]{1}[0-9]{0,})|([0-9]{0,}.[0-9]{0,}){0,1}$/;
const validOperations = /^[1-3]{1}$/;
const availableOperations = [
    {
        message: "Диаметр окружности с радиусом {radius} равен {result}",
        calculate: calculateDiameter,
    },
    {
        message: "Площадь круга с радиусом {radius} равена {result}",
        calculate: calculateArea,
    },
    {
        message: "Длинна окружности с радиусом {radius} равена {result}",
        calculate: calculateCircumference,
    },
];

let radius = obtainUserInput(enterRadiusMsg, validRadius);
if (radius) {
    let operation = obtainOperation(enterOperationMsg, validOperations);
    let result = availableOperations[operation - 1].calculate(+radius);
    alert(availableOperations[operation - 1].message.replace("{radius}", radius).replace("{result}", result));
} else {
    alert("Нужно ввести число");
}
