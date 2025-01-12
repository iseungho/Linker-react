import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modifyMember, removeMember } from "../../api/memberApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import ResultModal from "../common/ResultModal";
import { updateLoginInfo, clearLoginInfo } from "../../slices/loginSlice";

const initState = {
    email: "",
    password: "",
    nickname: "",
    profileImage: "" 
}

const ModifyComponent = () => {
    const [member, setMember] = useState(initState);
    const [confirmPassword, setConfirmPassword] = useState("");
    const loginInfo = useSelector(state => state.loginSlice);
    const { moveToPath } = useCustomLogin();
    const [result, setResult] = useState();
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const fileInput = useRef(null)
    const [file, setFile] = useState(null); // 추가
    
    const onChange = (e) => {
        if(e.target.files[0]){
                setFile(e.target.files[0])
            }else{ //업로드 취소할 시
                setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
                return
            }
        //화면에 프로필 사진 표시
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    setImage(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }

    useEffect(() => {
        setMember({ 
            email: loginInfo.email, 
            nickname: loginInfo.nickname, 
            profileImage: loginInfo.profileImage // 프로필 이미지 초기화
        });
    }, [loginInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "confirmPassword") {
            setConfirmPassword(value); // 비밀번호 확인 상태 업데이트
        } else {
            setMember({ ...member, [name]: value });
        }
    }

    const handleClickModify = async () => {
            // 비밀번호와 비밀번호 확인 값이 같은지 확인
            if (member.password !== confirmPassword) {
                window.alert("비밀번호가 일치하지 않습니다.");
                return; // 수정 진행 중지
            }
            try {
            const memberToUpdate = { ...member };
            if (!memberToUpdate.password) {
                delete memberToUpdate.password;
            }
            await modifyMember(memberToUpdate, loginInfo.mno);
            dispatch(updateLoginInfo(memberToUpdate));
            setResult('수정완료');
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    }

    const handleClickRemove = async () => {
        const confirmed = window.confirm("정말 회원을 탈퇴하시겠습니까?");
        if (confirmed) {
            try {
                await removeMember(loginInfo.mno);
                dispatch(clearLoginInfo());
                setResult('Removed');
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
            }
        }
    }

    const closeModal = () => {
        setResult(null);
        moveToPath("/");
    }

    return (
        <div className="mt-10 m-2 p-4"> {/* 테두리 관련 클래스 제거 */}
            {result ? <ResultModal title={'회원정보'} content={result} callbackFn={closeModal}></ResultModal> : null}
            {error ? <div className="text-red-500 mb-4">{error}</div> : null}

        <div className="flex">
        <div className="w-1/2 p-4">    
            <div className="flex justify-center items-center w-full h-full mb-4">
                <div className="relative flex justify-center flex-wrap">
                    <img src={Image} style={{margin: "20px",borderRadius: "50%", width: "200px", height: "200px" }} onClick={()=>{fileInput.current.click()}}/>
                    <input name="profileImage" style={{display:"none"}} accept='image/jpg,impge/png,image/jpeg' type='file' onChange={onChange} ref={fileInput}/>
                    <div className="p-6 pt-0 text-center font-bold w-full">프로필 이미지 수정</div>
                    </div>
                </div>
            </div>            
            <div className="w-1/2 p-4">
                <div className="flex justify-center mb-">
                    <div className="relative mb-4 flex w-full flex-col flex-wrap items-stretch">
                        <div className="pl-0  text-left font-bold w-32">아이디</div>
                        <input className="p-0 border-b border-neutral-300 focus:outline-none focus:border-blue-500 flex-grow"
                            name="email" type={'text'} value={member.email} readOnly />
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap flex-col items-stretch">
                        <div className="pl-0 text-left font-bold w-32">본인 이름</div>
                        <input className="p-0 border-b border-neutral-300 focus:outline-none focus:border-blue-500 flex-grow"
                            name="nickname" type={'text'} value={member.nickname} onChange={handleChange} />
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap flex-col items-stretch">
                        <div className="pl-0 text-left font-bold w-32">비밀번호</div>
                        <input className="p-0 border-b border-neutral-300 focus:outline-none focus:border-blue-500 flex-grow"
                            name="password" type={'password'} value={member.password} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap flex-col items-stretch">
                        <div className="pl-0 text-left font-bold w-40">비밀번호 확인</div>
                        <input className="p-0 border-b border-neutral-300 focus:outline-none focus:border-blue-500 flex-grow"
                            name="confirmPassword" type={'password'} value={confirmPassword} onChange={handleChange} />
                    </div>
                </div>
            </div>
        </div>    

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap justify-center">
                    <button type="button" onClick={handleClickRemove}
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500">
                        탈퇴하기
                    </button>
                    <button type="button" onClick={handleClickModify}
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-neutral-500">
                        수정하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModifyComponent;