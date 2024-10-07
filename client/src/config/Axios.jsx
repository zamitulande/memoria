import axios from 'axios';

const  api = import.meta.env.VITE_API;


const axiosClient = axios.create({
 baseURL: "http://200.7.110.4:6868/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});

export default axiosClient;