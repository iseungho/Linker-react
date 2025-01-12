import React, { useEffect, useState } from 'react';
import { getCommentById } from '../../../api/commentApi';

const CommentComponents = ({postId}) => {

    // 댓글
    const [comments,setComments] = useState([]);

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await getCommentById(postId);
                setComments(response);    
            } catch (error) {
                throw new Error("Comment.js에서 실패했습니다", error);
            }
        }
        fetchComment();
        console.log(comments,"댓글들입니다");
    },[]);

    return (
        <div>
            {comments.content}
            됐냐?

        </div>
    );
};

export default CommentComponents;