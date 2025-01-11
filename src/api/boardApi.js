import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./memberApi";

const foundPath = `${API_SERVER_HOST}/api/found`

export const postFoundBoard = async (boardData) => {
    const formData = new FormData();
    formData.append('title', boardData.title);
    formData.append('content', boardData.content);
    formData.append('ino', boardData.ino);

    try {
        const response = jwtAxios.post();
        return response;
    } catch (error) {
        
    }
}

export const getAllFoundBoard = async () => {
    try {
        const response = await jwtAxios.get(`${foundPath}/`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        alert(error);
    }
}

export const getFoundBoardById = async (pno) => {
    try {
        const response = await jwtAxios.get(`${foundPath}/${pno}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        alert(error);
    }
}

export const deleteFoundBoard = async (pno) => {
    try {
        const response = await jwtAxios.delete(`${foundPath}/${pno}`);
        return response.data;
    } catch (error) {
        alert(error);
    }
}

export const putFoundBoard = async (pno, boardData) => {
    const formData = new FormData();
    formData.append('title', boardData.title);
    formData.append('content', boardData.content);
    formData.append('ino', boardData.ino);

    const response = await jwtAxios.put(`${foundPath}/${pno}`)

    return response.data;
}