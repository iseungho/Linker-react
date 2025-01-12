import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { useParams } from 'react-router-dom';
import CommentComponents from '../../components/board/comment/CommentComponents';
import EachPostComponent from '../../components/eachPost/EachPostComponent';

const EachPost = () => {

    const { pno } = useParams();
    return (
        <BasicLayout>
            <EachPostComponent pno={pno} /> 
            {/* <EachPostComponent/>  */}
            <CommentComponents postId={1}/>
        </BasicLayout>
    );
};

export default EachPost;