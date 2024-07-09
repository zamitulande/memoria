import axios from 'axios';

const  api = import.meta.env.API;


const axiosClient = axios.create({
  baseURL: `http://${api}:6868/api/v1`,
  headers: {
    "Content-type": "application/json"
  }
});

export default axiosClient;