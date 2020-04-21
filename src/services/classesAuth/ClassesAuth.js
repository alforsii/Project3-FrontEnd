import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const service = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const AUTH_CLASSES = {
  getClasses: () => service.get('/api/classes'),
  createClass: data => service.post('/api/classes/create-class', data),
  removeClass: data => service.post('/api/classes/remove-class', data),

  addStudent: data => service.post('/api/classes/add-student', data),
  removeStudent: data => service.post('/api/classes/remove-student', data),
  getClassStudents: classId => service.get(`/api/classes/${classId}/class-students`),
  getOtherStudents: classId => service.get(`/api/classes/${classId}/other-students`),
  
  addTeacher: data => service.post('/api/classes/add-teacher', data),
  removeTeacher: data => service.post('/api/classes/remove-teacher', data),
  getClassTAs: classId => service.get(`/api/classes/${classId}/class-teachers`),
  getOtherTAs: classId => service.get(`/api/classes/${classId}/other-teachers`),
  
  updateClassImg(userData) {
    return service.post('/api/classes/update/class-image', userData);
  },
};

export default AUTH_CLASSES;
