import Category from "./category";
import TypeOfProduct from "./typeOfProduct";
class Product {
    name: string;
    description: string;
    quantity: number;
    image: string;
    title1: string;
    title2: string;
    listTypeOfProduct: TypeOfProduct[];
    categoryId: number;
    supplierId:number;
    sellerId:number;
    price: number;
    cost:number

    constructor(
        name: string,
        description: string,
        quantity: number,
        image: string,
        title1: string,
        title2: string,
        listTypeOfProduct: TypeOfProduct[] = [],
        categoryId: number,
        supplierId: number,
        price: number,
        cost: number,
        sellerId:number// Mặc định là một mảng rỗng nếu không có giá trị được truyền vào
    ) {
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.image = image;
        this.title1 = title1;
        this.title2 = title2;
        this.listTypeOfProduct = listTypeOfProduct;
        this.categoryId = categoryId;
        this.supplierId = supplierId;
        this.price = price;
        this.cost = cost;
        this.sellerId= sellerId
    }
    
    
}
export default Product;
