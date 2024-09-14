import api from "./api";

interface AdvisorAssessmentProps {
    advisorUuid: string;
    athleteUuid: string;
    comment: string;
    stars: number;
}

const advisorAssessment = async (data: AdvisorAssessmentProps) => {
    try {
        const response = await api.post(`https://creepy-tights-lion.cyclic.app/assessment`, data)
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

const loadAssessment = async ({advisorUuid}: {advisorUuid: string}) => {
    try {
        const response = await api.get(`https://creepy-tights-lion.cyclic.app/assessment/get-comments-and-stars/${advisorUuid}`)
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

interface VerifyAssessmentProps {
    advisorUuid: string;
    athleteUuid: string;
}

const verifyAssessment = async ({
    advisorUuid, athleteUuid,
}: VerifyAssessmentProps) => {
    try {
        const response = await api.get(`https://creepy-tights-lion.cyclic.app/assessment/get-by-athlete-and-advisor/${advisorUuid}/${athleteUuid}`)
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

interface UpdateAssessmentProps {
    assessmentUuid: string;
    athleteUuid: string;
    data: {
        stars: number;
        comment: string;
    }
}

const updateAssessment = async ({
    assessmentUuid, athleteUuid, data,
}: UpdateAssessmentProps) => {
    try {
        const response = await api.patch(`https://creepy-tights-lion.cyclic.app/assessment/update/${assessmentUuid}/${athleteUuid}`, data)
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

interface DeleteAssessmentProps {
    assessmentUuid: string;
    athleteUuid: string;
}

const getStarsAdvisor = async ({
    advisorUuid, 
}: {advisorUuid: string}) => {
    try {
        const response = await api.get('https://creepy-tights-lion.cyclic.app/assessment/get-stars/'+advisorUuid)
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

const deleteAssessment = async ({
    assessmentUuid, athleteUuid
}: DeleteAssessmentProps) => {
    try {
        const response = await api.delete(`https://creepy-tights-lion.cyclic.app/assessment/${assessmentUuid}/${athleteUuid}`)
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

interface AdvisorResponseProps {
    advisorUuid: string;
    assessmentUuid: string;
    response: string;
}

const advisorResponseAssessment = async (data: AdvisorResponseProps) => {
    try {
        const response = await api.post(`/assessment-advisor/create-or-update-response-assessment`, data)
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

interface DeleteCommentProps {
    advisorUuid: string;
    assessmentUuid: string;
}

const deleteAthleteComment = async (data: DeleteCommentProps) => {
    try {
        const response = await api.delete(`/assessment-advisor/delete-athlete-comment`, {
            data: data,
        })
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

const deleteAdvisorComment = async (data: DeleteCommentProps) => {
    try {
        const response = await api.delete(`/assessment-advisor/delete-response-assessment`, {
            data: data,
        })
        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

export {
    getStarsAdvisor,
    advisorAssessment,
    deleteAssessment,
    loadAssessment,
    updateAssessment,
    verifyAssessment,
    advisorResponseAssessment,
    deleteAthleteComment,
    deleteAdvisorComment,
}