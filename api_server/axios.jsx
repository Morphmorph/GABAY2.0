import axios from "axios";

export const axiosRequest = axios.create({
    baseURL : "http://192.168.100.143:8080/"
  });