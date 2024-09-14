import React, { useState, useEffect } from "react";
import { Text, View, KeyboardAvoidingView, SafeAreaView, ScrollView, Alert, BackHandler } from "react-native";
import { TextInput } from "@react-native-material/core";
import { Mask, Masks, useMaskedInputProps } from 'react-native-mask-input';
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { ButtonText, HeaderPage } from '../../../components'
import { styles } from './styles';
import { LoaddingView } from '../../common/loadding';
import { NewPassForm } from '../../../interfaces';

import { updatePass } from "../../../services";
import { useAuth } from "../../../hooks/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface MaskedInputProps {
    value: string;
    onChange: (...event: any[]) => void;
    mask: Mask | undefined;
}

type RootStackParamList = {
    Perfil: undefined;
};

type DeleteScreenProp = StackNavigationProp<RootStackParamList>;

const DeleteAccount = () => {

    const navigation = useNavigation<DeleteScreenProp>();
    const { deleteAccountFluxo, loading } = useAuth();
    const { control, handleSubmit, formState: { errors }, watch } = useForm<NewPassForm>();
    
    const onSubmit: SubmitHandler<NewPassForm> = async (data) => {
        await deleteAccountFluxo(data.password);
    };

    return (
        <React.Fragment>
            <HeaderPage onBack={() => navigation.navigate('Perfil')} title={"Deletar conta"}/>
            {loading ?
                <LoaddingView /> :
                <KeyboardAvoidingView style={styles().keybordViewPage} behavior="padding" enabled keyboardVerticalOffset={-500}>
                    <SafeAreaView style={styles().main}>
                    <View style={styles().wrapperForm}>
                        <Text style={styles().textInfoInput} >
                            Informe sua senha para deletar sua conta no RunBuddy:
                        </Text>
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Campo obrigatório'
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput 
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value} 
                                    secureTextEntry={true}
                                    variant="outlined"
                                    color="#217DE9"
                                    label="Nova senha*"
                                    style={styles().textInput} />
                            )}
                            name="password"
                        />
                        {errors.password && <Text style={styles().error}>{errors.password.message}</Text>}
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Campo obrigatório'
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
                        {errors.confirmPassword && <Text style={styles().error}>{errors.confirmPassword.message}</Text>}
                    </View>
                    <View style={styles().wrapperButton}>
                        <ButtonText onPress={handleSubmit(onSubmit)} type={"LITTLE"} text={"Deletar"} />
                    </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            }
        </React.Fragment>
    );
}

export {DeleteAccount}

