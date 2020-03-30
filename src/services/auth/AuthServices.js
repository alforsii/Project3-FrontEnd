import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL

const service = axios.create({
    baseURL: BASE_URL,
    withCredentials: false
})


export const AUTH_SERVICE = {
    signup:  user =>  service.post('/api/auth/signup', user),
    login:  user =>  service.post('/api/auth/login', user),
    logout: () =>  service.post('/api/auth/logout',{}),
    isLoggedIn: () =>  service.get('/api/auth/isLoggedIn'),
    getUser: () =>  service.get('/api/auth/isLoggedIn'),
    getUsers: () =>  service.get('/api/auth/users'),
}

export default AUTH_SERVICE