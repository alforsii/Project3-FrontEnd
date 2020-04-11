import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const service = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export const AUTH_CLASSES = {
  getClasses: () => service.get('/api/classes'),
  addStudent: data => service.post('/api/classes/add-student', data),
  createClass: data => service.post('/api/classes/create-class', data),
  getStudents: (data) => service.post('/api/classes/students', data),
}

export default AUTH_CLASSES;