import axios from "axios"
import jwtAxios from "../util/jwtUtil"

export const API_SERVER_HOST = 'http://localhost:8080'
const host = `${API_SERVER_HOST}/api/member`

export const loginPost = async (loginParam) => {

    const header = {
        headers: {
            "Content-Type": "x-www-form-urlencoded"
        }
    }

    const form = new FormData()   
    form.append('username', loginParam.email)
    form.append('password', loginParam.password)

    const res = await axios.post(`${host}/login`, form, header)

    return res.data
}

export const signupMember = async (member) => {
    const header = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const res = await axios.post(`${host}/`, member, header);
    return res.data;
}

export const modifyMember = async (member, mno) => {
    if (!mno) {
        throw new Error("Member number (mno) is required");
    }
    const res = await jwtAxios.put(`${host}/${mno}`, member);
    return res.data;
}

export const checkPassword = async (member) => {
    
    const header = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = {
        mno: member.mno,
        password: member.password
    }

    const res = await axios.post(`${host}/checkPassword`, body, header)

    return res.data
}

export const removeMember = async (mno) => {
    if (!mno) {
        throw new Error("Member number (mno) is required");
    }
    const res = await jwtAxios.delete(`${host}/${mno}`);
    return res.data;
}

export const uploadProfileImage = async (mno, imageFile) => {
    if (!mno) {
        throw new Error("Member number (mno) is required");
    }


    const formData = new FormData();
    formData.append("mno", mno);
    formData.append("file", imageFile);
    const header = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }

    const res = await axios.post(`${API_SERVER_HOST}/api/profiles/image/`, formData, header);
    return res.data;
}

export const getProfileImage = async (mno) => {
    if (!mno) {
        throw new Error("Member number (mno) is required");
    }

    const res = await axios.get(`${API_SERVER_HOST}/api/profiles/image/${mno}`);
    return res.data;
}

export const getMember = async (mno) => {
    const res = await axios.get(`${host}/${mno}`);
    return res.data;
}