import React, { useState, useEffect } from "react";
import { Text, View, KeyboardAvoidingView, SafeAreaView, ScrollView, Alert, BackHandler } from "react-native";
import { TextInput } from "@react-native-material/core";
import { Mask, Masks, useMaskedInputProps } from 'react-native-mask-input';
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { ButtonText, HeaderPage } from '../../../components'
import { styles } from './styles';
import { LoaddingView } from '../../common/loadding';
import { NewPassForm } from '../../../interfaces';

import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updatePass } from "../../../services";

interface MaskedInputProps {
    value: string;
    onChange: (...event: any[]) => void;
    mask: Mask | undefined;
}

type RootStackParamList = {
    Login: undefined;
};
  
type VerificationCodeScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

type ParamList = {
    email: string;
};

const NewPass = () => {

    const navigation = useNavigation<VerificationCodeScreenProp>();
    const { params } = useRoute();
    const { email } = params as ParamList;
    const { control, handleSubmit, formState: { errors }, watch } = useForm<NewPassForm>();
    const [loading, setLoading] = useState(false);
    
    const onSubmit: SubmitHandler<NewPassForm> = async (data) => {
        try {
            setLoading(true);
            const response = await updatePass({
                email: email,
                newPassword: data.password,
            });
            if(response.status === 200) {
                return Alert.alert(
                    'Senha atualizada com sucesso!',
                    'Façã seu login com as novas credenciais.',
                    [
                        {text: 'Fazer Login', onPress: () =>
                            {
                                setLoading(false);
                                navigation.navigate('Login');
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
                        {text: 'Cancelar', onPress: () => {
                            navigation.navigate('Login');
                        }},
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
                    {text: 'Cancelar', onPress: () => {
                        navigation.navigate('Login');
                    }},
                    {text: 'Tentar novamente!'},
                ],
            );
        }
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
      }, [])

    return (
        <React.Fragment>
            <HeaderPage title={"Nova senha"}/>
            {loading ?
                <LoaddingView /> :
                <KeyboardAvoidingView style={styles().keybordViewPage} behavior="padding" enabled keyboardVerticalOffset={-500}>
                    <SafeAreaView style={styles().main}>
                    <View style={styles().wrapperForm}>
                        <Text style={styles().textInfoInput} >
                            Informe a nova senha:
                        </Text>
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
                        {errors.confirmPassword && <Text style={styles().error}>{errors.confirmPassword.message}</Text>}
                    </View>
                    <View style={styles().wrapperButton}>
                        <ButtonText onPress={handleSubmit(onSubmit)} type={"LITTLE"} text={"Alterar"} />
                    </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            }
        </React.Fragment>
    );
}

export {NewPass}

