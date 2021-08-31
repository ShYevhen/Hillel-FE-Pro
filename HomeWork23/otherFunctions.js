const countTotal = () => ({total: 100});
console.log('Task 1: ',countTotal());

const result = `Today is ${new Date}`;
console.log('Task 2: ',result);

function reverseDestr(...params) {
    return params.reverse();
}

let a = 3;
let b = 2;
console.log(`Task 3 before: a = ${a}, b = ${b}`);
[a, b] = reverseDestr(a, b);
console.log(`Task 3 after: a = ${a}, b = ${b}`);