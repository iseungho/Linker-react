import React, { useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../hooks/useCustomLogin"; // 로그인 상태를 확인하는 훅

function MainPage(props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("FOUND");
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // 로그인 모달 상태
    const navigate = useNavigate();
    const { loginState } = useCustomLogin(); // 로그인 상태 가져오기

    // 검색 버튼 클릭 시 처리
    const handleSearch = () => {
        if (searchQuery.trim()) {
            if (!loginState.isLoggedIn) {
                setIsLoginModalOpen(true); // 로그인되지 않은 경우 모달 열기
                return;
            }
            // 로그인된 경우, 해당 카테고리 페이지로 이동
            navigate(`/board/${selectedCategory.toLowerCase()}?query=${searchQuery}`);
        }
    };

    // 게시판 버튼 클릭 시 처리
    const handleBoardClick = (category) => {
        if (!loginState.mno) {
            setIsLoginModalOpen(true); // 로그인되지 않은 경우 모달 열기
            return;
        }
        navigate(`/board/${category.toLowerCase()}`);
    };

    // 로그인 모달 닫기
    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    return (
        <BasicLayout>
            <div className="w-full h-screen flex flex-col items-center">
                {/* Header Section */}
                <div className="w-4/5 flex justify-center items-center p-4 mt-24">
                    <div className="flex items-center">
                        <h1 className="text-4xl font-bold text-gray-600">Linker - 분실물 관리 서비스</h1>
                    </div>
                </div>

                {/* Search Section */}
                <div className="w-full flex flex-col items-center mt-10">
                    <div className="flex items-center w-3/4 md:w-3/5 lg:w-3/5 space-x-4">
                        {/* 카테고리 선택 */}
                        <select
                            className="p-2 bg-gray-200 text-gray-700 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="FOUND">습득</option>
                            <option value="LOST">분실</option>
                            <option value="FREE">자유</option>
                        </select>

                        {/* 검색 입력창 */}
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요"
                            className="flex-grow p-2 bg-gray-100 text-gray-700 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        {/* 검색 버튼 */}
                        <button
                            className="p-2.5 bg-gray-500 text-white rounded-full hover:bg-gray-600 transform transition-transform duration-300"
                            onClick={handleSearch}
                        >
                            검색
                        </button>
                    </div>
                </div>

                <div className="mt-16 text-center space-y-8">
                    <h2 className="text-3xl font-bold text-gray-900 mt-12">게시글 조회</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <button onClick={() => handleBoardClick("LOST")} className="block">
                            <div
                                className="bg-green-500 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl w-64 h-64 flex flex-col justify-center items-center"
                            >
                                <h3 className="text-xl">분실물 게시글 조회</h3>
                                <p className="m-2 text-sm text-gray-100">오늘 올라온 분실물 게시글을 확인하세요.</p>
                            </div>
                        </button>
                        <button onClick={() => handleBoardClick("FOUND")} className="block">
                            <div
                                className="bg-indigo-500 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl w-64 h-64 flex flex-col justify-center items-center"
                            >
                                <h3 className="text-xl">습득물 게시글 조회</h3>
                                <p className="m-2 text-sm text-gray-100">오늘 올라온 습득물 게시글을 확인하세요.</p>
                            </div>
                        </button>
                        <button onClick={() => handleBoardClick("FREE")} className="block">
                            <div
                                className="bg-purple-500 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl w-64 h-64 flex flex-col justify-center items-center"
                            >
                                <h3 className="text-xl">자유 게시글 조회</h3>
                                <p className="m-2 text-sm text-gray-100">자유 게시글을 확인하고 참여하세요.</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* 로그인 모달 */}
            {isLoginModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                        <h2 className="text-xl font-semibold mb-4">로그인 필요</h2>
                        <p className="mb-4">이 기능을 사용하려면 로그인해야 합니다.</p>
                        <button
                            onClick={closeLoginModal}
                            className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </BasicLayout>
    );
}

export default MainPage;
