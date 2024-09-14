import api from "./api";

interface DirectMailProps {
    message: string;
    advisorUuid: string;
    athleteEmail: string;
    trainingUuid: string;
}

const directMail = async (data: DirectMailProps) => {
    try {
        const response = await api.post(`https://creepy-tights-lion.cyclic.app/advisor-communication/send-email-direct`, data)
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

interface SuitecaseMailProps {
    message: string;
    advisorUuid: string;
    trainingUuid: string;
}

const suitecaseMail = async (data: SuitecaseMailProps) => {
    try {
        const response = await api.post(`https://creepy-tights-lion.cyclic.app/advisor-communication/send-email-suitecase`, data)
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

export {
    directMail,
    suitecaseMail,
}

