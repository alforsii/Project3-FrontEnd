import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL

const service = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})


export const AUTH_MESSAGES = {
    // updateStatus: data => service.post('/api/messages/update-status'),
    getUserBoards:  () =>  service.get('/api/messages/boards'),
    updateUserBoard:  data =>  service.post('/api/messages/board', data),
    addNewMessage:  data =>  service.post('/api/messages/add-new-message', data),

}

export default AUTH_MESSAGES