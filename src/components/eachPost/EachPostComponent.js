import React, { useEffect, useState } from 'react';
import { getFoundBoardById } from '../../api/boardApi';
import styled from 'styled-components';
import { useParams } from "react-router-dom";

const EachPostComponent = () => {
    const { pno } = useParams();
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        const fetchEachPost = async () => {
            try {
                const response = await getFoundBoardById(pno);
                setPostData(response);
            } catch (error) {
                console.error(error);
            }
        };
        if (pno) {
            fetchEachPost();
        }
    }, [pno]);

    if (!postData) {
        return <div>Loading...</div>;
    }

    const formattedDate = new Date(postData.created).toLocaleDateString();

    return (
        <Container>
            <ProductContainer>
                <img src={postData.photoUrl} alt='분실물 이미지' />
                <small>{formattedDate}</small>
            </ProductContainer>
            <PostInfoContainer>
                <AuthorInfo>
                    <div>
                        <img src='/default-profile.png' alt='프로필 이미지' />
                        <span>작성자 {postData.mno}</span>
                    </div>
                    <div>
                        <span>{postData.location}</span>
                        <img src='/location-icon.png' alt='위치 아이콘' />
                    </div>
                </AuthorInfo>
                <div style={{ fontWeight: 'bold', fontSize: '25px', borderBottom: '1px solid black', marginTop: '15px' }}>
                    {postData.title}
                </div>
                <Content>
                    {postData.content}
                </Content>
            </PostInfoContainer>
        </Container>
    );
};

export default EachPostComponent;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    margin-top: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    img {
        width: 200px;
        height: 200px;
        border: 1px solid black;
    }
`;

const PostInfoContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
`;

const AuthorInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    border-bottom: 1px solid black;
`;

const Content = styled.div`
    width: 100%;
    border: 1px solid black;
    margin-top: 10px;
    min-height: 300px;
    padding: 10px;
`;
