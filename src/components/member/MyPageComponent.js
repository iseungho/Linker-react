import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // useSelector import 추가
import { Link } from 'react-router-dom';


const MyPageComponent = () => {
    // Redux에서 로그인 상태 가져오기
    const loginState = useSelector(state => state.loginSlice);

    // 사용자 정보 상태를 Redux에서 가져온 정보로 초기화
    const [userInfo, setUserInfo] = useState({
        profileImage: 'path_to_profile_image.jpg', // 기본 이미지 경로
        nickname: '사용자이름', // 기본 닉네임
        email: 'user@example.com' // 기본 이메일
    });

    // loginState가 변경될 때마다 userInfo 업데이트
    useEffect(() => {
        setUserInfo({
            profileImage: loginState.profileImage || 'path_to_profile_image.jpg',
            nickname: loginState.nickname || '사용자이름',
            email: loginState.email || 'user@example.com'
        });
    }, [loginState]);

    return (
        <div style={{fontSize: '25px'}} >
            <div style={{ padding: '20px', position: 'absolute', top: '100px', left: '0' }}>
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
            <div style={{ textAlign: 'center'}}>
            <h2><strong>프로필</strong></h2>
            <Link to="/member/modify">
                <button>프로필 수정</button>
            </Link>

            <h2 style={{marginTop:'20px'}}><strong>게시글</strong></h2>
            <Link to={'/board/lost'}>
                <button>내 분실물 게시글 조회</button>
            </Link><br/> 
            <Link to={'/board/found'}>
                <button>내 습득물 게시글 조회</button>
            </Link><br/> 
            <Link to={'/board/free'}>
                <button>내 자유 게시글 조회</button>
            </Link><br/> 
            </div>
        </div>
    );
};

export default MyPageComponent;