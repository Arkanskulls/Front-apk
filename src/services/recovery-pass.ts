import api from "./api";

interface SendCodeProps {
    email: string;
}

interface VerifyCodeProps {
    email: string;
    code: string;
}

interface UpdatePassProps {
    email: string;
    newPassword: string;
}


const sendCode = async (data : SendCodeProps) => {
    try {
        const response = await api.post(`account/send-recover-pass`, data)
        return response;
    } catch (error: any) {
        return error;
    }
}

const verifyCode = async (data : VerifyCodeProps) => {
    try {
        const response = await api.post(`account/is-code-of-email`, data)
        return response;
    } catch (error: any) {
        return error;
    }
}

const updatePass = async (data : UpdatePassProps) => {
    try {
        const response = await api.post(`account/update-password`, data)
        return response;
    } catch (error: any) {
        return error;
    }
}

export {
    sendCode,
    verifyCode,
    updatePass,
}
