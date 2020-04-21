import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const service = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export const AUTH_MESSAGES = {
    updateStatus(data) {
      return service.post('/api/messages/update-status', data)
    },
    getUserBoards() {
      return service.get('/api/messages/boards')
    },
    updateUserBoard(data) {
       return service.post('/api/messages/board', data)
    },
    addNewMessage(data) {
      return service.post('/api/messages/add-new-message', data)
    },

}

export default AUTH_MESSAGES;
