import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModifyComponent from './ModifyComponent';
import ListComponent from '../board/ListComponent';
import FoundComponent from '../board/FoundComponent';
import FreeComponent from '../board/FreeComponent';

const MyPageComponent = () => {
    const [userInfo, setUserInfo] = useState({
        profileImage: 'path_to_profile_image.jpg',
        nickname: '사용자이름',
        email: 'user@example.com'
    });

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <img 
                    src={userInfo.profileImage}
                    alt="프로필 사진"
                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} 
                />
                <div>
                    <h3>닉네임: {userInfo.nickname}</h3>
                    <p>이메일: {userInfo.email}</p>
                </div>
            </div>

            <h2>프로필</h2>
            <Link to="/member/modify">
                <button>프로필 수정</button>
            </Link>

            <h2>게시글</h2>
            <Link to="/member/lost">
                <button>내 분실물 게시글 조회</button>
            </Link><br/> 
            <Link to="/member/found">
                <button>내 습득물 게시글 조회</button>
            </Link><br/> 
            <Link to="/member/free">
                <button>내 자유 게시글 조회</button>
            </Link><br/> 
        </div>
    );
};

export default MyPageComponent;