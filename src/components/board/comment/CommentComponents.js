import React, { useEffect, useState } from 'react';
import { getCommentById } from '../../../api/commentApi';

const CommentComponents = ({id}) => {

    // 댓글
    const [comments,setComments] = useState([]);

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await getCommentById(id);
                console.log(response.data)
                setComments(response.data);    
            } catch (error) {
                throw new Error("Comment.js에서 실패했습니다");
            }
        }
        fetchComment();
    },[id]);

    return (
        <div>
            댓글들
            댓글들
            댓글들
            댓글들
            댓글들
            댓글들
            댓글들
            댓글들
            댓글들
            댓글들
            댓글들
        </div>
    );
};

export default CommentComponents;