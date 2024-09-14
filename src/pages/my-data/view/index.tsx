import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, ScrollView, Alert } from "react-native";
import { TextInput } from "@react-native-material/core";

import { ButtonText, HeaderPage } from '../../../components'

import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { UserUpdateForm } from "../../../interfaces";
import { useAuth } from "../../../hooks/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "./styled";
import { Mask, Masks, useMaskedInputProps } from "react-native-mask-input";
import { SearchLocation } from "../../../services";
import { styles } from './styles';
import { LoaddingView } from "../../common/loadding";

type RootStackParamList = {
    Perfil: undefined;
};

interface MaskedInputProps {
    value: string;
    onChange: (...event: any[]) => void;
    mask: Mask | undefined;
}
  
type MyDataScreenProp = StackNavigationProp<RootStackParamList>;

const MyDataView = () => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [validZip, setValidZip] = useState<{isValid: boolean; message: string;}>();
    const { control, handleSubmit, setValue, getValues,  formState: { errors }, watch } = useForm<UserUpdateForm>();
    const navigation = useNavigation<MyDataScreenProp>();
    const { user, updateUser, loading } = useAuth();
    const maskedInputProps = ({value, onChange, mask}: MaskedInputProps) => useMaskedInputProps({
        value: value,
        onChangeText: onChange,
        mask: mask,
    });

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

    const onSubmit: SubmitHandler<UserUpdateForm> = async (data) => {
        if(validZip?.isValid) {
            // setEditMode(false)
            const response = await updateUser(data);
            if (response === 'OK') {
                navigation.navigate('Perfil')
                Alert.alert(
                    'Deu tudo certo!',
                    'Seus dados foram atualizados.',
                    [
                        {text: 'Ok', onPress: () => setEditMode(false)},
                    ],
                )
            } else {
                Alert.alert(
                    'Oops! Houve um problema.',
                    'Você pode tentar novamente.',
                    [
                      {text: 'Ok'},
                    ],
                );
            }
        }
    };

    useEffect(() => {
        if (user) {
            setValue('uuid', user.uuid)
            setValue('cep', user.cep)
            setValue('name', user.name)
            setValue('city', user.city)
            setValue('state', user.state)
            setValue('telephone', user.telephone ? user.telephone : '')
            setValidZip({
                isValid: true,
                message: ''
            })
        }
    }, [])


    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
        }}>
            <HeaderPage onBack={() => navigation.navigate('Perfil')} title={"Meus dados"}/>
                <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                {loading ?
                    <LoaddingView />
                : 
                    !editMode ?
                        <View style={styles().main}>
                            <Text style={styles().titleDivisorArea} >Informações {user?.type === 'ATHLETE' ? 'pessoais' : 'da assessoria'}</Text>
                            <TextInput
                                editable={false}
                                value={user?.name} 
                                color="#217DE9"
                                variant="outlined"
                                label="Nome"
                                style={styles().textInput}
                                inputStyle={styles().input}/>
                            <TextInput
                                editable={false}
                                value={user?.telephone} 
                                color="#217DE9"
                                variant="outlined"
                                label="Telefone"
                                style={styles().textInput}
                                inputStyle={styles().input}/>
                            <TextInput
                                editable={false}
                                value={user?.state} 
                                variant="outlined"
                                label="Estado"
                                style={styles().textInput}
                                inputStyle={styles().input}/>
                            <TextInput
                                editable={false}
                                value={user?.type === 'ADVISOR' ? 'Assessoria' : 'Atleta'}
                                variant="outlined"
                                label="Tipo de usuário"
                                style={styles().textInput}
                                inputStyle={styles().input}/>
                            <TextInput
                                editable={false}
                                value={user?.birthDate} 
                                variant="outlined"
                                label="Data de nascimento"
                                style={styles().textInput}
                                inputStyle={styles().input}/>
                            <Text style={styles().titleDivisorArea}>Endereço</Text>
                            <TextInput
                                editable={false}
                                value={user?.cep} 
                                variant="outlined"
                                label="CEP"
                                style={styles().textInput}
                                inputStyle={styles().input}/>
                            <TextInput
                                editable={false}
                                value={user?.city} 
                                variant="outlined"
                                label="Cidade"
                                style={styles().textInput}
                                inputStyle={styles().input}/>
                            <TextInput
                                editable={false}
                                value={user?.state} 
                                variant="outlined"
                                label="Estado"
                                style={styles().textInput}
                                inputStyle={styles().input}/>
                            <Text style={styles().titleDivisorArea}>Conta</Text>
                            <TextInput
                                editable={false}
                                value={user?.email} 
                                variant="outlined"
                                placeholder="example@example.com"
                                color="#217DE9"
                                label="E-mail"
                                style={styles().textInput}
                                inputStyle={styles().input}
                                leadingContainerStyle={{
                                    borderWidth: 2,
                                }}/>
                            <View style={{
                                width: '100%',
                                alignItems: 'center',
                                marginTop: 10,
                            }}>
                                <ButtonText
                                    onPress={() => setEditMode(true)}  
                                    type={"LITTLE"} text={"Editar dados"} />
                            </View>
                        </View> :
                        <View style={styles().main}>
                            <Text style={styles().titleDivisorArea} >Informações {user?.type === 'ATHLETE' ? 'pessoais' : 'da assessoria'}</Text>
                            <Controller
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Campo obrigatório'
                                    },
                                    minLength: {
                                        value: user?.type === 'ATHLETE' ? 15 : 8,
                                        message: user?.type === 'ATHLETE' ? 'Insira seu nome completo' : 'O nome deve conter pelo menos 8 caracteres',
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        autoFocus
                                        placeholder="Informe o novo nome"
                                        defaultValue={user?.name}
                                        onChangeText={onChange}
                                        onBlur={onBlur} 
                                        value={value}
                                        label="Nome"
                                        variant="outlined"
                                        color="#217DE9"
                                        style={styles().textInput}
                                        inputStyle={styles().input} />
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
                                        variant="outlined"
                                        color="#217DE9"
                                        label="Telefone"
                                        placeholder="Informe o novo telefone"
                                        style={styles().textInput}
                                        inputStyle={styles().input} />)}
                                name="telephone"
                            />
                            {errors.telephone && <ErrorMessage>{errors.telephone.message}</ErrorMessage>}
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
                                        defaultValue={user?.cep}
                                        placeholder="Informe o novo CEP"
                                        color="#217DE9"
                                        label="CEP"
                                        style={styles().textInput}
                                        inputStyle={styles().input} />
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
                                        defaultValue={user?.city}
                                        value={value} 
                                        variant="outlined"
                                        color="#217DE9"
                                        label="Cidade"
                                        style={styles().textInput}
                                        inputStyle={styles().input} />
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
                                        defaultValue={user?.state}
                                        value={value} 
                                        variant="outlined"
                                        color="#217DE9"
                                        label="Estado"
                                        style={styles().textInput}
                                        inputStyle={styles().input} />
                                )}
                                name="state"
                            />
                            <View style={{
                                width: '100%',
                                alignItems: 'center',
                                marginTop: 10,
                            }}>
                                <ButtonText
                                    onPress={handleSubmit(onSubmit)}
                                    type={"LITTLE"} text={"Salvar"} />
                                <ButtonText
                                    onPress={() => setEditMode(false)}
                                    type={"LITTLE"} text={"Cancelar"} />
                            </View>
                        </View>
                    }
                </ScrollView>
                </SafeAreaView>
        </View>
    );
}

export {MyDataView}