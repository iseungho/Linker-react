import React, { useEffect, useState } from 'react';
import { deleteComment, getCommentById, modifyComment } from '../../../api/commentApi';
import styled from 'styled-components';

const initState = {
    id: null,
    content: '',
    mno: null,
    postId: null
};

const CommentComponents = ({postId}) => {

    // 댓글
    const [comments,setComments] = useState(initState);
    const [editContent, setEditContent] = useState(initState);
    const [newContent, setNewContent] = useState(initState);

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await getCommentById(postId);
                setComments(response);    
                setEditContent(response);
            } catch (error) {
                throw new Error("Comment.js에서 실패했습니다", error);
            }
        }
        fetchComment();
        // console.log(comments,"댓글들입니다");
    },[]);

    const handleDelete = async () => {
        try {
            await deleteComment(comments.id);
        } catch (error) {
            console.error('댓글 삭제 실패:', error);
        }
    }

    const handlePost = async () => {
        try {
            const uploadComment = {
                ...newContent,
            };
            await modifyComment(uploadComment);
            setComments(uploadComment); 
        } catch (error) {
            console.error('댓글 생성 실패:', error);
        }
    }

    const handlePut = async () => {
        try {
            const updatedComment = {
                ...editContent,
            };
            await modifyComment(updatedComment);
            setComments(updatedComment); 
        } catch (error) {
            console.error('댓글 수정 실패:', error);
        }
    };

    const handleInputChange = (e) => {
        setEditContent((prev) => ({
            ...prev,
            content: e.target.value, 
        }));
    };

    const handleInput2Change = (e) => {
        setNewContent((prev) => ({
            ...prev,
            content: e.target.value, 
        }));
    };

    return (
        <Container>
            <div style={{border: '1px solid black'}}>
                <p>{comments.content}</p>
                <p>{comments.mno}</p>
                <p>{comments.postId}</p>
            </div>
            
            <div>
                <div style={{ border: '1px solid black', marginTop: '30px' }}>
                    <label>
                        댓글 수정 : 
                        <input
                            type="text"
                            value={editContent.content}
                            onChange={handleInputChange}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                    <button onClick={handlePut} style={{ marginLeft: '10px' }}>
                        수정하기
                    </button>
                </div>
            </div>


            <div>
                <div style={{ border: '1px solid black', marginTop: '30px' }}>
                    <label>
                        댓글 추가 : 
                        <input
                            type="text"
                            value={newContent.content}
                            onChange={handleInput2Change}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                    <button onClick={handlePost} style={{ marginLeft: '10px' }}>
                        추가하기
                    </button>
                </div>
            </div>
            <button onClick={handleDelete}>삭제하기</button>
        </Container>
    );
};

export default CommentComponents;

const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
