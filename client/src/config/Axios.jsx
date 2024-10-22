import axios from 'axios';

const  api = import.meta.env.VITE_API;


const axiosClient = axios.create({
  baseURL: `http://${api}/api/v1`,
  headers: {
    "Content-type": "application/json"
  }
});

export default axiosClient;