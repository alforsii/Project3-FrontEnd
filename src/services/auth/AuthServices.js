import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL

const service = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})


export const AUTH_SERVICE = {
    signup(userData) {
        return service.post('/api/auth/signup', userData);
      },
    
      login(userData) {
        return service.post('/api/auth/login', userData);
      },
    
      logout() {
        return service.post('/api/auth/logout', {});
      },
    
      getUser() {
        return service.get('/api/auth/isLoggedIn');
      },
      getUsers() {
        return service.get('/api/auth/users');
      },
      isLoggedIn() {
        return service.get('/api/auth/isLoggedIn');
      },
      updatePhoto(photoData) {
        return service.post('/api/profile/upload-photo', photoData, {
          onUploadProgress: ProgressEvent =>  {
          console.log(Math.round(ProgressEvent.loaded/ProgressEvent.total *100)+'%')}
        });
      },
      updateProfile(userData) {
        return service.post('/api/profile/upload-profile', userData);
      }
}

export default AUTH_SERVICE