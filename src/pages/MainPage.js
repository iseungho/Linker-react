import React from 'react';
import BasicLayout from "../layouts/BasicLayout";
import { Link } from "react-router-dom";

function MainPage(props) {

    return (
        <BasicLayout>
            <div className="w-full h-screen flex flex-col items-center">
                {/* Header Section */}
                <div className="w-4/5 flex justify-between items-center p-4 mt-16">
                    {/* Project Name and Image */}
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-gray-600">Linker - 분실물 관리 서비스</h1>
                    </div>
                    {/* Navigation Buttons */}
                    <div className="flex">
                        <Link to={'/board/lost'} className="px-4 py-2 bg-gray-300 text-white rounded-l-2xl hover:bg-gray-500">
                            분실물 게시판
                        </Link>
                        <Link to={'/board/found'} className="px-4 py-2 bg-gray-300 text-white hover:bg-gray-500">
                            습득물 게시판
                        </Link>
                        <Link to={'/board/free'} className="px-4 py-2 bg-gray-300 text-white rounded-r-2xl hover:bg-gray-500">
                            자유게시판
                        </Link>
                    </div>
                </div>

                {/* Search Section */}
                <div className="w-full flex flex-col items-center mt-10">
                    <div className="flex items-center w-3/4 md:w-3/5 lg:w-3/5 space-x-4">
                        {/* 카테고리 선택 */}
                        <select className="p-2 bg-gray-200 text-gray-700 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400">
                            <option value="습득">습득</option>
                            <option value="분실">분실</option>
                            <option value="자유">자유</option>
                        </select>

                        {/* 검색 입력창 */}
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요"
                            className="flex-grow p-2 bg-gray-100 text-gray-700 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />

                        {/* 검색 버튼 */}
                        <button className="p-2.5 bg-gray-500 text-white rounded-full hover:bg-gray-600 transform transition-transform duration-300">
                            검색
                        </button>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}

export default MainPage;
