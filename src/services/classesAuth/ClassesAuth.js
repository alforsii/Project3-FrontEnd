import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const service = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export const AUTH_CLASSES = {
  getClasses: () => service.get('/api/classes'),
  createClass: data => service.post('/api/classes/create-class', data),
  removeClass: data => service.post('/api/classes/remove-class', data),
  addStudent: data => service.post('/api/classes/add-student', data),
  removeStudent: data => service.post('/api/classes/remove-student', data),
  getStudents: (data) => service.post('/api/classes/students', data),
  updateClassImg(userData) {
    return service.post('/api/classes/update/class-image', userData);
  },
  getClassStudents(classId) {
    return service.get(`/api/classes/${classId}/class-students`);
  },
  getClassTAs(classId) {
    return service.get(`/api/classes/${classId}/class-teachers`);
  },
  getOtherStudents(classId) {
    return service.get(`/api/classes/${classId}/other-students`);
  },
  getOtherTAs(classId) {
    return service.get(`/api/classes/${classId}/other-teachers`);
  },
}

export default AUTH_CLASSES;
