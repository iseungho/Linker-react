import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux'; // useSelector import 추가
import { Link } from 'react-router-dom';
import useCustomLogin from "../../hooks/useCustomLogin";



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

        const { doLogout, moveToPath } = useCustomLogin(); // useCustomLogin 훅 호출
            const handleLogout = useCallback(() => {
            doLogout();
            alert("정상적으로 로그아웃되었습니다!");
            moveToPath("/");
        }, [doLogout, moveToPath]);
        
    return (
        <>
            <div style={{fontSize: '25px', display:'flex', flexDirection:'row', width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}} >
                <div style={{ position: 'fixed', top: '65px', left: '10px'}}>
                <button className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 w-24 h-8 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-sm"
                                onClick={handleLogout}
                            >로그아웃</button>
                    <img 
                        src={userInfo.profileImage}
                        alt="프로필 사진"
                        style={{ width: '150px', height: '70px', borderRadius: '50%', marginRight: '10px', marginTop: '10px'}} 
                    />
                    <div>
                        <h3>닉네임: {userInfo.nickname}</h3>
                        <p>이메일: {userInfo.email}</p>
                    </div>
                </div>
                <div>
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
            </div>
        </>
    );
};


export default MyPageComponent;