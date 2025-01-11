import React, { useState } from "react";
import { postFoundBoard } from "../../api/boardApi";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";

const FoundWriteComponent = () => {
    const navigate = useNavigate();
    const { loginState } = useCustomLogin();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        mno: loginState.mno, // 작성자 ID
        categoryId: 1, // 임시 기본값
        regionId: 1, // 임시 기본값
        location: "",
        photoUrl: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await postFoundBoard(formData);
            alert("게시글이 성공적으로 등록되었습니다!");
            navigate("/board/found"); // 작성 후 목록 페이지로 이동
        } catch (error) {
            alert("게시글 등록에 실패했습니다.");
        }
    };

    return (
        <div div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full md:w-3/5 bg-white shadow-md rounded px-8 pt-6 pb-8 mt-16 mb-4 flex flex-col"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">습득물 글쓰기</h2>

                {/* 제목 입력 */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        제목
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="제목을 입력하세요"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* 내용 입력 */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        내용
                    </label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        placeholder="내용을 입력하세요"
                        rows="5"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* 위치 입력 */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        위치
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="습득 장소를 입력하세요"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* 사진 URL 입력 */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        사진 URL
                    </label>
                    <input
                        type="text"
                        name="photoUrl"
                        value={formData.photoUrl}
                        onChange={handleChange}
                        placeholder="사진 URL을 입력하세요"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* 제출 버튼 */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-400 transition duration-300"
                    >
                        글쓰기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FoundWriteComponent;
