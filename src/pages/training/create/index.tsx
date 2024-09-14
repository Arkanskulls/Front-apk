import React, { useState } from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import { TextInput } from "@react-native-material/core";
import { FontAwesome5 } from '@expo/vector-icons'; 
import CurrencyInput from 'react-native-currency-input';

import { ButtonText, HeaderPage } from '../../../components'

import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TrainingCompleteForm, TrainingForm } from "../../../interfaces";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "./styled";
import { Mask, Masks, useMaskedInputProps } from "react-native-mask-input";
import { styles } from './styles';
import { PercurseButton } from "./components/percurse-button";
import { MediaTypeOptions, PermissionStatus, launchImageLibraryAsync, useMediaLibraryPermissions } from "expo-image-picker";
import { useTraiining } from "../../../hooks/training";
import { AddressList } from "./components/address-list";
import { LoaddingView } from "../../common/loadding";

type ParamList = 'suportPoints' | 'startAddress' | 'finishAddress';

type RootStackParamList = {
    Home: undefined;
    Locations: {action: ParamList; editMode?: boolean};
};


interface MaskedInputProps {
    value: string;
    onChange: (...event: any[]) => void;
    mask: Mask | undefined;
}

interface CreateTrainingProps {
    trainingEdit?: TrainingCompleteForm | undefined;
    editMode?: boolean | undefined;
}
  
type MyDataScreenProp = StackNavigationProp<RootStackParamList>;

const CreateTraining = () => {

    const { training, handleTrainingObject, suportPoints, removeSupportPoint, loading, addSupportPoint, resetTraining } = useTraiining();
    const [libraryPermissionInformation, requestPermission]= useMediaLibraryPermissions();
    const [selectedImage, setSelectedImage] = useState()
    const  params  = useRoute().params as CreateTrainingProps;
    const [trainingEdit] = useState(params && params.trainingEdit)
    const [editMode] = useState(params && params.editMode)

    const { control, handleSubmit, setValue, getValues,  formState: { errors }, clearErrors, setError } = useForm<TrainingForm>();
    const navigation = useNavigation<MyDataScreenProp>();
    const maskedInputProps = ({value, onChange, mask}: MaskedInputProps) => useMaskedInputProps({
        value: value,
        onChangeText: onChange,
        mask: mask,
    });

    async function verifyPermission(){
        if (libraryPermissionInformation && libraryPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse= await requestPermission();
    
            return permissionResponse.granted;
        }
        if (libraryPermissionInformation && libraryPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert(
                'Permissão negada',
                'Você precisa permitir o acesso da Galeria para utilizar esta função.'
            );
            return false
        }
        return true;
    }

    async function camerapressHandler(){
        const hasPermission=await verifyPermission()
        if (!hasPermission){
            return;
        }
        const image=await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[16,9],
            quality:0.5
        });
        if (image.assets) {
            const data = getValues();
            setSelectedImage(image.assets[0].uri as any)
            setValue('image', image.assets[0].uri as any)
            clearErrors('image');
            handleTrainingObject({
                ...training,
                ...data,
                imgLink: image.assets[0].uri as any,
            }, false, false)
        }
    }

    const onSubmit: SubmitHandler<TrainingForm> = async (data) => {
        if (!validateInscriptionDate(data.limitDateRegistration, data.startDate)) {
            if (!training.startAddress || !training.finishAddress || training.suportPoints.length < 1) {
                return Alert.alert(
                    'Oops! Houve um problema',
                    'Você precisa dos pontos de partida, chegada, e pelo menos um ponto de apoio para cadastrar o treino.',
                    [
                      {text: 'Ok'},
                    ],
                );
            } else {
                if (!selectedImage  && !editMode) {
                    setError('image', {
                        message: 'Campo obrigatório',
                    });
                } else {
                    clearErrors('image');
                    handleTrainingObject({...training, ...data}, true, trainingEdit && !editMode ? true : false);
                }
            }
        }
    };
    
    const locationSupportPoint = () => {
        const data = getValues();
        handleTrainingObject({...training, ...data}, false, false)
    }
    React.useEffect(() => {
        if(trainingEdit) {
            // setValue('name', trainingEdit.name)
            // setValue('description', trainingEdit.description)
            // setValue('startDate', trainingEdit.startDate)
            // setValue('limitDateRegistration', trainingEdit.limitDateRegistration)
            // setValue('startHour', trainingEdit.startHour)
            handleTrainingObject({...trainingEdit, vacancies: String(trainingEdit.vacancies), uuid: editMode ? trainingEdit.uuid : ''})
            trainingEdit.suportPoints.map((data) => {
                addSupportPoint(data);
            })

            if(trainingEdit.imgLink) {
                setSelectedImage(trainingEdit.imgLink as any);
            }
        }
    }, [trainingEdit])
    

    React.useEffect(() => {
        setValue('name', training.name)
        setValue('description', training.description)
        setValue('limitDateRegistration', training.limitDateRegistration)
        setValue('startHour', training.startHour)
        setValue('startDate', training.startDate)
        setValue('vacancies', training.vacancies as string)
        
        if(training.imgLink) {
            setSelectedImage(training.imgLink as any);
        }
    }, [training])


    const validateInscriptionDate = (inscriptionDate: string, startDate: string) => {
        var inscription1 = inscriptionDate.split('/') as any;
        var startDate1 = startDate.split('/') as any;
        var inscription = new Date(inscription1[2], inscription1[1] - 1, inscription1[0]);
        var start = new Date(startDate1[2], startDate1[1] - 1, startDate1[0]);
        const actualDate = new Date();

        let haveError = false;

        if(start <= actualDate) {
            setError('startDate', {
                message: 'O treino deve ocorrer depois de hoje.'
            })
            haveError = true;
        } else {
            clearErrors('startDate')
        }

        if(inscription >= start){
            setError('limitDateRegistration', {
                message: 'A data de inscrição deve ocorrer antes da data do treino.'
            })
            haveError = true;
        } else {
            clearErrors('limitDateRegistration')
        }
        return haveError;
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
        }}>
            {loading ?
                <LoaddingView /> :
                <>
                    <HeaderPage onBack={() => {navigation.navigate('Home'); resetTraining()}} title={editMode ? 'Editar treino' : "Criar treino"}/>
                    <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={styles().main}>
                            <Text style={styles().titleDivisorArea}>Identificação</Text>
                            <Controller
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Campo obrigatório'
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'O nome deve conter pelo menos 8 caracteres',
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        defaultValue={training.name}
                                        placeholder="Informe o nome do treino"
                                        onChangeText={onChange}
                                        onBlur={onBlur} 
                                        value={value}
                                        label="Nome do treino*"
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
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        defaultValue={training.description}
                                        onChangeText={onChange}
                                        value={value}
                                        variant="outlined"
                                        color="#217DE9"
                                        label="Descrição*"
                                        placeholder="Insira informações específicas do treino"
                                        numberOfLines={6}
                                        multiline
                                        style={styles().textInput}
                                        inputStyle={styles().inputMultiple} />)}
                                name="description"
                            />
                            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View
                                        style={styles().imageBlock}>
                                        {selectedImage &&
                                            <Image style={{width: '70%', height: '100%'}} source={{uri: selectedImage}} />
                                        }
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: 'white',
                                                width: '30%',
                                                height: '100%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 10,
                                            }}
                                            onPress={camerapressHandler}>
                                            <FontAwesome5 name="image" size={50} color="#FA7921" />
                                            <Text style={{
                                                textAlign: 'center',
                                                fontFamily: 'Poppins_500Medium',
                                            }}>Galeria</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                name="image"
                            />
                            {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
                            <Text style={styles().titleDivisorArea}>Horários</Text>
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
                                        onBlur={onBlur}
                                        defaultValue={training.limitDateRegistration}
                                        keyboardType="number-pad"
                                        variant="outlined"
                                        placeholder="DD/MM/AAAA"
                                        color="#217DE9"
                                        label={'Data limite das inscrições*'}
                                        style={styles().textInput}
                                        inputStyle={styles().input} />
                                )}
                                name="limitDateRegistration"
                            />
                            {errors.limitDateRegistration && <ErrorMessage>{errors.limitDateRegistration.message}</ErrorMessage>}
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
                                        onBlur={onBlur}
                                        defaultValue={training.startDate}
                                        keyboardType="number-pad"
                                        variant="outlined"
                                        placeholder="DD/MM/AAAA"
                                        color="#217DE9"
                                        label={'Data do treino*'}
                                        style={styles().textInput}
                                        inputStyle={styles().input} />
                                )}
                                name="startDate"
                            />
                            {errors.startDate && <ErrorMessage>{errors.startDate.message}</ErrorMessage>}
                            <Controller
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Campo obrigatório'
                                    },
                                    pattern: {
                                        value: /([01][0-9]|2[0-3]):([0-5][0-9]|2[0-3])/,
                                        message: 'Insira um horário válido'
                                    } 
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput {...maskedInputProps(
                                        {onChange: onChange, value: value, mask: [/^([0-2])/, /([0-9])/, ":", /[0-5]/, /[0-9]/] })}
                                        onBlur={onBlur}
                                        defaultValue={training.startHour}
                                        variant="outlined"
                                        placeholder="HH:MM no formato de 24 horas"
                                        color="#217DE9"
                                        keyboardType="number-pad"
                                        label={'Horário inicial do treino*'}
                                        style={styles().textInput}
                                        inputStyle={styles().input} />
                                )}
                                name="startHour"
                            />
                            {errors.startHour && <ErrorMessage>{errors.startHour.message}</ErrorMessage>}
                            <Text style={styles().titleDivisorArea}>Detalhes</Text>
                            {/* <Controller
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Campo obrigatório'
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CurrencyInput
                                        value={value}
                                        onChangeValue={onChange}
                                        onBlur={onBlur}
                                        renderTextInput={textInputProps =>
                                            <TextInput
                                                {...textInputProps}
                                                onChange={onChange}
                                                keyboardType="number-pad"
                                                variant="outlined"
                                                color="#217DE9"
                                                label={'Preço do treino*'}
                                                style={styles().textInput}
                                                inputStyle={styles().input} />
                                        }
                                        prefix="R$"
                                        delimiter="."
                                        separator=","
                                        precision={2}
                                    />
                                )}
                                name="price"
                            /> */}
                            {/* {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>} */}
                            <Controller
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Campo obrigatório'
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput {...maskedInputProps(
                                        {onChange: onChange, value: value, mask: [/^([0-9])/, /([0-9])/, /([0-9])/]})}
                                        placeholder="Quantidade das vagas para o treino*"
                                        onBlur={onBlur}
                                        value={value}
                                        keyboardType="number-pad"
                                        label="Quantidade das vagas*"
                                        variant="outlined"
                                        color="#217DE9"
                                        style={styles().textInput}
                                        inputStyle={styles().input} />
                                )}
                                name="vacancies"
                            />
                            {errors.vacancies && <ErrorMessage>{errors.vacancies.message}</ErrorMessage>}
                            <Text style={styles().titleDivisorArea}>Percurso</Text>
                            {training.startAddress ?
                                <View style={{ paddingBottom: 20 }}>
                                    <Text style={styles().titleDivisorArea}>Local de partida</Text>
                                    <AddressList
                                        address={training.startAddress}
                                        onPress={() => {navigation.navigate('Locations', {
                                            action: 'startAddress',
                                            editMode: !!editMode,
                                        }); locationSupportPoint()}} />
                                </View> :
                                <PercurseButton title={"Adicionar local de partida"}
                                onPress={() => {navigation.navigate('Locations', {
                                    action: 'startAddress',
                                    editMode: !!editMode,
                                }); locationSupportPoint()}} />
                            }
                            {training.finishAddress ?
                                <View style={{ paddingBottom: 20 }}>
                                    <Text style={styles().titleDivisorArea}>Local de chegada</Text>
                                    <AddressList
                                        address={training.finishAddress}
                                        onPress={() => {navigation.navigate('Locations', {
                                            action: 'finishAddress',
                                            editMode: !!editMode,
                                        }); locationSupportPoint()}} />
                                </View> :
                                <PercurseButton title={"Adicionar local de chegada"}
                                    onPress={() => {navigation.navigate('Locations', {
                                        action: 'finishAddress',
                                        editMode: !!editMode,
                                    }); locationSupportPoint()}} />
                            }
                            {suportPoints && suportPoints.length > 0 &&
                                <View style={{ paddingBottom: 20 }}>
                                    <Text style={styles().titleDivisorArea}>Pontos de apoio</Text>
                                    {suportPoints.map((point, i) => (
                                        <AddressList
                                            support
                                            onPress={() => removeSupportPoint(point.id as string)}
                                            key={`${point.id}-${i}`}
                                            address={point} />
                                    ))} 
                                </View> 
                            }  
                            <PercurseButton title={"Adicionar ponto de apoio"}
                                onPress={() => {navigation.navigate('Locations', {
                                    action: 'suportPoints',
                                    editMode: !!editMode,
                                }); locationSupportPoint();}
                                } />
                            <View style={styles().buttonsContainer}>
                                <ButtonText
                                    onPress={handleSubmit(onSubmit)}
                                    type={"MEDIUM"} text={editMode ? "Salvar" : "Criar treino"} />
                            </View>
                        </View>
                    </ScrollView>
                    </SafeAreaView>
                </>
            }
        </View>
    );
}

export {CreateTraining}

function componentDidMount() {
    throw new Error("Function not implemented.");
}


function componentWillUnmount() {
    throw new Error("Function not implemented.");
}
