const personJohn = {
    name: "John",
    sayHello: function () {
        console.log(`Hello, I'm ${this.name}`);
    },
};
personJohn.sayHello();

const sysAdmin = {
    name: "Bob",
    __proto__: personJohn,
};
sysAdmin.sayHello();

const clientNatalia = {
    name: "Natalia",
    __proto__: personJohn,
};
clientNatalia.sayHello();

function Person(name) {
    this.name = name;
    this.sayHello = function () {
        console.log(`Hello, I'm ${this.name}`);
    };
}

function Employee(name) {
    this.name = name;
}
Employee.prototype = new Person();

function Client(name) {
    this.name = name;
}
Client.prototype = new Person();

const personJohnTwo = new Person("John");
const sysAdminTwo = new Employee("Bob");
const clientNataliaTwo = new Client("Natalia");
personJohnTwo.sayHello();
sysAdminTwo.sayHello();
clientNataliaTwo.sayHello();

function Student(name, grades) {
    this.name = name;
    this.grades = grades;
}
Student.prototype.averageMark = function () {
    return this.grades.reduce((result, item, index, arr) => {
        if (index < arr.length - 1) {
            return result + item;
        } else {
            return (result + item) / arr.length;
        }
    }, 0);
};

const students = [
    new Student("Student 1", [10, 9, 8, 0, 10]), // имя, оценки
    new Student("Student 12", [10, 0, 8, 0, 3, 4]),
];
