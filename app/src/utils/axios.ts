import axios from "axios";


const instanse = axios.create({
    baseURL : 'http://localhost:3030'
})


instanse.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})


export default instanse