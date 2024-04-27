import axios from "axios";
const API_URL = "http://localhost:8080/api/rate/";

class RatesService {
    async addRate(productId, rateStar, rateReview, customerId) {
        const response = await axios.post(API_URL + "add", {
            "productId": productId,
            "rateStar": rateStar,
            "rateReview": rateReview,
            "customerId": customerId
        });
        return response.data;
    }
}
export default new RatesService();