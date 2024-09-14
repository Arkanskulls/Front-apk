import api from "./api";

const listWorkouts = async ({cep, page}: {cep: string; page?: number}) => {
    try {
        const response = (await api.get(`https://creepy-tights-lion.cyclic.app/athlete-training/filter?cep=${cep}${page ? `&page=`+page : `&page=1`  }&size=5`, {
            headers: {
                'is_active': true,
            },
        }))
        return response;
    } catch (error: any) {
        return error;
    }
}

interface RegisterWorkoutProps {
    trainingUuid: string;
    athleteUuid: string;
}

const registerWorkout = async (data: RegisterWorkoutProps) => {
    try {
        const response = await api.post(`https://creepy-tights-lion.cyclic.app/athlete-training/sign-up`, data)
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

const listWorkoutsInscriptions = async ({athleteUuid, is_active, page}: {athleteUuid: string; is_active: boolean; page?: number}) => {
    try {
        const response = await api.get(`https://creepy-tights-lion.cyclic.app/athlete-training/get-trainings-of-athletes?athleteUuid=${athleteUuid}${page ? `&page=`+page : `&page=1`  }&size=10`, {
            headers: {
                'is_active': String(is_active),
            },
        })
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

export {
    listWorkouts,
    registerWorkout,
    listWorkoutsInscriptions,
}