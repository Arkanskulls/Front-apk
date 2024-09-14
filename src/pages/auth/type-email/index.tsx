import React, { useState } from "react";
import { Text, View, KeyboardAvoidingView, SafeAreaView, Alert } from "react-native";
import { TextInput } from "@react-native-material/core";
import { Mask, Masks, useMaskedInputProps } from 'react-native-mask-input';
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { ButtonText, HeaderPage } from '../../../components';
import { sendCode } from "../../../services";
import { styles } from './styles';
import { LoaddingView } from '../../common/loadding';

import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

interface MaskedInputProps {
    value: string;
    onChange: (...event: any[]) => void;
    mask: Mask | undefined;
}

type RootStackParamList = {
    Login: undefined;
    VerificationCode: {email: string} | undefined;
};
  
type VerificationCodeScreenProp = StackNavigationProp<RootStackParamList>;

const TypeEmail = () => {

    const navigation = useNavigation<VerificationCodeScreenProp>();
    const { control, handleSubmit, formState: { errors }, } = useForm<{
        email: string;
    }>();
    const [loading, setLoading] = useState(false)
    
    const onSubmit: SubmitHandler<{
        email: string
    }> = async (data) => {
        try {
            setLoading(true)
            const response = await sendCode(data);
            if(response.status === 200) {
                return Alert.alert(
                    'Te enviamos um código!',
                    'Verifique em seu e-mail para inseri-lo na próxima página.',
                    [
                        {text: 'Cancelar', onPress: () => {
                            setLoading(false);
                        }},
                        {text: 'Continuar', onPress: () =>
                            {
                                setLoading(false);
                                navigation.navigate('VerificationCode', {
                                    email: data.email
                                });
                            }
                        }
                    ],
                );

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
            <HeaderPage onBack={() => navigation.navigate('Login')} title={"Redefinir senha"}/>
            {loading ?
                <LoaddingView /> : 
                <KeyboardAvoidingView style={styles().keybordViewPage} behavior="padding" enabled keyboardVerticalOffset={-500}>
                    <SafeAreaView style={styles().main}>
                    <View style={styles().wrapperInfo}>
                    </View>
                    <View style={styles().viewTextInput}>
                        <Text style={styles().textInfoInput} >
                            Insira seu E-mail de login abaixo:
                        </Text>
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
                                <TextInput {...maskedInputProps(
                                    {onChange: onChange, value: value, mask: undefined})}
                                    onChangeText={onChange}
                                    onBlur={onBlur} 
                                    keyboardType="email-address"
                                    variant="outlined"
                                    color="#217DE9"
                                    placeholder="example@example.com"
                                    label="E-mail"
                                    style={styles().textInput} />)}
                            name="email"
                        />
                        {errors.email && <Text style={styles().error}>{errors.email.message}</Text>}
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

export {TypeEmail}