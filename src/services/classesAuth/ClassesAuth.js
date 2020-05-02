import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const service = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const endPointUrl = '/api/classes'

export const AUTH_CLASSES = {
  getClasses(){
    return service.get(`${endPointUrl}`)
  },
  createClass(data) {
    return service.post(`${endPointUrl}/create-class`, data)
  },
  removeClass(data) {
    return service.post(`${endPointUrl}/remove-class`, data)
  },
  updateClass(classId, data) {
    return service.post(`${endPointUrl}/update-class/${classId}`, data)
  },


  addStudent(data) {
    return service.post(`${endPointUrl}/add-student`, data)
  },
  removeStudent(data) {
    return service.post(`${endPointUrl}/remove-student`, data)
  },
  getClassStudents(classId) {
    return service.get(`${endPointUrl}/${classId}/class-students`)
  },
  getOtherStudents(classId) {
    return service.get(`${endPointUrl}/${classId}/other-students`)
  },
  
  addTeacher(data) {
    return service.post(`${endPointUrl}/add-teacher`, data)
  },
  removeTeacher(data) {
    return service.post(`${endPointUrl}/remove-teacher`, data)
  },
  getClassTAs(classId) {
    return service.get(`${endPointUrl}/${classId}/class-teachers`)
  },
  getOtherTAs(classId) {
    return service.get(`${endPointUrl}/${classId}/other-teachers`)
  },
  
  createClasswork(data, classId) {
    return service.post(`${endPointUrl}/${classId}/classwork/create`, data)
  },
  getClassworks(classId) {
    return service.get(`${endPointUrl}/${classId}/classworks`)
  },

  updateClassImg(userData) {
    return service.post(`${endPointUrl}/update/class-image`, userData);
  },
};

export default AUTH_CLASSES;
