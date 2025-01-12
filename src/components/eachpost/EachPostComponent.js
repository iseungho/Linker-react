import React, { useEffect, useState } from 'react';
import { getFoundBoardById } from '../../api/boardApi';
import styled from 'styled-components';

const EachPostComponent = ({pno}) => {
// const EachPostComponent = () => {

    const [postData, setPostData] = useState(null);

    // 400 에러
    useEffect(() => {
        const fetchEachPost = async () => {
            try {
                const response = await getFoundBoardById(pno);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchEachPost();
    },[pno]);

    return (
        <Container>
            <ProductContainer>
                <img src='' alt='분실물 이미지'/>
                <small>날짜</small>
            </ProductContainer>
            <PostInfoContainer>
                <AuthorInfo>
                    <div>
                        <img src='' alt='프로필 이미지'/>
                        <span>작성자</span>
                    </div>
                    <div>
                        <span>주소</span>
                        <img src='' alt='위치 아이콘'/>
                    </div>
                </AuthorInfo>
                <div style={{fontWeight:'bold',fontSize:'25px',borderBottom:'1px solid black', marginTop:'15px'}}>
                    제목
                </div>
                <Content>
                    내용
                </Content>
            </PostInfoContainer>
        </Container>
    );
};

export default EachPostComponent;

const Container = styled.div`
width: 100%;
height: 100vh;
margin-top: 55px;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 150px;
`

const ProductContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 80%;
img{
    width: 200px;
    height: 200px;
    border: 1px solid black;
}
`

const PostInfoContainer = styled.div`
width: 80%;
display: flex;
flex-direction: column;
margin-top: 30px;
`

const AuthorInfo = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
div{
    display: flex;
    flex-direction: row;
}
border-bottom: 1px solid black;
`

const Content = styled.div`
width: 100%;
border: 1px solid black;
margin-top: 10px;
height: auto;
min-height: 300px;
padding: 10px;
`