function generateStringOfNumbers(num) {
    num = +num;
    if (num > 1) {
        return `${generateStringOfNumbers(num - 1)} ${num}`;
    } else {
        return "" + num;
    }
}

function sumNumbersInArray(numArr = []) {
    if (numArr.length === 0) {
        return "Error. Blank array.";
    } else if (numArr.length === 1) {
        return +numArr[0];
    }

    return +numArr.pop() + sumNumbersInArray(numArr);
}

function sumNumbersInString(str = "") {
    return sumNumbersInArray(str.split(" "));
}
