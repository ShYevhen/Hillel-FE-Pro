const user = {
    firstName: "Nikola",
    secondName: "Tesla",
    getFullName: function () {
        return `${this.firstName} ${this.secondName}`;
    },
};
const userTwo = { firstName: "Steve", secondName: "Jobs" };
const userThree = { firstName: "Steve", secondName: "Wozniak" };
const userFour = {firstName: "Julia ", secondName: "Roberts"};

console.log(user.getFullName());
console.log(user.getFullName.call(userTwo));
console.log(user.getFullName.apply(userThree));
const bindedFullName = user.getFullName.bind(userFour)
console.log(bindedFullName());

function User(firstName, secondName) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.getFullName = function () {
        return `${this.firstName} ${this.secondName}`;
    }
}

const usersList = [];
usersList.push(new User(user.firstName, user.secondName));
usersList.push(new User(userTwo.firstName, userTwo.secondName));
usersList.push(new User(userThree.firstName, userThree.secondName));
usersList.push(new User(userFour.firstName, userFour.secondName));
console.log(usersList);

function Calculator(initValue) {
    this.result= initValue;
    this.sum = (value) => this.result += value;
    this.mult = (value) => this.result *= value;
    this.sub = (value) => this.result -= value;
    this.div = (value) => this.result /= value;
    this.set = (value) => this.result = value;
}

const calc = new Calculator(10);

console.log(calc.sum(5)); /// 15
console.log(calc.mult(10)); // 150
console.log(calc.sub(40)); // 110
console.log(calc.div(10)); // 11
console.log(calc.set(100)); //