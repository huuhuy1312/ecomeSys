import axios from "axios";
const API_URL = "http://localhost:8080/api/cart/";

class CartService {
    async getByID(id) {
        const response = await axios.get(API_URL + id);
        return response.data;
    }
}
export default new CartService();