import React, { useEffect, useState, useRef } from 'react';
import { getFoundBoardByPno } from '../../api/boardApi';
import { getMember } from "../../api/memberApi";
import { getCommentsByPostId, deleteComment, modifyComment } from "../../api/commentApi"; // 댓글 삭제 및 수정 API 추가
import { useParams } from "react-router-dom";
import { initializeMap, geocodeAddress } from "../../util/mapUtil";
import { postComment } from "../../api/commentApi";
import useCustomLogin from "../../hooks/useCustomLogin";

const EachPostComponent = () => {
    const { pno } = useParams();
    const { loginState } = useCustomLogin();
    const [postData, setPostData] = useState(null);
    const [authorName, setAuthorName] = useState(""); // 작성자 이름 상태
    const [comments, setComments] = useState([]); // 댓글 상태 추가
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [commentContent, setCommentContent] = useState(""); // 댓글 내용 상태
    const [isSubmitting, setIsSubmitting] = useState(false); // 제출 중 상태
    const [isEditing, setIsEditing] = useState(null); // 수정 모드 상태
    const [editContent, setEditContent] = useState(""); // 수정 중인 댓글 내용

    // 게시글 및 댓글 로딩
    useEffect(() => {
        const fetchEachPost = async () => {
            try {
                const response = await getFoundBoardByPno(pno);
                setPostData(response);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await getCommentsByPostId(pno);
                const commentsWithAuthorNames = await Promise.all(
                    response.map(async (comment) => {
                        const author = await getMember(comment.mno); // 댓글 작성자 이름 조회
                        return { ...comment, nickname: author.nickname }; // 작성자 이름 추가
                    })
                );
                setComments(commentsWithAuthorNames); // 댓글 목록에 작성자 이름 추가
            } catch (error) {
                console.error("댓글 조회 실패:", error);
            }
        };

        if (pno) {
            fetchEachPost();
            fetchComments(); // 댓글도 함께 로딩
        }
    }, [pno]);

    // 작성자 이름 로딩
    useEffect(() => {
        if (postData && postData.mno) {
            const fetchAuthorName = async () => {
                try {
                    const response = await getMember(postData.mno); // 작성자 ID로 정보를 가져옴
                    setAuthorName(response.nickname); // 작성자 이름을 설정
                } catch (error) {
                    console.error(error);
                }
            };
            fetchAuthorName();
        }
    }, [postData]);

    // 지도 및 마커 설정
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

    // 댓글 등록 함수
    const handleCommentSubmit = async () => {
        setIsSubmitting(true);
        try {
            const commentData = {
                content: commentContent,
                mno: loginState.mno, // 예시로 작성자 ID (로그인한 사용자 ID)
                postId: postData.pno, // 해당 게시글 ID
            };
            await postComment(commentData);
            setCommentContent(""); // 댓글 내용 초기화

            // 댓글 등록 후 다시 댓글 목록을 가져오기
            const updatedComments = await getCommentsByPostId(postData.pno);
            const commentsWithAuthorNames = await Promise.all(
                updatedComments.map(async (comment) => {
                    const author = await getMember(comment.mno); // 댓글 작성자 이름 조회
                    return { ...comment, nickname: author.nickname }; // 작성자 이름 추가
                })
            );
            setComments(commentsWithAuthorNames); // 댓글 목록 업데이트
        } catch (error) {
            console.error("댓글 등록 실패", error);
        } finally {
            setIsSubmitting(false); // 제출 완료 상태
        }
    };

    // 댓글 수정 함수
    const handleCommentEdit = (commentId, currentContent) => {
        setIsEditing(commentId); // 수정하려는 댓글의 ID를 상태에 저장
        setEditContent(currentContent); // 수정할 댓글 내용 설정
    };

    const handleEditSubmit = async (commentId) => {
        try {
            const updatedCommentData = {
                cno: commentId,
                content: editContent,
            };
            await modifyComment(updatedCommentData);
            const updatedComments = await getCommentsByPostId(postData.pno);
            const commentsWithAuthorNames = await Promise.all(
                updatedComments.map(async (comment) => {
                    const author = await getMember(comment.mno); // 댓글 작성자 이름 조회
                    return { ...comment, nickname: author.nickname }; // 작성자 이름 추가
                })
            );
            setComments(commentsWithAuthorNames); // 댓글 목록 업데이트
            setIsEditing(null); // 수정 완료 후 수정 모드 종료
        } catch (error) {
            console.error("댓글 수정 실패", error);
        }
    };

    // 댓글 삭제 함수
    const handleCommentDelete = async (commentId) => {
        try {
            await deleteComment(commentId);

            // 삭제 후 댓글 목록을 다시 가져와서 업데이트
            const updatedComments = await getCommentsByPostId(postData.pno);
            const commentsWithAuthorNames = await Promise.all(
                updatedComments.map(async (comment) => {
                    const author = await getMember(comment.mno); // 댓글 작성자 이름 조회
                    return { ...comment, nickname: author.nickname }; // 작성자 이름 추가
                })
            );
            setComments(commentsWithAuthorNames); // 댓글 목록 업데이트
        } catch (error) {
            console.error("댓글 삭제 실패", error);
        }
    };

    // 지도와 마커를 사용해 위치로 이동하는 함수
    const moveToLocation = () => {
        if (map && marker) {
            map.setCenter(marker.getPosition()); // 마커 위치로 지도 이동
            marker.setMap(map); // 지도에 마커 표시
        }
    };

    if (!postData) {
        return <div className="text-center py-10">Loading...</div>;
    }

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
                        <span className="font-semibold ml-2 text-gray-800">{authorName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="text-sm text-gray-500">
                            {postData.updated && postData.updated !== postData.created
                                ? new Date(postData.updated).toLocaleString() // 수정된 시간 표시
                                : new Date(postData.created).toLocaleString() // 작성된 시간 표시
                            }
                            {postData.updated && postData.updated !== postData.created && (
                                <span className="text-gray-600">(수정됨)</span>
                            )}
                        </div>
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
                {/* 지도 위치로 이동 버튼 */}
                {map && marker && (
                    <div className="flex mt-4 justify-center">
                        <button
                            onClick={moveToLocation}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                        >
                            위치 초기화
                        </button>
                    </div>
                )}
                {/* 댓글 작성 폼 */}
                <div className="w-full bg-white rounded-xl shadow-lg p-6 mb-6">
                    <textarea
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="댓글을 입력하세요..."
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <button
                        onClick={handleCommentSubmit}
                        disabled={isSubmitting || !commentContent} // 댓글이 비어 있거나 제출 중일 때 버튼 비활성화
                        className={`w-full p-2 bg-gray-500 text-white rounded-lg ${isSubmitting ? 'bg-gray-300' : ''}`}
                    >
                        {isSubmitting ? "댓글 등록 중..." : "댓글 등록"}
                    </button>
                    {/* 댓글 목록 */}
                    <h3 className="font-bold text-xl mt-4 mb-4">댓글</h3>
                    {comments.map((comment) => (
                        <li key={comment.id} className="flex mb-4 border-t border-gray-300 pt-4 justify-between ">
                            {/* 프로필 이미지와 제목을 왼쪽 정렬 */}
                            <div className="flex items-center mr-4">
                                <img
                                    src="https://www.studiopeople.kr/common/img/default_profile.png"
                                    alt="프로필 이미지"
                                    className="w-8 h-8 mr-2 rounded-full"
                                />
                                <span className="font-semibold text-gray-800">{comment.nickname}</span>
                            {/* 댓글 내용 */}
                                {isEditing === comment.cno ? (
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                                    />
                                ) : (
                                    <p className="text-gray-700 ml-2">{comment.content}</p>
                                )}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                {/* 수정, 삭제 버튼 */}
                                {loginState.mno === comment.mno && ( // 로그인한 사용자가 작성한 댓글에만 버튼 표시
                                    <div className="flex items-center">
                                        {isEditing === comment.cno ? (
                                            <button
                                                onClick={() => handleEditSubmit(comment.cno)}
                                                className="px-2 py-1 text-blue-500"
                                            >
                                                저장
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleCommentEdit(comment.cno, comment.content)}
                                                className="px-2 py-1 text-blue-500"
                                            >
                                                수정
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleCommentDelete(comment.cno)}
                                            className="px-2 py-1 text-red-500"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                )}

                                {/* 시간 표시 */}
                                <div className="ml-4">
                                    {comment.updated && comment.updated !== comment.created
                                        ? new Date(comment.updated).toLocaleString() // 수정된 시간 표시
                                        : new Date(comment.created).toLocaleString() // 작성된 시간 표시
                                    }
                                    {comment.updated && comment.updated !== comment.created && (
                                        <span className="text-gray-600">(수정됨)</span>
                                    )}
                                </div>
                            </div>

                        </li>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default EachPostComponent;
