import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // useSelector import 추가
import { Link } from 'react-router-dom';
import useCustomLogin from "../../hooks/useCustomLogin";

const MyPageComponent = () => {
    // Redux에서 로그인 상태 가져오기
    const loginState = useSelector(state => state.loginSlice);

    // 사용자 정보 상태를 Redux에서 가져온 정보로 초기화
    const [userInfo, setUserInfo] = useState({
        profileImage: 'https://www.studiopeople.kr/common/img/default_profile.png', // 기본 이미지 경로
        nickname: '사용자이름', // 기본 닉네임
        email: 'user@example.com' // 기본 이메일
    });

    // loginState가 변경될 때마다 userInfo 업데이트
    useEffect(() => {
        setUserInfo({
            profileImage: loginState.profileImage || 'https://www.studiopeople.kr/common/img/default_profile.png',
            nickname: loginState.nickname || '사용자이름',
            email: loginState.email || 'user@example.com'
        });
    }, [loginState]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-50">
            {/* 사용자 정보 */}
            <div
                className="flex flex-row items-center justify-between w-full p-4 bg-white shadow-md rounded-lg space-x-4 fixed top-16 left-4">
                <div className="flex flex-row items-center space-x-4">
                    <img
                        src={userInfo.profileImage}
                        alt="프로필 사진"
                        className="w-24 h-24 rounded-full border-2 border-gray-300"
                    />
                    <div>
                        <h3 className="text-xl font-semibold">{userInfo.nickname}</h3>
                        <p className="text-sm text-gray-500">{userInfo.email}</p>
                    </div>
                </div>
                <Link to="/member/modify" className="block">
                    <div
                        className="mr-4 bg-gray-500 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 hover:shadow-xl p-4">
                        <h3 className="text-xl">프로필 수정</h3>
                    </div>
                </Link>
            </div>

            {/* 프로필 수정 및 게시글 조회 버튼들 */}
            <div className="mt-32 text-center space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mt-12">게시글 조회</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Link to="/board/lost" className="block">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl p-8">
                            <h3 className="text-xl">분실물 게시글 조회</h3>
                            <p className="mt-2 text-sm text-gray-100">오늘 올라온 분실물 게시글을 확인하세요.</p>
                        </div>
                    </Link>
                    <Link to="/board/found" className="block">
                        <div
                            className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl p-8">
                            <h3 className="text-xl">습득물 게시글 조회</h3>
                            <p className="mt-2 text-sm text-gray-100">오늘 올라온 습득물 게시글을 확인하세요.</p>
                        </div>
                    </Link>
                    <Link to="/board/free" className="block">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl p-8">
                            <h3 className="text-xl">자유 게시글 조회</h3>
                            <p className="mt-2 text-sm text-gray-100">자유 게시글을 확인하고 참여하세요.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyPageComponent;
