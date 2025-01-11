import React, { useEffect, useState } from "react";
import PageComponent from "../common/PageComponent";
import { getAllFoundBoard } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMove";
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

const FoundComponent = () => {
    const { page, size, moveToFoundPostList, refresh } = useCustomMove();
    const [serverData, setServerData] = useState(initListState);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        const fetchBoardList = async () => {
            setFetching(true);
            try {
                const data = await getAllFoundBoard({ page, size });
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
        moveToFoundPostList({ page: pageNum, size });
    };

    return (
        <div className="board-list-container flex justify-center mt-24">
            <div className="board-list-wrapper w-2/3 sm:w-2/3 md:w-2/3 lg:w-3/5">
                <div className="board-list-header flex justify-between items-center">
                    <h2 className="board-list-title text-2xl font-semibold">습득물 게시판</h2>
                </div>
                {fetching && <p>Loading...</p>}

                {serverData.dtoList.map((post) => (
                    <div key={post.pno} className="board-item border-b border-gray-300 py-4">
                        <Link to={''}>
                            <h3 className="board-title text-xl font-semibold">{post.title}[{post.commentCount}]</h3>
                        </Link>
                        <p className="board-content text-sm text-gray-600">{post.content}</p>
                    </div>
                ))}
                <div className="flex justify-end">
                    <Link to={'/board/found/write'}
                          className="px-4 py-2 rounded-lg bg-green-500 m-4 text-white hover:bg-green-400 transition duration-300"
                    >
                        글쓰기
                    </Link>
                </div>
                <PageComponent serverData={serverData} movePage={handleMovePage}/>
            </div>
        </div>
    );
};

export default FoundComponent;