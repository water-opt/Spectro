import axios from "axios";


export const createProduct = async(data) => {
    const response = await axios.post('http://localhost:5004/api/product',data);

    return response;

};