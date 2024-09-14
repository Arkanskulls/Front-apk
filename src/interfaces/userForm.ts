export interface UserForm {
    type: 'ATHLETE' | 'ADVISOR';
    name: string;
    email: string;
    birthDate: string;
    password: string;
    cep: string;
    state: string;
    city: string;
    telephone: string;
    confirmPassword: string;
}

export interface UserUpdateForm {
    uuid: string;
    name: string;
    cep: string;
    city: string;
    state: string;
    telephone: string;
}

export interface VerificationCodeForm {
    code: string;
}

export interface NewPassForm {
    password: string;
    confirmPassword: string;
}

