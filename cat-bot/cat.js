import axios from "axios";
import { config } from "./config.js";

export const getCat = async () => {
    const response = await axios.get(config.catUrl);
    console.log(response);
    return response?.data[0].url;
}