import axios, { AxiosRequestConfig } from "axios";

export interface AppAxiosRequestConfig extends AxiosRequestConfig {

}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001'
})

const axiosRequest = {
    async get<T>(url: string, config?: AppAxiosRequestConfig) {
        return axiosInstance.get<T>(url, config).then((response) => response.data)
    },

    async post<T>(url: string, data?: any, config?: AppAxiosRequestConfig) {
        return axiosInstance.post<T>(url, data, config).then((response) => response.data)
    }
}

export default axiosRequest