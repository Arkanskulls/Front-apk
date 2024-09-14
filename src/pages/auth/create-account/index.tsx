import React, { useState, useEffect } from "react";
import { Text, View, KeyboardAvoidingView, SafeAreaView, ScrollView, Alert } from "react-native";
import { TextInput } from "@react-native-material/core";
import { Mask, Masks, useMaskedInputProps } from 'react-native-mask-input';
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { ButtonText, RadioButton, HeaderPage } from '../../../components'
import { styles } from './styles';
import { LoaddingView } from '../../common/loadding';
import { UserForm } from '../../../interfaces';
import { SearchLocation } from '../../../services';

import {
    WrapperRadioButtons,
    WrapperButton,
    ErrorMessage
} from './styled';
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../hooks/auth";

interface MaskedInputProps {
    value: string;
    onChange: (...event: any[]) => void;
    mask: Mask | undefined;
}

type RootStackParamList = {
    Login: undefined;
    EmailVerify: undefined;
};
  
type CreateAccountScreenProp = StackNavigationProp<RootStackParamList, 'EmailVerify'>;

const CreateAccount = () => {

    const navigation = useNavigation<CreateAccountScreenProp>();
    const { loading, createUser } = useAuth();
    const { control, handleSubmit, setValue, getValues,  formState: { errors }, watch, setError } = useForm<UserForm>();
    const [typeUser, setTypeUser] = useState<'athlete' | 'advisor'>('athlete');
    const [validZip, setValidZip] = useState<{isValid: boolean; message: string;}>();
    
    const onSubmit: SubmitHandler<UserForm> = async (data) => {
        validateDateUser()
        if(validZip?.isValid) {
            return await createUser(data);
        }
    };

    const maskedInputProps = ({value, onChange, mask}: MaskedInputProps) => useMaskedInputProps({
        value: value,
        onChangeText: onChange,
        mask: mask,
    });

    const validateDateUser = () => {
        if(getValues('birthDate').length === 10) {
            if (typeUser === 'athlete') {
                const actualYear = new Date().getFullYear()
                const year = Number(getValues('birthDate').substring(6));
                if (actualYear - year < 18) {
                    setError('birthDate', {
                        message: 'O atleta deve ser maior de idade'
                    })
                }
            }
        }
    }

    const handleZipCodeInput = async () => {
        const zipCode = getValues('cep');
        if(zipCode && zipCode.length === 9) {
            try {
                const response = await SearchLocation({cep: zipCode.replace('-', '')})
                if(response.erro) {
                    setValidZip({
                        isValid: false,
                        message: 'Localização não identificada, verifique seu CEP.'
                    })
                    setValue('city', '')
                    setValue('state', '')
                } else {
                    setValidZip({
                        isValid: true,
                        message: ''
                    })
                    setValue('city', response.localidade)
                    setValue('state', response.uf)
                }
            } catch (error) {
            }
        }
    }
    
    useEffect(() => {
        setValue('type', 'ATHLETE');
    }, [])

    return (
        <View style={{
            flex: 1,
        }}>
            {loading ?
                <LoaddingView />
               :
               <>
                <HeaderPage onBack={() => navigation.navigate('Login')} title={'Cadastro'}/>
                <KeyboardAvoidingView style={styles().keybordViewPage} behavior="padding" enabled keyboardVerticalOffset={-500}>
                    <SafeAreaView>
                    <ScrollView>
                            <View style={styles().main}>
                                <WrapperRadioButtons>
                                    <RadioButton label={"Atleta"} selected={typeUser === 'athlete'} onPress={() => {setTypeUser('athlete'); setValue('type', 'ATHLETE')}}/>
                                    <RadioButton label={"Assessoria"} selected={typeUser === 'advisor'} onPress={() => {setTypeUser('advisor'); setValue('type', 'ADVISOR')}}/>
                                </WrapperRadioButtons>
                                <Text style={styles().titleDivisorArea} >Informações {typeUser === 'athlete' ? 'pessoais' : 'da assessoria'}</Text>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Campo obrigatório'
                                        },
                                        minLength: {
                                            value: typeUser === 'athlete' ? 15 : 8,
                                            message: typeUser === 'athlete' ? 'Insira seu nome completo' : 'O nome deve conter pelo menos 8 caracteres',
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            onChangeText={onChange}
                                            onBlur={onBlur} 
                                            value={value}
                                            variant="outlined"
                                            color="#217DE9"
                                            label={typeUser === 'athlete' ? 'Nome completo*' : 'Nome da assessoria*'}
                                            style={styles().textInput} />
                                    )}
                                    name="name"
                                />
                                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                                <Controller
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Campo obrigatório'
                                        },
                                        minLength: {
                                            value: 15,
                                            message: 'Insira um telefone válido'
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: 'Insira um telefone válido'
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput {...maskedInputProps(
                                            {onChange: onChange, value: value, mask: Masks.BRL_PHONE})} 
                                            onBlur={onBlur}
                                            keyboardType="phone-pad"
                                            variant="outlined" placeholder="(99) 99999-9999"
                                            color="#217DE9"
                                            label="Telefone*"
                                            style={styles().textInput} />)}
                                    name="telephone"
                                />
                                {errors.telephone && <ErrorMessage>{errors.telephone.message}</ErrorMessage>}
                                <Controller
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Campo obrigatório'
                                        },
                                        minLength: {
                                            value: 10,
                                            message: 'Insira uma data válida'
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: 'Insira uma data válida'
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput {...maskedInputProps(
                                            {onChange: onChange, value: value, mask: Masks.DATE_DDMMYYYY})}
                                            onBlur={() => {onBlur; validateDateUser()}}
                                            keyboardType="number-pad"
                                            variant="outlined"
                                            placeholder="DD/MM/AAAA"
                                            color="#217DE9"
                                            label={typeUser === 'athlete' ? 'Data de nascimento*' : 'Data de fundação*'}
                                            style={styles().textInput} />
                                    )}
                                    name="birthDate"
                                />
                                {errors.birthDate && <ErrorMessage>{errors.birthDate.message}</ErrorMessage>}
                                <Text style={styles().titleDivisorArea}>Endereço</Text>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Campo obrigatório'
                                        },
                                        minLength: {
                                            value: 9,
                                            message: 'Insira um CEP válido'
                                        },
                                        maxLength: {
                                            value: 9,
                                            message: 'Insira um CEP válido'
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput {...maskedInputProps(
                                            {onChange: onChange, value: value, mask: Masks.ZIP_CODE})}
                                            onBlur={() => handleZipCodeInput()}
                                            keyboardType='number-pad'
                                            variant="outlined"
                                            placeholder="00000-000"
                                            color="#217DE9"
                                            label="CEP*"
                                            style={styles().textInput} />
                                    )}
                                    name="cep"
                                />
                                {errors.cep && <ErrorMessage>{errors.cep.message}</ErrorMessage>}
                                {validZip?.isValid === false && <ErrorMessage>{validZip?.message}</ErrorMessage>}
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput 
                                            editable={false} selectTextOnFocus={false}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value} 
                                            variant="outlined"
                                            color="#217DE9"
                                            label="Cidade"
                                            style={styles().textInput} />
                                    )}
                                    name="city"
                                />
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput 
                                            editable={false} selectTextOnFocus={false}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value} 
                                            variant="outlined"
                                            color="#217DE9"
                                            label="Estado"
                                            style={styles().textInput} />
                                    )}
                                    name="state"
                                />
                                <Text style={styles().titleDivisorArea}>Conta</Text>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Campo obrigatório'
                                        },
                                        minLength: {
                                            value: 10,
                                            message: 'Insira um e-mail válido'
                                        },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Insira um e-mail válido'
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value} 
                                            keyboardType="email-address"
                                            variant="outlined"
                                            placeholder="example@example.com"
                                            color="#217DE9"
                                            label="E-mail*"
                                            style={styles().textInput} />
                                    )}
                                    name="email"
                                />
                                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                                <Controller
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Campo obrigatório'
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'A senha deve conter pelo menos 8 caracteres'
                                        }
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput 
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value} 
                                            secureTextEntry={true}
                                            variant="outlined"
                                            color="#217DE9"
                                            label="Senha para login*"
                                            style={styles().textInput} />
                                    )}
                                    name="password"
                                />
                                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                                <Controller
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Campo obrigatório'
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'A senha deve conter pelo menos 8 caracteres'
                                        },
                                        validate:  (val: string) => {
                                            if (watch('password') != val) {
                                              return "As senhas não estão iguais";
                                            }
                                        }
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput 
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value} 
                                            secureTextEntry={true}
                                            variant="outlined"
                                            color="#217DE9"
                                            label="Confirmar senha*"
                                            style={styles().textInput} />
                                    )}
                                    name="confirmPassword"
                                />
                                {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
                                <WrapperButton>
                                    <ButtonText onPress={handleSubmit(onSubmit)} type={"BIG"} text={"RUN!"} />
                                </WrapperButton>
                            </View>
                    </ScrollView>
                    </SafeAreaView>
                </KeyboardAvoidingView>
               </> 
            }
        </View>
    );
}

export {CreateAccount}