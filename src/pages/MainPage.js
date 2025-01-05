import React from 'react';
import BasicLayout from "../layouts/BasicLayout";
import { useSelector } from "react-redux";

function MainPage(props) {

    const loginState = useSelector(state => state.loginSlice);

    return (
        <BasicLayout>
            <div className="w-full flex flex-wrap h-screen justify-center items-center border-2">
                <div className="border-2 border-blue-400 mt-10 m-2 p-4">
                    <div className="flex items-center justify-center">
                        <div className="text-3xl">
                            <ul className="flex p-4 text-blue-400 font-bold">
                                {loginState.email ? (
                                    <li className="pr-6 text-2xl">
                                        Mno: {loginState.mno}<br />
                                        Email: {loginState.email}<br />
                                        Nickname: {loginState.nickname}<br />
                                        Role: {loginState.role}<br />
                                        Social: {loginState.social ? "true" : "false"}
                                    </li>
                                ) : (
                                    <li className="pr-6 text-2xl">
                                        우측 상단의 로그인 버튼을 눌러 로그인을 진행해주세요.
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}

export default MainPage;
