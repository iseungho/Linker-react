import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080'

const host = `${API_SERVER_HOST}/api/found`

export const getAllPost = async () => {
    try {
        const response = axios.get(`{}`)
    } catch (error) {
        
    }
}