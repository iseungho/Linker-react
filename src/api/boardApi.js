import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./memberApi";

const foundPath = `${API_SERVER_HOST}/api/found`

const deletePath = `${API_SERVER_HOST}/api/found`


export const getAllBoard = async () => {
    try {
        const response = await jwtAxios.get(`${foundPath}/`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        alert(error);
    }
}

export const deleteDoard = (pno) => {

}