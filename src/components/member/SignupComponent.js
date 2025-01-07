import React, { useState } from "react";
import { signupMember } from "../../api/memberApi";
import ResultModal from "../common/ResultModal";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    role: "USER"
};

const SignupComponent = () => {
    const [member, setMember] = useState(initState);
    const [result, setResult] = useState();
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        nickname: ""
    });
    const { moveToPath } = useCustomLogin();

    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = { email: "", password: "", confirmPassword: "", nickname: "" };
        let isValid = true;

        // 이메일 유효성 검사
        if (!member.email) {
            newErrors.email = "이메일을 입력해주세요.";
            isValid = false;
        }

        // 닉네임 유효성 검사
        if (!member.nickname) {
            newErrors.nickname = "닉네임을 입력해주세요.";
            isValid = false;
        }

        // 비밀번호 유효성 검사
        if (!member.password) {
            newErrors.password = "비밀번호를 입력해주세요.";
            isValid = false;
        }

        // 비밀번호 확인 유효성 검사
        if (member.password !== member.confirmPassword) {
            newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
            isValid = false;
        } else if (!member.confirmPassword) {
            newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleClickSignup = async () => {
        if (!validateForm()) return;  // 유효성 검사 통과하지 않으면 종료

        try {
            await signupMember(member);
            setResult("회원가입 성공");
            setMember(initState);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                if (error.response.data.error === "EMAIL_ALREADY_EXISTS") {
                    setErrors({ ...errors, email: "이미 사용 중인 이메일입니다. 다른 이메일을 사용해 주세요." });
                } else {
                    setErrors({ ...errors, email: error.response.data.error });
                }
            } else {
                setErrors({ ...errors, email: error.message });
            }
        }
    };

    const closeModal = () => {
        setResult(null);
        moveToPath("/");
    };

    return (
        <div>
            {result ? <ResultModal title="회원가입" content={result} callbackFn={closeModal} /> : null}

            {/* 이메일 입력 필드 */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="email">
                    이메일
                </label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="이메일을 입력하세요"
                    value={member.email}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 focus:outline-none focus:border-gray-500 rounded-xl"
                />
                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>

            {/* 닉네임 입력 필드 */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="nickname">
                    닉네임
                </label>
                <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    placeholder="닉네임을 입력하세요"
                    value={member.nickname}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 focus:outline-none focus:border-gray-500 rounded-xl"
                />
                {errors.nickname && <div className="text-red-500 text-sm mt-1">{errors.nickname}</div>}
            </div>

            {/* 비밀번호 입력 필드 */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="password">
                    비밀번호
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    value={member.password}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 focus:outline-none focus:border-gray-500 rounded-xl"
                />
                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
            </div>

            {/* 비밀번호 확인 입력 필드 */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="confirmPassword">
                    비밀번호 확인
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="비밀번호 확인"
                    value={member.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 focus:outline-none focus:border-gray-500 rounded-xl"
                />
                {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
            </div>

            {/* 회원가입 버튼 */}
            <div className="flex justify-center mb-4">
                <button
                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300 w-full"
                    onClick={handleClickSignup}
                >
                    회원가입
                </button>
            </div>
        </div>
    );
};

export default SignupComponent;
