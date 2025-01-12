import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, { useCallback, useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import LoginModal from "../member/LoginModal"; // useCustomLogin 훅을 가져옵니다.

const BasicMenu = ({ children }) => {
    const navigate = useNavigate();
    const loginState = useSelector(state => state.loginSlice);
    const { doLogout, moveToPath } = useCustomLogin();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleClickLogo = useCallback(() => {
        navigate({ pathname: `/` });
    }, [navigate]);

    const handleLogout = useCallback(() => {
        doLogout();
        alert("정상적으로 로그아웃되었습니다!");
        moveToPath("/");
    }, [doLogout, moveToPath]);

    const handleBoardLinkClick = useCallback((event, path) => {
        if (!loginState.email) {
            event.preventDefault(); // 링크 클릭 기본 동작을 막음
            openModal(); // 로그인 모달을 열음
        } else {
            navigate(path); // 로그인되어 있으면 정상적으로 이동
        }
    }, [loginState.email, navigate]);

    return (
        <div>
            <nav id='navbar' className="fixed w-full space-x-6 top-0 left-0 z-50 bg-gray-100 shadow-md select-none">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <button
                        className="bg-logo-image bg-cover w-32 h-10 cursor-pointer"
                        onClick={handleClickLogo}
                    >
                    </button>
                    <div className="flex space-x-6">
                        <Link to={'/board/lost'} className="text-gray-700 hover:text-black text-sm" onClick={(e) => handleBoardLinkClick(e, '/board/lost')}>
                            분실물 게시판
                        </Link>
                        <Link to={'/board/found'} className="text-gray-700 hover:text-black text-sm" onClick={(e) => handleBoardLinkClick(e, '/board/found')}>
                            습득물 게시판
                        </Link>
                        <Link to={'/board/free'} className="text-gray-700 hover:text-black text-sm" onClick={(e) => handleBoardLinkClick(e, '/board/free')}>
                            자유게시판
                        </Link>
                    </div>
                    {!loginState.email ? (
                        <div className="flex">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 w-24 h-8 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-sm"
                                onClick={openModal}>
                                Login
                            </button>
                            <LoginModal isOpen={isModalOpen} onClose={closeModal} />
                        </div>
                    ) : (
                        <div className="flex">
                            <Link to={'/member/mypage'} className="mr-2 text-black px-4 py-2 rounded-lg hover:bg-gray-300 w-25 h-8 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-sm">
                                마이페이지
                            </Link>
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 w-24 h-8 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-sm"
                                onClick={handleLogout}
                            >
                                로그아웃
                            </button>
                        </div>
                    )}
                </div>
            </nav>
            {children}
        </div>
    );
}

export default BasicMenu;
