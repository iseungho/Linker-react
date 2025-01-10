import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import useCustomLogin from "../../hooks/useCustomLogin"; // useCustomLogin 훅을 가져옵니다.

const BasicMenu = ({ children }) => {
    const navigate = useNavigate();
    const loginState = useSelector(state => state.loginSlice);
    const { doLogout, moveToPath } = useCustomLogin(); // doLogout, moveToPath를 가져옵니다.

    const handleClickLogo = useCallback(() => {
        navigate({ pathname: `/` });
    }, [navigate]);

    const handleLogout = useCallback(() => {
        doLogout(); // 로그아웃 처리
        alert("정상적으로 로그아웃되었습니다!");
        moveToPath("/"); // 홈으로 리다이렉션
    }, [doLogout, moveToPath]);

    return (
        <div>
            <nav id='navbar' className="fixed w-full top-0 left-0 z-50 bg-white shadow">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
<<<<<<< Updated upstream
                    <nav className="space-x-1">
                        <button
                            className="bg-logo-image bg-cover w-12 h-12 font-bold text-blue-500"
                            onClick={handleClickLogo}
                        ></button>
                    </nav>
                    <nav className="space-x-4 flex items-center">
                        {!loginState.email ? (
                            <>
                                <Link to={'/member/signup'} className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 w-32 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-lg">
                                    SignUp
                                </Link>
                                <Link to={'/member/login'} className="bg-green-400 text-white px-6 py-3 rounded-lg hover:bg-green-500 w-32 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-lg">
                                    Login
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to={'/member/modify'} className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 w-32 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-lg">
                                    Modify
                                </Link>
                                <button
                                    className="bg-green-400 text-white px-6 py-3 rounded-lg hover:bg-green-500 w-32 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-lg"
                                    onClick={handleLogout} // 로그아웃 버튼 클릭 시 handleLogout 호출
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </nav>
=======
                    <button
                        className="bg-logo-image bg-cover w-32 h-10 cursor-pointer"
                        onClick={handleClickLogo}
                    >
                    </button>
                    <div className="flex space-x-6">
                        <Link to={'/board/lost'} className="text-gray-700 hover:text-black text-sm">
                            분실물 게시판
                        </Link>
                        <Link to={'/board/found'} className="text-gray-700 hover:text-black text-sm">
                            습득물 게시판
                        </Link>
                        <Link to={'/board/free'} className="text-gray-700 hover:text-black text-sm">
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
                            <LoginModal isOpen={isModalOpen} onClose={closeModal}/>
                        </div>
                    ) : (
                        <div className="flex">
                            <Link to={'/member/mypage'} className="mr-2 text-black px-4 py-2 rounded-lg hover:bg-gray-300 w-25 h-8 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-sm">
                                마이페이지
                            </Link>                            
                            <Link to={'/member/modify'} className="mr-2 text-black px-4 py-2 rounded-lg hover:bg-gray-300 w-24 h-8 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-sm">
                                회원정보
                            </Link>
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 w-24 h-8 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-sm"
                                onClick={handleLogout}
                            >
                                로그아웃
                            </button>
                        </div>
                    )}
>>>>>>> Stashed changes
                </div>
            </nav>
            {children}
        </div>
    );
}

export default BasicMenu;