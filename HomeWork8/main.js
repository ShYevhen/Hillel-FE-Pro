function copy(inputObject = {}) {
    const cloneObj = {};
    for (let key in inputObject) {
        if (typeof inputObject[key] !== "object" || (typeof inputObject[key] === "object" && inputObject[key] === null)) {
            cloneObj[key] = inputObject[key];
        } else if (inputObject[key] instanceof Date) {
            cloneObj[key] = new Date(inputObject[key].getTime());
        } else {
            cloneObj[key] = copy(inputObject[key]);
        }
    }
    return cloneObj;
}

const obj = { name: "Alina", age: 23, adress: { country: "UA", city: "Kyiv" } };
const objCopy = copy(obj);
objCopy.adress.postalCode = "12345";
obj.adress.city = "Odesa";
console.log(JSON.stringify(obj));
console.log(JSON.stringify(objCopy));
