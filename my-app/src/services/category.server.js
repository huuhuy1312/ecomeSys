import axios from "axios";
const API_URL = "http://localhost:8080/api/category/";

class CategoryService {
    async getAll() {
        const response = await axios.get(API_URL + "all");
        return response.data;
    }
}
export default new CategoryService();