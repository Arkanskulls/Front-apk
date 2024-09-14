import api from "./api";
import {UserForm, LoginForm, UserUpdateForm} from '../interfaces';
import { Platform } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const createAccount = async (data: UserForm) => {
    try {
        const response = await api.post(`account`, data)
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

const login = async (data: LoginForm) => {
    try {
        const response = await api.post(`account/login`, data)
        return response;
    } catch (error: any) {
        return error;
    }
}

const isVerified = async ({uuid}: {uuid: string}) => {
    try {
        const response = await api.get(`account-verify/is-verified/${uuid}`)
        return 'OK';
    } catch (error) {
        return 'NOT VERIFIED';
    }
}

const sendLink = async ({uuid}: {uuid: string}) => {
    try {
        const response = await api.put(`account/resend-link/${uuid}`)
        return response;
    } catch (error) {
        return error;
    }
}

const updateUser = async (data: UserUpdateForm) => {
    try {
        const response = await api.patch(`account/${data.uuid}`, data)
        return response;
    } catch (error: any) {
        return error;
    }
}

const deactivateAccount = async ({uuid}: {uuid: string}) => {
    try {
        const response = await api.delete(`account/deactivate/${uuid}`)
        return response;
    } catch (error: any) {
        return error;
    }
}

interface DeleteAccountProps {
    email: string;
    password: string;
}

const deleteAccount = async (data: DeleteAccountProps) => {
    try {
        const response = await api.delete(`account/delete-cascade`, {
            data: data
        })
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}


const uploadImage = async ({src, uuid}: {src: any, uuid: string}) => {
    try {
        const data = new FormData();
        const token = await AsyncStorage.getItem('@RBuddyAuth:token');
        data.append('img', {
            uri: Platform.OS === 'android' ? src.uri : 'file://' + src.uri,
            name: 'image',
            type: 'image/jpeg',
        });
        const response = await axios({
            method: "POST",
            url: `https://creepy-tights-lion.cyclic.app/account/photo-upload/${uuid}`,
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${token}`,
              
            },
            transformRequest: formData => formData,
            data,
        });
        return response;
    } catch (error: any) {
        return error;
    }
}

const refreshToken = async (data: {accountUuid: string, refreshToken: string}) => {
    try {
        const response = await api.post(`account/refresh-token`, data)
        return response;
    } catch (error: any) {
        return error;
    }
}




export {
    createAccount,
    deleteAccount,
    login, 
    isVerified, 
    sendLink,
    uploadImage,
    updateUser,
    deactivateAccount,
    refreshToken,
}