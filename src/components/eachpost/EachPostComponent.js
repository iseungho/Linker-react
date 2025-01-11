import React, { useEffect, useState } from 'react';
import { getFoundBoardById } from '../../api/boardApi';
import styled from 'styled-components';

// const EachPostComponent = ({pno}) => {
const EachPostComponent = () => {

    const [postData, setPostData] = useState(null);

    // 400 에러
    // useEffect(() => {
    //     const fetchEachPost = async () => {
    //         try {
    //             const response = await getFoundBoardById(pno);
    //             console.log(response);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchEachPost();
    // },[pno]);

    return (
        <div>
            ddd
        </div>
    );
};

export default EachPostComponent;

const Container = styled.div`

`