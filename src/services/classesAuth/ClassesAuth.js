import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const service = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export const AUTH_CLASSES = {
    createClass: data => service.post('/api/classes/create-class', data),
    getClasses: () => service.get('/api/classes'),
}

export default AUTH_CLASSES;
