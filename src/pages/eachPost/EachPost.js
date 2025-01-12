import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { useParams } from 'react-router-dom';
import EachPostComponent from '../../components/eachPost/EachPostComponent';
import CommentComponents from '../../components/board/comment/CommentComponents';

const EachPost = () => {

    const { pno } = useParams();
    return (
        <BasicLayout>
            <EachPostComponent pno={pno} /> 
            {/* <EachPostComponent/>  */}
            <CommentComponents postId={2}/>
        </BasicLayout>
    );
};

export default EachPost;