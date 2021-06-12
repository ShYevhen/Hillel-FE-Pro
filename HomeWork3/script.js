function getInputParams(question, availableValues) {
    let userInput = prompt(question);
    if (validateInput(userInput, availableValues)) {
        return userInput.toLowerCase();
    } else {
        return getInputParams(question, availableValues);
    }
}

function validateInput(userInput, availableValues) {
    if (userInput && availableValues === "number") {
        return /^-{0,1}[0-9]{1,}$/.test(userInput);
    } else if (userInput && Array.isArray(availableValues)) {
        return availableValues.includes(userInput.toLowerCase());
    }
    return false;
}

function obtainResult(firstNumber, secondNumber, operation) {
    let result;
    switch (operation) {
        case "+":
        case "add": {
            result = `${firstNumber} + ${secondNumber} = ${+firstNumber + +secondNumber}`;
            break;
        }
        case "-":
        case "sub": {
            result = `${firstNumber} - ${secondNumber} = ${firstNumber - secondNumber}`;
            break;
        }
        case "*":
        case "mult": {
            result = `${firstNumber} * ${secondNumber} = ${firstNumber * secondNumber}`;
            break;
        }
        case "/":
        case "div": {
            result = `${firstNumber} / ${secondNumber} = ${firstNumber / secondNumber}`;
            break;
        }
        case "%":
        case "mod": {
            result = `${firstNumber} % ${secondNumber} = ${firstNumber % secondNumber}`;
            break;
        }
    }
    return result;
}

const availableOperations = ["+", "add", "-", "sub", "*", "mult", "/", "div", "%", "mod"];
const numberType = "number";
let firstNumber = getInputParams("Введите первое число:", numberType);
let secondNumber = getInputParams("Введите второе число:", numberType);
let operation = getInputParams("Введите операцию:\r\nСписок операций: + и add, - и sub, * и mult, / и div, % и mod", availableOperations);
let result = obtainResult(firstNumber, secondNumber, operation);

alert(result);
