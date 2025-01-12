import React, { useEffect, useState } from "react";
import PageComponent from "../../common/PageComponent";
import { deleteFreeBoard, getAllFreeBoard } from "../../../api/boardApi";
import useCustomMove from "../../../hooks/useCustomMove";
import useCustomLogin from "../../../hooks/useCustomLogin";
import { Link } from "react-router-dom";

const initListState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0,
};

const FreeComponent = () => {
    const { page, size, moveToFreePostList, refresh } = useCustomMove();
    const { loginState } = useCustomLogin();
    const [serverData, setServerData] = useState(initListState);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        const fetchBoardList = async () => {
            setFetching(true);
            try {
                const data = await getAllFreeBoard({ page, size });
                setServerData(data);
            } catch (error) {
                console.error("Error fetching board list:", error);
            } finally {
                setFetching(false);
            }
        };
        fetchBoardList();
    }, [page, size, refresh]);

    const handleMovePage = (pageNum) => {
        moveToFreePostList({ page: pageNum, size });
    };

    const handleDelete = async (pno) => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                await deleteFreeBoard(pno);
                alert("게시글이 삭제되었습니다.");
                setServerData((prevData) => ({
                    ...prevData,
                    dtoList: prevData.dtoList.filter((post) => post.pno !== pno),
                }));
            } catch (error) {
                alert("게시글 삭제에 실패했습니다.");
            }
        }
    };

    return (
        <div className="board-list-container flex justify-center mt-24 mb-4 px-4">
            <div className="board-list-wrapper w-full sm:w-2/3 md:w-2/3 lg:w-3/5 xl:w-2/3 bg-white shadow-lg rounded-lg">
                <div className="board-list-header flex justify-between items-center p-6 bg-gray-100 rounded-t-lg">
                    <h2 className="board-list-title text-2xl font-semibold text-gray-800">자유 게시판</h2>
                </div>
                {fetching && <p className="text-center py-6">Loading...</p>}

                {serverData.dtoList.length === 0 ? (
                    <p className="text-center py-6 text-gray-500">게시글이 없습니다.</p>
                ) : (
                    serverData.dtoList.map((post) => (
                        <div key={post.pno} className="board-item p-6 border-b border-gray-200">
                            <div className="flex justify-between items-start">
                                <Link to={`/board/free/${post.pno}`} className="flex-1">
                                    <h3 className="board-title text-xl font-semibold text-gray-900">
                                        {post.title}
                                        {post.commentCount > 0 && ` [${post.commentCount}]`}
                                    </h3>
                                </Link>
                                <div className="flex items-center space-x-4">
                                    <div className="text-sm text-gray-500">
                                        {post.updated && post.updated !== post.created
                                            ? new Date(post.updated).toLocaleString() // 수정된 시간 표시
                                            : new Date(post.created).toLocaleString() // 작성된 시간 표시
                                        }
                                        {post.updated && post.updated !== post.created && (
                                            <span className="text-gray-600">(수정됨)</span>
                                        )}
                                    </div>

                                    {/* 로그인한 사용자와 게시글 작성자가 같으면 수정/삭제 버튼 표시 */}
                                    {loginState.mno === post.mno && (
                                        <div className="flex space-x-3">
                                            <Link
                                                to={`/board/free/modify/${post.pno}`}
                                                className="text-gray-600 hover:text-blue-500 text-sm"
                                            >
                                                수정
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.pno)}
                                                className="text-red-600 hover:text-red-500 text-sm"
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <p className="board-content text-sm text-gray-600 mt-2">{post.content}</p>
                        </div>
                    ))
                )}

                <div className="flex justify-between items-center py-4 px-6 bg-gray-100 rounded-b-lg">
                    <Link
                        to="/board/free/write"
                        className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition duration-300"
                    >
                        글쓰기
                    </Link>

                    <PageComponent serverData={serverData} movePage={handleMovePage} />
                </div>
            </div>
        </div>
    );
};

export default FreeComponent;
