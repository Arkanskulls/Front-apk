import React, { useState, useEffect } from "react";
import { Text, View, KeyboardAvoidingView, SafeAreaView, ScrollView, Alert } from "react-native";
import { TextInput } from "@react-native-material/core";
import { createNumberMask, Mask, Masks, useMaskedInputProps } from 'react-native-mask-input';
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { ButtonText, HeaderPage } from '../../../components'
import { styles } from './styles';
import { LoaddingView } from '../../common/loadding';
import { VerificationCodeForm } from '../../../interfaces';

import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { verifyCode } from "../../../services";
import api from "../../../services/api";

interface MaskedInputProps {
    value: string;
    onChange: (...event: any[]) => void;
    mask: Mask | undefined;
}

const dollarMask = createNumberMask({
    precision: 2,
  })

type RootStackParamList = {
    TypeEmail: undefined;
    NewPass: {email: string} | undefined;
};

type ParamList = {
    email: string;
};
  
type VerificationCodeScreenProp = StackNavigationProp<RootStackParamList>;

const VerificationCode = () => {

    const navigation = useNavigation<VerificationCodeScreenProp>();
    const { params } = useRoute();
    const { email } = params as ParamList;
    const { control, handleSubmit, formState: { errors }, } = useForm<VerificationCodeForm>();
    const [loading, setLoading] = useState(false);
    
    const onSubmit: SubmitHandler<VerificationCodeForm> = async (data) => {
        try {
            setLoading(true);
            const response = await verifyCode({
                email: email,
                code: data.code,
            });
            if(response.status === 200) {
                api.defaults.headers['Authorization'] = `Bearer ${response.data}`;
                return navigation.navigate('NewPass', {
                    email: email,
                });
            } else {
                setLoading(false)
                return Alert.alert(
                    'Oops! Houve um problema.',
                    'Você pode tentar novamente.',
                    [
                        {text: 'Tentar novamente!'},
                    ],
                );
            }
        } catch (error) {
            setLoading(false)
            return Alert.alert(
                'Oops! Houve um problema.',
                'Você pode tentar novamente.',
                [
                    {text: 'Tentar novamente!'},
                ],
            );
        }
    };

    const maskedInputProps = ({value, onChange, mask}: MaskedInputProps) => useMaskedInputProps({
        value: value,
        onChangeText: onChange,
        mask: mask,
    });

    return (
        <React.Fragment>
            <HeaderPage onBack={() => navigation.navigate('TypeEmail')} title={"Redefinir senha"}/>
            {loading ?
                <LoaddingView /> :
                <KeyboardAvoidingView style={styles().keybordViewPage} behavior="padding" enabled keyboardVerticalOffset={-500}>
                    <SafeAreaView style={styles().main}>
                    <View style={styles().wrapperInfo}>
                        <Text style={styles().textInfo} >
                            Enviamos um código para o e-mail
                        </Text>
                        <Text style={styles().textEmail} >
                            {email}
                        </Text>
                    </View>
                    <View style={styles().viewTextInput}>
                        <Text style={styles().textInfoInput} >
                            Insira o código abaixo:
                        </Text>
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Campo obrigatório.'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'O código deve conter 6 dígitos.'
                                },
                                pattern: {
                                    value:  /^[0-9]*$/,
                                    message: 'O código deve conter apenas números.'
                                },
                                
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput {...maskedInputProps(
                                    {onChange: onChange, value: value, mask: undefined})} 
                                    textAlign={'center'}
                                    onChangeText={onChange}
                                    onBlur={onBlur} 
                                    keyboardType="number-pad"
                                    variant="outlined"
                                    color="#217DE9"
                                    label="Código de verificação"
                                    style={styles().textInput} />)}
                            name="code"
                        />
                        {errors.code && <Text style={styles().error}>{errors.code.message}</Text>}
                    </View>
                    <View style={styles().wrapperButton}>
                        <ButtonText onPress={handleSubmit(onSubmit)} type={"LITTLE"} text={"Prosseguir"} />
                    </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            }
        </React.Fragment>
    );
}

export {VerificationCode}