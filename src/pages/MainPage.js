import React from 'react';
import BasicLayout from "../layouts/BasicLayout";
import { useSelector } from "react-redux";

function MainPage(props) {

    return (
        <BasicLayout>
            <div className="w-full h-screen flex flex-col items-center">
                {/* Header Section */}
                <div className="w-full flex justify-between items-center p-4  mt-16">
                    {/* Project Name and Image */}
                    <div className="flex items-center">
                        <img
                            src="/path/to/your/image.png"
                            alt="프로젝트 이미지"
                            className="w-12 h-12 mr-4 rounded-full border"
                        />
                        <h1 className="text-2xl font-bold text-blue-500">프로젝트명</h1>
                    </div>
                    {/* Navigation Buttons */}
                    <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-500">분실물 게시판</button>
                        <button className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-500">습득물 게시판</button>
                        <button className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-500">자유게시판</button>
                    </div>
                </div>

                {/* Search Section */}
                <div className="w-full flex flex-col items-center mt-10">
                    <div className="flex items-center w-3/4 md:w-1/2 lg:w-1/3">
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요"
                            className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600">검색</button>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}

export default MainPage;
