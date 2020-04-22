import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const service = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const AUTH_CLASSES = {
  getClasses(){
    return service.get('/api/classes')
  },
  createClass(data) {
    return service.post('/api/classes/create-class', data)
  },
  removeClass(data) {
    return service.post('/api/classes/remove-class', data)
  },
  updateClass(classId, data) {
    return service.post(`/api/classes/update-class/${classId}`, data)
  },


  addStudent(data) {
    return service.post('/api/classes/add-student', data)
  },
  removeStudent(data) {
    return service.post('/api/classes/remove-student', data)
  },
  getClassStudents(classId) {
    return service.get(`/api/classes/${classId}/class-students`)
  },
  getOtherStudents(classId) {
    return service.get(`/api/classes/${classId}/other-students`)
  },
  
  addTeacher(data) {
    return service.post('/api/classes/add-teacher', data)
  },
  removeTeacher(data) {
    return service.post('/api/classes/remove-teacher', data)
  },
  getClassTAs(classId) {
    return service.get(`/api/classes/${classId}/class-teachers`)
  },
  getOtherTAs(classId) {
    return service.get(`/api/classes/${classId}/other-teachers`)
  },
  
  updateClassImg(userData) {
    return service.post('/api/classes/update/class-image', userData);
  },
};

export default AUTH_CLASSES;
