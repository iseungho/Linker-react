import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./memberApi";

const commentPath = `${API_SERVER_HOST}/api/comments`;

export const getCommentById = async (id) => {
    try {
        const response = await jwtAxios.get(`${commentPath}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("getById Error");
    }
}

export const deleteComment = async (id) => {
    try {
        const response = await jwtAxios.delete(`${commentPath}/${id}`);
        return response;
    } catch (error) {
        throw new Error("삭제 실패");        
    }
}

// postId는 줘야할까요?
export const modifyComment = async (id,commentData) => {
    try {
        const response = await jwtAxios.put(`${commentPath}/${id}`,
            {
                content: commentData.content,
            }
        )
        return response.data;
    } catch (error) {
        throw new Error("댓글 수정 실패");        
    }
}

export const createComment = async (commentData) => {
    try {
        const response = await jwtAxios.post(`${commentPath}/`,
            {
                content: commentData.content,
            }
        )
        return response.data;
    } catch (error) {
        throw new Error("댓글 작성 실패");        
    }
}