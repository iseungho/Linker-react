import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./memberApi";

const commentPath = `${API_SERVER_HOST}/api/comments`;
const postCommentPath = `${API_SERVER_HOST}/post`;

export const getCommentByPostId = async (postId) => {
    try {
        // console.log("getCommentById에 넘어온 postId",postId);
        const response = await jwtAxios.get(`${[postCommentPath]}/${postId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error("getByPostId Error");
    }
}

export const getCommentById = async (Id) => {
    try {
        // console.log("getCommentById에 넘어온 postId",postId);
        const response = await jwtAxios.get(`${commentPath}/${Id}`);
        console.log(response);
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
export const modifyComment = async (commentData) => {
    try {
        const response = await jwtAxios.post(`${commentPath}/`,
            {
                mno: commentData.mno,
                content: commentData.content,
                postId: commentData.postId
            }
        )
        return response.data;
    } catch (error) {
        throw new Error("댓글 수정 실패");        
    }
}

export const createComment = async (commentData) => {
    try {
        const response = await jwtAxios.put(`${commentPath}/`,
            {
                mno: commentData.mno,
                content: commentData.content,
                postId: commentData.postId
            }
        )
        return response.data;
    } catch (error) {
        throw new Error("댓글 작성 실패");        
    }
}