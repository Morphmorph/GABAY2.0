import axios from "axios";

export const axiosRequest = axios.create({
    baseURL : "http://192.168.100.159:8080/"
  });

export const server = "http://192.168.100.159:8080/"
