function Item(price, callories) {
    this.price = price;
    this.callories = callories;
}

function Hamburger(size) {
    this.size = size;
    this.topping = [];
}
Hamburger.prototype.addTopping = function (newTopping) {
    if (newTopping) {
        this.topping.push(newTopping);
    }
};
Hamburger.prototype.countTotal = function (type) {
    let total = this.size[type];
    this.topping.forEach((element) => {
        total += element[type];
    });
    return total;
};
Hamburger.prototype.getPrice = function () {
    return this.countTotal("price");
};
Hamburger.prototype.getCallories = function () {
    return this.countTotal("callories");
};
Hamburger.SIZE_SMALL = new Item(50, 20);
Hamburger.SIZE_MID = new Item(75, 30);
Hamburger.SIZE_LARGE = new Item(100, 40);
Hamburger.TOPPING_CHEESE = new Item(10, 20);
Hamburger.TOPPING_SALAD = new Item(20, 5);
Hamburger.TOPPING_POTATO = new Item(15, 10);
Hamburger.TOPPING_SAUCE = new Item(15, 0);
Hamburger.TOPPING_MAYO = new Item(20, 5);

const hamburger = new Hamburger(Hamburger.SIZE_SMALL);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_POTATO);

console.log("Price with sauce: " + hamburger.getPrice());
console.log("Callories with sauce: " + hamburger.getCallories());
