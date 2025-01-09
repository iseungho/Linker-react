import React from "react";

const PageComponent = ({ serverData, movePage }) => {
    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            {/* Prev 버튼 */}
            {serverData.prev && (
                <button
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-400 transition duration-300"
                    onClick={() => movePage(serverData.prevPage)}
                >
                    &lt;
                </button>
            )}

            {/* 페이지 번호 버튼 */}
            {serverData.pageNumList.map((pageNum) => (
                <button
                    key={pageNum}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-300
                        ${serverData.current === pageNum
                        ? 'bg-gray-500 text-white'
                        : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
                    onClick={() => movePage(pageNum)}
                >
                    {pageNum}
                </button>
            ))}

            {/* Next 버튼 */}
            {serverData.next && (
                <button
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-500 text-white hover:bg-gray-400 transition duration-300"
                    onClick={() => movePage(serverData.nextPage)}
                >
                    &gt;
                </button>
            )}
        </div>
    );
};

export default PageComponent;
