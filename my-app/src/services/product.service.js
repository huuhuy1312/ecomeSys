import axios from "axios";
const API_URL = "http://localhost:8080/api/product/";

class ProductService {
    async getAllProduct() {
        const response = await axios.get(API_URL + "all");
        return response.data;
    }
    async getProductByName(name) {
        const response = await axios.get(API_URL + `search?keyword=${name}`);
        return response.data;
    }
    async getProductById(id) {
        const response = await axios.get(API_URL + `${id}`);
        return response.data;
    }
}
export default new ProductService();