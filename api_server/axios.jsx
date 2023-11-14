import axios from "axios";

export const axiosRequest = axios.create({
    baseURL : "http://192.168.100.103:8080/"
  });