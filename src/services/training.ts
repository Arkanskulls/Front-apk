import api from "./api";
import { TrainingCompleteForm } from "../interfaces";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const createTraining = async (data: TrainingCompleteForm) => {
    try {
        const response = await api.post(`advisor-training`, data)
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

const uploadTrainingImage = async ({src, uuid, trainingUuid}: {src: string, uuid: string, trainingUuid: string}) => {
    try {
        const data = new FormData();
        const token = await AsyncStorage.getItem('@RBuddyAuth:token');
        data.append('img', {
            uri: Platform.OS === 'android' ? src : 'file://' + src,
            name: 'image',
            type: 'image/jpeg',
        });
        const response = await axios({
            method: "POST",
            url: `https://creepy-tights-lion.cyclic.app/advisor-training/photo-upload/${uuid}/${trainingUuid}`,
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${token}`,
              
            },
            transformRequest: formData => formData,
            data,
        });
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

const listAdvisorWorkouts = async ({ uuid, is_active, page }: { uuid: string, is_active: boolean, page?: number }) => {
    try {
        const response = (await api.get(`advisor-training/find-by-advisor-uuid?advisorUuid=${uuid}${page ? `&page=`+page : `&page=1`  }&size=5`, {
            headers: {
                'is_active': is_active ? 'true': 'false',
                'advisorUuid': uuid,
            },
        }))
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

const updateTraining = async ({uuid, trainingUuid, data}: {uuid: string, trainingUuid: string, data: TrainingCompleteForm}) => {
    try {
        const response = await api.put(`advisor-training/update/${uuid}/${trainingUuid}`, data)
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

const loadAthletesOnTraining = async ({trainingUuid}: {trainingUuid: string}) => {
    try {
        const response = await api.get(`advisor-training/find-athletes-enrolled-in-training/${trainingUuid}`)
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

const suspendedTraining = async ({trainingUuid, advisorUuid}: {trainingUuid: string; advisorUuid: string}) => {
    try {
        const response = await api.patch(`advisor-training/suspended-training/${trainingUuid}/${advisorUuid}`)
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

const reactivateTraining = async ({trainingUuid, advisorUuid}: {trainingUuid: string; advisorUuid: string}) => {
    try {
        const response = await api.patch(`advisor-training/reactivate-training/${trainingUuid}/${advisorUuid}`)
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

export {
    createTraining,
    uploadTrainingImage,
    listAdvisorWorkouts,
    updateTraining,
    loadAthletesOnTraining,
    suspendedTraining,
    reactivateTraining,
}