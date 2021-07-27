function arrayFill(item, size = 0) {
    return Array(size).fill(item);
}

function countArrayFor(arrayToCount = []) {
    let sum = 0;
    for (let item of arrayToCount) {
        if (typeof item === 'number') {
            sum += item;
        } else if (Array.isArray(item)) {
            sum += countArray(item);
        }
    }
    return sum;
}

function countArray(arrayToCount = []) {
    return arrayToCount.flat(Infinity).reduce((sum, item) => sum + item, 0);
}