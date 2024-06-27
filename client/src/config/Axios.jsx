import axios from 'axios';


const axiosClient = axios.create({
  baseURL: 'http://0.0.0.0:8080/api/v1',
  headers: {
    "Content-type": "application/json"
  }
});

export default axiosClient;