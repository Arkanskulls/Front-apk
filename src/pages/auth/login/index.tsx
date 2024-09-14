import React from "react";
import { Image, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';
import { ButtonText } from '../../../components'
import LogoR from '../../../assets/img/logo-r.png';
import { styles } from './styles';
import { Entypo, FontAwesome } from '@expo/vector-icons'; 
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {useAuth} from "../../../hooks/auth";
import {LoginForm} from '../../../interfaces';

import { ErrorMessage,  } from "../../auth/create-account/styled";
import {
    WrapperLogo,
    WrapperForm,
    WrapperButton,
} from './styled';

type RootStackParamList = {
    CreateAccount: undefined;
    TypeEmail: undefined;
};
  
type LoginScreenProp = StackNavigationProp<RootStackParamList>;

const Login = () => {

    const navigation = useNavigation<LoginScreenProp>();
    const { signIn } = useAuth();
    const { control, handleSubmit, formState: { errors }, } = useForm<LoginForm>();

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        await signIn(data)
    }

    const onForgot = () => {
        Alert.alert(
            'Redefinir senha',
            'Vamos solicitar seu e-mail de login para seguir com o processo.',
            [
                {text: 'Cancelar'},
                {text: 'Ok', onPress: () => {navigation.navigate('TypeEmail')}}
            ],
        );
    }

    return (
        <React.Fragment>
            <View style={styles().main}>
                <KeyboardAvoidingView  style={styles().main} keyboardVerticalOffset={-500} behavior="padding">
                    <WrapperLogo>
                        <Image source={LogoR}/>
                        <Text style={styles().textTileWithLogo}>unBuddy</Text>
                    </WrapperLogo>
                    <WrapperForm>
                        <Text style={ styles().textTitle}>Login</Text>
                        <View style={styles().textInput}>
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
                                    <>
                                        <Entypo size={28} name="mail" style={styles().passwordSynbolMargin}  />
                                        <TextInput
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            keyboardType="email-address"
                                            style={styles().backgroundText}
                                            placeholder="E-mail"
                                            placeholderTextColor="#919191" />
                                    </>
                                )}
                                name="email"
                                />
                        </View>
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                        <View style={styles().textInput}>
                            <Controller
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Campo obrigatório'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'A senha deve conter pelo menos 6 caracteres'
                                    }
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <>
                                        <FontAwesome size={30} name="lock" style={styles().emailSymbolMargin}  />
                                        <TextInput 
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            secureTextEntry={true}
                                            style={styles().backgroundText}
                                            placeholder="Senha"
                                            placeholderTextColor="#919191" />
                                    </>
                                )}
                                name="password"
                            />
                        </View>
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        <TouchableOpacity>
                            <Text onPress={() => onForgot()} style={styles().textLink}>Esqueceu sua senha?</Text>
                        </TouchableOpacity>
                    </WrapperForm>
                    <WrapperButton>
                        <ButtonText onPress={handleSubmit(onSubmit)} type="BIG" text="ENTRAR"/>
                    </WrapperButton>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                        <Text style={styles().textLink}>Ainda não possui uma conta?</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </React.Fragment>
    );
}

export {Login}