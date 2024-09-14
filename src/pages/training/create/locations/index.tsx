import React, { useState, useEffect } from "react";
import uuid from 'react-native-uuid';
import { Text, View, SafeAreaView, ScrollView, Alert, Button } from "react-native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Mask, Masks, useMaskedInputProps } from "react-native-mask-input";

import { TextInput } from "@react-native-material/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";

import { ButtonText, HeaderPage } from '../../../../components'
import { LocationForm } from "../../../../interfaces";
import { SearchLocation } from "../../../../services";
import { ErrorMessage } from "./styled";
import { styles } from './styles';
import { useTraiining } from "../../../../hooks/training";

type RootStackParamList = {
    CreateTraining: {editMode?: boolean} | undefined;
};

interface MaskedInputProps {
    value: string;
    onChange: (...event: any[]) => void;
    mask: Mask | undefined;
}

type ParamList = {
    action: 'suportPoints' | 'startAddress' | 'finishAddress';
    editMode?: boolean;
};

const titleAddress = {
    suportPoints: 'Ponto de apoio',
    startAddress: 'Local de partida',
    finishAddress: 'Local de chegada',
}
  
type MyDataScreenProp = StackNavigationProp<RootStackParamList>;

const Locations = () => {

    const { params } = useRoute();
    const { handleTrainingObject, training, addSupportPoint } = useTraiining();
    const { action, editMode } = params as ParamList;
    const [validZip, setValidZip] = useState<{isValid: boolean; message: string;}>();
    const { control, handleSubmit, setValue, getValues,  formState: { errors }, watch } = useForm<LocationForm>();
    const navigation = useNavigation<MyDataScreenProp>();
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
                    if (response.bairro) {
                        setValue('neighborhood', response.bairro)
                    }
                    if (response.logradouro) {
                        setValue('street', response.logradouro)
                    }
                }
            } catch (error) {
            }
        }
    }

    const onSubmit: SubmitHandler<LocationForm> = async (data) => {
        if(validZip?.isValid) {
            switch(action){
                case 'startAddress':
                    handleTrainingObject({
                        ...training,
                        startAddress: data,
                    });
                    return navigation.navigate('CreateTraining');
                case 'finishAddress':
                    handleTrainingObject({
                        ...training,
                        finishAddress: data,
                    });
                    return navigation.navigate('CreateTraining');
                case 'suportPoints':
                    addSupportPoint({
                        id: uuid.v4().toString(),
                        ...data,
                    })
                    return navigation.replace('CreateTraining', {
                        editMode: editMode,
                    });
            }
        }

    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
        }}>
            <HeaderPage onBack={() => navigation.navigate('CreateTraining')} title={titleAddress[action]}/>
                <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles().main}>
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
                                    placeholder="Informe o CEP"
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
                                    value={value} 
                                    variant="outlined"
                                    color="#217DE9"
                                    label="Estado"
                                    style={styles().textInput}
                                    inputStyle={styles().input} />
                            )}
                            name="state"
                        />
                        <Controller
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Campo obrigatório'
                                },
                            }}
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value} 
                                    variant="outlined"
                                    color="#217DE9"
                                    label="Bairro"
                                    style={styles().textInput}
                                    inputStyle={styles().input} />
                            )}
                            name="neighborhood"
                        />
                        {errors.neighborhood && <ErrorMessage>{errors.neighborhood.message}</ErrorMessage>}
                        <Controller
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Campo obrigatório'
                                },
                            }}
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value} 
                                    variant="outlined"
                                    color="#217DE9"
                                    label="Rua"
                                    style={styles().textInput}
                                    inputStyle={styles().input} />
                            )}
                            name="street"
                        />
                        {errors.street && <ErrorMessage>{errors.street.message}</ErrorMessage>}
                        <Controller
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Campo obrigatório'
                                },
                            }}
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value} 
                                    variant="outlined"
                                    color="#217DE9"
                                    label="Número"
                                    keyboardType="number-pad"
                                    style={styles().textInput}
                                    inputStyle={styles().input} />
                            )}
                            name="number"
                        />
                        {errors.number && <ErrorMessage>{errors.number.message}</ErrorMessage>}
                        <View style={{
                            width: '100%',
                            alignItems: 'center',
                            marginTop: 10,
                        }}>
                            <ButtonText
                                onPress={handleSubmit(onSubmit)}
                                type={"LITTLE"} text={"Salvar"} />
                        </View>
                    </View>
                </ScrollView>
                </SafeAreaView>
        </View>
    );
}

export {Locations}