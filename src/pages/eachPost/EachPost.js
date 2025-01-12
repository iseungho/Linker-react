import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { useParams } from 'react-router-dom';
import EachPostComponent from '../../components/eachPost/EachPostComponent';

const EachPost = () => {

    const { pno } = useParams();
    return (
        <BasicLayout>
            <EachPostComponent pno={pno} /> 
            <EachPostComponent/> 
        </BasicLayout>
    );
};

export default EachPost;