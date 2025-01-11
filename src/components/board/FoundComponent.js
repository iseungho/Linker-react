import React, { useEffect, useState } from "react";
import PageComponent from "../common/PageComponent";
import { getAllBoard } from "../../api/boardApi";

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
                const postData = await getAllBoard();
                setServerData((prev) => ({
                    ...serverData,
                    dtoList: postData,
                }))
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

                { serverData.dtoList.map((board) => (
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