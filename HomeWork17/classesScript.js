class Item {
    constructor(price, callories) {
        this.price = price;
        this.callories = callories;
    }
}

class Hamburger {
    static SIZE_SMALL = new Item(50, 20);
    static SIZE_MID = new Item(75, 30);
    static SIZE_LARGE = new Item(100, 40);
    static TOPPING_CHEESE = new Item(10, 20);
    static TOPPING_SALAD = new Item(20, 5);
    static TOPPING_POTATO = new Item(15, 10);
    static TOPPING_SAUCE = new Item(15, 0);
    static TOPPING_MAYO = new Item(20, 5);
    constructor(size) {
        this.size = size;
        this.topping = [];
    }
    addTopping(newTopping) {
        if (newTopping) {
            this.topping.push(newTopping);
        }
    }
    countTotal(type) {
        let total = this.size[type];
        this.topping.forEach((element) => {
            total += element[type];
        });
        return total;
    }
    getPrice() {
        return this.countTotal("price");
    }
    getCallories() {
        return this.countTotal("callories");
    }
}

const hamburger = new Hamburger(Hamburger.SIZE_SMALL);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_POTATO);

console.log("Price with sauce: " + hamburger.getPrice());
console.log("Callories with sauce: " + hamburger.getCallories());
