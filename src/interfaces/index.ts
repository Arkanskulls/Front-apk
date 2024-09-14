import {UserForm, VerificationCodeForm, NewPassForm, UserUpdateForm} from './userForm';
import {LoginForm} from './loginForm';

export interface TrainingForm {
    name: string;
    image: string;
    description: string;
    limitDateRegistration : string;
    startDate: string;
    startHour: string;
    vacancies: string;
}

export interface LocationForm {
    id?: string;
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
}

export interface TrainingCompleteForm {
    uuid?: string;
    name: string;
    description: string;
    advisorUuid: string;
    image?: string;
    imgLink?: string;
    price: number;
    limitDateRegistration: string;
    startDate: string;
    startHour: string;
    vacancies: string;
    startAddress: LocationForm;
    finishAddress: LocationForm;
    suportPoints: LocationForm[];
    isActive: boolean;
    athletes?: {
        name: string;
        email: string;
        telephone: string;
        imageLink?: string;
    }[]
}

export interface TrainingListCompleteForm {
    training: TrainingCompleteForm;
    advisor?: {
        name: string;
        email: string;
    };
}

export interface AthleteData {
    name: string;
    email: string;
    telephone: string;
}

export type {
    UserForm,
    VerificationCodeForm,
    LoginForm,
    NewPassForm,
    UserUpdateForm,
}

export interface LoadWorkoutsProps {
    is_active: boolean;
}

export interface AssessmentAdvisorProps {
    uuid: string;
    athlete: {
        name: string;
        email: string;
        imageLink: string;
    },
    comment?: string;
    advisorResponseComment?: string;
    athleteCanComment?: boolean;
    stars: number;
}

export interface DataAssessmentProps {
    isLoaded: boolean;
    data: AssessmentAdvisorProps[]
}
