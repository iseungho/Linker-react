import React, { useEffect, useState } from "react";
import PageComponent from "../common/PageComponent";

// 더미 데이터
const dummyData = {
    dtoList: [
        { bno: 1, title: "찾음 제목 1", content: "게시글 내용 1" },
        { bno: 2, title: "게시글 제목 2", content: "게시글 내용 2" },
        { bno: 3, title: "게시글 제목 3", content: "게시글 내용 3" },
        { bno: 4, title: "게시글 제목 4", content: "게시글 내용 4" },
        { bno: 5, title: "게시글 제목 5", content: "게시글 내용 5" },
        { bno: 6, title: "게시글 제목 6", content: "게시글 내용 6" },
        { bno: 7, title: "게시글 제목 7", content: "게시글 내용 7" },
        { bno: 8, title: "게시글 제목 8", content: "게시글 내용 8" },
        { bno: 9, title: "게시글 제목 9", content: "게시글 내용 9" },
        { bno: 10, title: "게시글 제목 10", content: "게시글 내용 10" },
    ],
    pageNumList: [1, 2, 3, 4, 5],
    pageRequestDTO: null, 
    prev: false,
    next: true,
    totalCount: 100,
    prevPage: 0,
    nextPage: 2,
    totalPage: 10,
    current: 1,
};

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
    const [serverData, setServerData] = useState(initListState);
    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

    useEffect(() => {
        const fetchBoardList = async () => {
            setFetching(true);
            try {
                // 서버 요청 대신 더미 데이터를 설정
                setServerData(dummyData);
            } catch (error) {
                console.error("Error fetching board list:", error);
            } finally {
                setFetching(false);
            }
        };

        fetchBoardList();
    }, [page, size]);

    const moveToPage = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="board-list-container flex justify-center mt-24">
            <div className="board-list-wrapper w-2/3 sm:w-2/3 md:w-2/3 lg:w-3/5">
                <div className="board-list-header flex justify-between items-center">
                    <h2 className="board-list-title text-2xl font-semibold">습득물 게시판</h2>
                </div>
                {fetching && <p>Loading...</p>}

                {serverData.dtoList.map((board) => (
                    <div key={board.bno} className="board-item border-b border-gray-300 py-4">
                        <h3 className="board-title text-xl font-semibold">{board.title}</h3>
                        <p className="board-content text-sm text-gray-600">{board.content}</p>
                    </div>
                ))}

                <PageComponent
                    serverData={serverData}
                    movePage={moveToPage}
                />
            </div>
        </div>
    );
};

export default FoundComponent;