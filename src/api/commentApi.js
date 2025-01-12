import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./memberApi";

// 댓글 관련 API 경로 설정
const commentPath = `${API_SERVER_HOST}/api/comments`;

// 댓글 등록 함수
export const postComment = async (commentData) => {
    try {
        const response = await jwtAxios.post(`${commentPath}/`, {
            content: commentData.content,
            mno: commentData.mno,
            postId: commentData.postId,
        });
        console.log("댓글 등록 성공:", commentData);
        return response.data;
    } catch (error) {
        console.error("댓글 등록 실패:", error);
        throw error;
    }
};

export const getCommentsByPostId = async (postId) => {
    try {
        const response = await jwtAxios.get(`${commentPath}/post/${postId}`);
        console.log("댓글 조회 성공:", response);
        return response.data;
    } catch (error) {
        console.error("댓글 조회 실패:", error);
        throw error;
    }
}

export const deleteComment = async (commentId) => {
    try {
        const response = await jwtAxios.delete(`${commentPath}/${commentId}`);
        console.log("댓글 삭제 성공:", response);
        return response.data;
    } catch (error) {
        console.error("댓글 삭제 실패:", error);
        throw error;
    }
}

export const modifyComment = async (commentData) => {
    try {
        const response = await jwtAxios.put(`${commentPath}/${commentData.cno}`, {
            content: commentData.content,
        });
        console.log("댓글 수정 성공:", response);
        return response.data;
    } catch (error) {
        console.error("댓글 수정 실패:", error);
        throw error;
    }
}