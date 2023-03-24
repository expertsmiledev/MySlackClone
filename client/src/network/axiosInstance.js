import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: 'https://slackcloneappbygulsen.herokuapp.com/api'
  });