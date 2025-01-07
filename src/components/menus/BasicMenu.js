import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, {useCallback, useState} from "react";
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

    return (
        <div>
            <nav id='navbar' className="fixed w-full space-x-6 top-0 left-0 z-50 bg-white shadow-md">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <button
                        className="w-12 h-12 font-bold text-gray-800"
                        onClick={handleClickLogo}
                    >
                        Logo
                    </button>
                        <div className="flex space-x-6">
                            <button className="text-gray-700 hover:text-black text-m font-medium">
                                분실물 게시판
                            </button>
                            <button className="text-gray-700 hover:text-black text-m font-medium">
                                습득물 게시판
                            </button>
                            <button className="text-gray-700 hover:text-black text-m font-medium">
                                자유게시판
                            </button>
                        </div>
                        {!loginState.email ? (
                            <div className="flex">
                                <Link to={'/member/signup'}
                                      className="bg-blue-400 text-white mr-2 px-4 py-2 rounded-lg hover:bg-blue-500 w-24 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-sm">
                                    SignUp
                                </Link>
                                <button
                                    className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500 w-24 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-sm"
                                    onClick={openModal}>
                                    Login
                                </button>
                                <LoginModal isOpen={isModalOpen} onClose={closeModal}/>
                            </div>
                        ) : (
                            <div className="flex">
                                <Link to={'/member/modify'} className="bg-blue-400 mr-2 text-white px-4 py-2 rounded-lg hover:bg-blue-500 w-24 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-sm">
                                    Modify
                                </Link>
                                <button
                                    className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500 w-24 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-sm"
                                    onClick={handleLogout}
                                >
                                    Logout
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