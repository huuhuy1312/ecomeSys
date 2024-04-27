import axios from "axios";
const API_URL = "http://localhost:8080/api/item/";

class ItemService {
    async addItem(productId, quantity, cartid) {
        const response = await axios.post(API_URL + "add", {
            "pid": productId,
            "quantity": quantity,
            "cartId": cartid
        })
        return response.data;
    }
    async deleteItemById(itemid) {
        const response = await axios.delete(API_URL + `delete?itemId=${itemid}`)
        return response.data;
    }
}
export default new ItemService();