import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLostBoardById, modifyLostBoard} from "../../../api/boardApi";
import useCustomLogin from "../../../hooks/useCustomLogin";
import {
    addMapClickListener,
    geocodeAddress,
    initializeMap,
    reverseGeocodeAddress,
    updateMapLocation
} from "../../../util/mapUtil";

const LostModifyComponent = () => {
    const { pno } = useParams(); // 게시글 ID
    const navigate = useNavigate();
    const { loginState } = useCustomLogin();

    const [selectedLocation, setSelectedLocation] = useState("");
    const [searchAddress, setSearchAddress] = useState("");

    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        const { naver } = window;
        if (naver) {
            const initialLocation = new naver.maps.LatLng(37.5665, 126.978); // 기본 위치 설정
            const { newMap, newMarker } = initializeMap(mapRef, naver, initialLocation);
            setMap(newMap);
            setMarker(newMarker);

            addMapClickListener(newMap, newMarker, naver, (roadAddress) => {
                setSelectedLocation(roadAddress);
            });
        }
    }, []);

    // 게시글 불러오기
    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await getLostBoardById({ pno });
                setFormData({
                    title: response.title,
                    content: response.content,
                    categoryId: response.categoryId,
                    regionId: response.regionId,
                    location: response.location, // 기존 위치 값 설정
                    photoUrl: response.photoUrl,
                });

                // 게시글 불러올 때 기존 주소가 있으면 지도에 표시
                if (response.location) {
                    const { naver } = window;
                    geocodeAddress(response.location, naver, (location) => {
                        const { newMap, newMarker } = updateMapLocation(map, marker, naver, location, mapRef);
                        setMap(newMap);
                        setMarker(newMarker);
                        setSelectedLocation(response.location); // 위치 정보 설정
                    });
                }
            } catch (error) {
                alert("게시글을 불러오는 데 실패했습니다.");
            }
        };

        fetchBoard();
    }, [pno, map, marker]);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        categoryId: 1,
        regionId: 1,
        location: "",
        photoUrl: "",
    });

    // 입력 값 변경 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSearch = () => {
        const { naver } = window;
        // 주소가 비어있지 않다면
        if (searchAddress) {
            geocodeAddress(searchAddress, naver, (location) => {
                // 위치 변경 및 지도 업데이트
                const { newMap, newMarker } = updateMapLocation(map, marker, naver, location, mapRef);
                setMap(newMap);
                setMarker(newMarker);

                // 선택된 위치 업데이트
                reverseGeocodeAddress(location, naver, (roadAddress) => {
                    setSelectedLocation(roadAddress);
                });
            });
        } else {
            alert("주소를 입력하세요");
        }
    };

    // 게시글 수정 처리
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const result = await modifyLostBoard(pno, {
                ...formData,
                mno: loginState.mno,
            });

            if (result.RESULT === "SUCCESS") {
                alert("게시글 수정 성공!");
                navigate(`/board/lost/`);
            } else {
                alert("게시글 수정 실패.");
            }
        } catch (error) {
            alert("수정 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
            <form
                onSubmit={handleUpdate}
                className="w-full md:w-3/5 bg-white shadow-md rounded px-8 pt-6 pb-8 mt-16 mb-4 flex flex-col"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">게시글 수정</h2>

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
                    <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>
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
                        수정 완료
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LostModifyComponent;
