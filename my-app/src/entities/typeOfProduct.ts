class TypeOfProduct {
    label1: string;
    label2: string;
    quantity: number;
    image: string;
    price: number;
    cost: number;

    constructor(
        label1: string,
        label2: string,
        quantity: number,
        image: string,
        price: number,
        cost: number
    ) {
        this.label1 = label1;
        this.label2 = label2;
        this.image = image;
        this.price = price;
        this.cost = cost;
        this.quantity = quantity;
    }
}
export default TypeOfProduct;