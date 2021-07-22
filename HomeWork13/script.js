function createCalculator(calculationResult = 0) {
    return {
        sum: value => {
            calculationResult += value;
            return calculationResult;
        },
        mult: value => {
            calculationResult *= value;
            return calculationResult;
        },
        sub: value => {
            calculationResult -= value;
            return calculationResult;
        },
        div: value => {
            calculationResult /= value;
            return calculationResult;
        },
        set: value => {
            calculationResult = value;
            return calculationResult;
        },
        value: () => {
            return calculationResult;
        }
    }
}

const calc = createCalculator(10);

console.log(calc.sum(5)); /// 15
console.log(calc.mult(10)); // 150
console.log(calc.sub(40)); // 110
console.log(calc.div(10)); // 11
console.log(calc.set(100)); // 100