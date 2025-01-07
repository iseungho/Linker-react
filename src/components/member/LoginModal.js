import React, { useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import SignupComponent from "./SignupComponent";  // 회원가입 컴포넌트를 가져옵니다

const LoginModal = ({ isOpen, onClose }) => {
    const [loginParam, setLoginParam] = useState({ email: '', password: '' });
    const { doLogin, moveToPath } = useCustomLogin();
    const [error, setError] = useState('');
    const [isSignup, setIsSignup] = useState(false);  // 로그인/회원가입 전환 상태

    const handleChange = (e) => {
        setLoginParam({ ...loginParam, [e.target.name]: e.target.value });
        setError(''); // 입력 값 변경 시 오류 메시지 초기화
    };

    const handleClickLogin = () => {
        doLogin(loginParam).then(data => {
            if (data.error) {
                setError("이메일과 패스워드를 다시 확인하세요");
            } else {
                alert("로그인 성공");
                moveToPath('/');
                onClose(); // 로그인 성공 후 모달 닫기
            }
        });
    };

    const handleClickKakaoLogin = () => {
        // 카카오 로그인 로직 추가
        alert("카카오 로그인 클릭");
    };

    const handleClickNaverLogin = () => {
        // 네이버 로그인 로직 추가
        alert("네이버 로그인 클릭");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm">
                <button className="absolute top-2 right-2 text-gray-700" onClick={onClose}>
                    <span className="text-3xl font-bold">&times;</span>
                </button>
                <div className="text-2xl font-semibold text-gray-800 mb-6">
                    {isSignup ? "회원가입" : "로그인"}
                </div>

                {/* 로그인/회원가입 전환 버튼 */}
                <div className="flex justify-center mb-4">
                    <button
                        className={`w-1/2 p-3 ${!isSignup ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
                        onClick={() => setIsSignup(false)}
                    >
                        로그인
                    </button>
                    <button
                        className={`w-1/2 p-3 ${isSignup ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
                        onClick={() => setIsSignup(true)}
                    >
                        회원가입
                    </button>
                </div>

                {/* 로그인 폼 */}
                {!isSignup ? (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="email">
                                이메일
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                value={loginParam.email}
                                placeholder="이메일을 입력하세요"
                                onChange={handleChange}
                                className="w-full p-3 border-2 border-gray-300 focus:outline-none focus:border-gray-500 rounded-xl"
                            />
                            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="password">
                                비밀번호
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                value={loginParam.password}
                                onChange={handleChange}
                                className="w-full p-3 border-2 border-gray-300 focus:outline-none focus:border-gray-500 rounded-xl"
                            />
                            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300 w-full"
                                onClick={handleClickLogin}
                            >
                                로그인
                            </button>
                        </div>
                    </>
                ) : (
                    // 회원가입 폼
                    <SignupComponent />
                )}

                <div className="mt-4 text-center">
                    <button className="text-sm text-gray-600 hover:text-gray-800" onClick={() => alert("아이디/비밀번호 찾기")}>
                        아이디/비밀번호 찾기
                    </button>
                </div>

                <div className="mt-6 space-y-2">
                    <button
                        className="w-full py-3 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition duration-300"
                        onClick={handleClickKakaoLogin}
                    >
                        카카오 로그인
                    </button>
                    <button
                        className="w-full py-3 bg-green-400 text-white rounded-lg hover:bg-green-500 transition duration-300"
                        onClick={handleClickNaverLogin}
                    >
                        네이버 로그인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
