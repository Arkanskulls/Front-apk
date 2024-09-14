import axios from "axios";

const api = axios.create({
    baseURL: 'https://creepy-tights-lion.cyclic.app'
})

export default api;