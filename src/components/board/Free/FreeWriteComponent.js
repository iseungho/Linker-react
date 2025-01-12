import React, { useState, useRef, useEffect } from "react";
import { postFreeBoard } from "../../../api/boardApi";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../../hooks/useCustomLogin";
import { geocodeAddress, reverseGeocodeAddress, initializeMap, updateMapLocation, addMapClickListener } from "../../../util/mapUtil";

const FreeWriteComponent = () => {
    const navigate = useNavigate();
    const { loginState } = useCustomLogin();

    const [selectedLocation, setSelectedLocation] = useState("경기도 성남시 분당구 판교로 227번길23 4&5층 SK쉴더스");
    const [searchAddress, setSearchAddress] = useState("");

    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        const { naver } = window;
        if (naver) {
            const initialLocation = new naver.maps.LatLng(37.5665, 126.978);
            const { newMap, newMarker } = initializeMap(mapRef, naver, initialLocation);
            setMap(newMap);
            setMarker(newMarker);

            addMapClickListener(newMap, newMarker, naver, (roadAddress) => {
                setSelectedLocation(roadAddress);
            });
        }
    }, []);

    useEffect(() => {
        const { naver } = window;
        if (map && selectedLocation && marker && naver) {
            geocodeAddress(selectedLocation, naver, (location) => {
                const { newMap, newMarker } = updateMapLocation(map, marker, naver, location, mapRef);
                setMap(newMap);
                setMarker(newMarker);
            });
        }
    }, [map, marker, selectedLocation]);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        mno: loginState.mno,
        categoryId: 2, // Free 게시판에 맞는 카테고리 ID로 설정
        regionId: 1,
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

    const handleSearch = () => {
        const { naver } = window;
        if (searchAddress) {
            geocodeAddress(searchAddress, naver, (location) => {
                const { newMap, newMarker } = updateMapLocation(map, marker, naver, location, mapRef);
                setMap(newMap);
                setMarker(newMarker);

                reverseGeocodeAddress(location, naver, (roadAddress) => {
                    setSelectedLocation(roadAddress);
                });
            });
        } else {
            alert("주소를 입력하세요");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.location = selectedLocation;

        try {
            await postFreeBoard(formData); // Free 게시판에 맞는 API 호출
            alert("게시글이 성공적으로 등록되었습니다!");
            navigate("/board/free");
        } catch (error) {
            alert("게시글 등록에 실패했습니다.");
        }
    };

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full md:w-3/5 bg-white shadow-md rounded px-8 pt-6 pb-8 mt-16 mb-4 flex flex-col"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">자유게시판 글쓰기</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">제목</label>
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

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">내용</label>
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

                <div className="mb-4">
                    <div ref={mapRef} style={{width: "100%", height: "400px"}}></div>
                </div>
                {selectedLocation && (
                    <div className="mb-4 text-gray-500">
                        <span className="font-bold">선택된 위치: </span>
                        {selectedLocation}
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 mr-4">위치</label>
                    <div className="flex">
                        <input
                            type="text"
                            name="location"
                            value={searchAddress}
                            onChange={(e) => setSearchAddress(e.target.value)}
                            placeholder="정확한 도로명 주소를 검색하세요"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="ml-6 px-6 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-400 transition duration-300 flex-shrink-0"
                        >
                            검색
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">사진 URL</label>
                    <input
                        type="text"
                        name="photoUrl"
                        value={formData.photoUrl}
                        onChange={handleChange}
                        placeholder="사진 URL을 입력하세요"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

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

export default FreeWriteComponent;
