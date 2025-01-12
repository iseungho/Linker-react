import React, { useEffect, useState, useRef } from 'react';
import { getFoundBoardByPno } from '../../api/boardApi';
import { useParams } from "react-router-dom";
import { initializeMap, geocodeAddress } from "../../util/mapUtil";

const EachPostComponent = () => {
    const { pno } = useParams();
    const [postData, setPostData] = useState(null);
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        const fetchEachPost = async () => {
            try {
                const response = await getFoundBoardByPno(pno);
                setPostData(response);
            } catch (error) {
                console.error(error);
            }
        };

        if (pno) {
            fetchEachPost();
        }
    }, [pno]);

    useEffect(() => {
        if (postData && postData.location) {
            geocodeAddress(postData.location, window.naver, (location) => {
                if (mapRef.current) {
                    const { newMap, newMarker } = initializeMap(mapRef, window.naver, location);
                    setMap(newMap);
                    setMarker(newMarker);
                }
            });
        }
    }, [postData]);

    if (!postData) {
        return <div className="text-center py-10">Loading...</div>;
    }

    const formattedDate = new Date(postData.created).toLocaleDateString();

    return (
        <div className="flex flex-col items-center w-full h-auto mt-8 px-4 bg-gray-50">
            {/* 작성자 및 위치 */}
            <div className="w-full md:w-3/4 bg-white rounded-xl mt-24 shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <img
                            src="https://www.studiopeople.kr/common/img/default_profile.png"
                            alt="프로필 이미지"
                            className="w-12 h-12 rounded-full border-2 border-gray-300"
                        />
                        <span className="font-semibold text-gray-800">작성자 {postData.mno}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <small className="text-gray-500">{formattedDate}</small>
                    </div>
                </div>
                <div className="font-bold text-3xl text-gray-900 mb-2">{postData.title}</div>
                <p className="text-lg text-gray-700">{postData.content}</p>
                <div className="flex flex-row justify-center space-x-4 mt-4">
                    <img
                        src={postData.photoUrl}
                        alt="분실물 이미지"
                        className="w-72 h-72 object-cover rounded-lg shadow-md"
                    />
                    <div className="w-72 h-72 object-cover rounded-lg shadow-md" ref={mapRef}></div>
                </div>
                <div className="mb-4 text-gray-500">
                    <span className="flex font-bold justify-center mt-2">위치 : {postData.location}</span>
                </div>
            </div>
        </div>
    );
};

export default EachPostComponent;
