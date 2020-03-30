import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL

const service = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})


export const AUTH_MESSAGES = {
    addNewMessage:  data =>  service.post('/api/messages/add-new-message', data),
    updateUserBoard:  data =>  service.post('/api/messages/board', data),
    getMessages:  () =>  service.get('/api/messages'),

}

export default AUTH_MESSAGES