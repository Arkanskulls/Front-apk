import React, { createContext, useState, useEffect, useContext } from 'react';
import {
    createTraining,
    uploadTrainingImage,
    listAdvisorWorkouts,
    updateTraining as updateService,
} from '../services/training';
import { LocationForm, TrainingCompleteForm, TrainingListCompleteForm } from '../interfaces'
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from './auth';

interface TrainingContextData {
    training: TrainingCompleteForm;
    suportPoints: LocationForm[];
    trainings: TrainingListCompleteForm[];
    loading: boolean;
    loadWorkouts: (data: LoadWorkoutsProps) => Promise<void>;
    handleTrainingObject: (data: TrainingCompleteForm, create?: boolean, recicle?: boolean) => void;
    addSupportPoint: (data: LocationForm) => void;
    removeSupportPoint: (id: string) => void;
    resetTraining: () => void;
    loadHistoric: ({ page }: {
        page: number}) => Promise<any>;
}

const TrainingContext = createContext<TrainingContextData>({} as TrainingContextData);

interface TrainingProviderProps {
    children?: React.ReactNode;
}

interface LoadWorkoutsProps {
    is_active: boolean;
}

type RootStackParamList = {
    Perfil: undefined;
    Home: undefined;
};

interface HandleTrainingObjectProps {
    data: Partial<TrainingCompleteForm>;
    create?: boolean;
}
  
type TraningScreenProp = StackNavigationProp<RootStackParamList, 'Perfil'>;

export const TrainingProvider: React.FC<TrainingProviderProps> = ({children}: TrainingProviderProps) => {

    const navigation = useNavigation<TraningScreenProp>();
    const [trainings, setTrainings] = useState<TrainingListCompleteForm[]>([] as TrainingListCompleteForm[])
    const [training, setTraining] = useState<TrainingCompleteForm>({} as TrainingCompleteForm);
    const [suportPoints, setSuportPoints] = useState<LocationForm[]>([] as LocationForm[]);
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        handleTrainingObject({
            suportPoints: suportPoints
        }, false, false);
    }, [suportPoints])

    useEffect(() => {
        if (user && user.type === 'ADVISOR'){
            handleTrainingObject({
                advisorUuid: user?.uuid,
            }, false, false);
        }
        loadWorkouts({
            is_active: true,
        })
    }, [])

    const resetTraining = () => {
        setSuportPoints([] as LocationForm[])
        setTraining({} as TrainingCompleteForm);
        setTraining((prev) => prev = {
            ...prev, advisorUuid: user?.uuid as string,
        })
    }

    const createTranining = async (data: TrainingCompleteForm, recicle?: boolean) => {
        setLoading(true)
        const response = await createTraining({
            ...training,
            ...data,
            advisorUuid: user?.uuid as string});

        if (response.status && response.status === 200) {

            if (data.imgLink && !recicle) {
                const id = response.data.uuid;
                const responseImage = await uploadTrainingImage({
                    src: data.imgLink,
                    trainingUuid: id,
                    uuid: user?.uuid as string,
                })
    
                if (responseImage.status && response.status === 200) {
                    await loadWorkouts({
                        is_active: true
                    });
                    return Alert.alert(
                        'Treino criado com sucesso',
                        'Seu treino está pronto para receber os RunBudders.',
                        [
                            {
                                text: 'Ok', onPress: () => {navigation.navigate('Home'); setLoading(false); resetTraining()},
                            }
                        ]
                    )
                } else {
                    setLoading(false)
                    Alert.alert(
                        'Oops! Aparentemente houve um problema',
                        'Verifique os dados e tente novamente.',
                        [
                            {
                                text: 'Ok',
                            }
                        ]
                    )
                }
            } else if (response.status === 200) {
                return Alert.alert(
                    'Treino criado com sucesso',
                    'Seu treino está pronto para receber os RunBudders.',
                    [
                        {
                            text: 'Ok', onPress: () => {navigation.navigate('Home'); setLoading(false); resetTraining()},
                        }
                    ]
                )
            } else {
                setLoading(false)
                Alert.alert(
                    'Oops! Aparentemente houve um problema',
                    'Verifique os dados e tente novamente.',
                    [
                        {
                            text: 'Ok',
                        }
                    ]
                )
            }
        } else {
            setLoading(false)
            Alert.alert(
                'Oops! Aparentemente houve um problema',
                'Verifique os dados e tente novamente.',
                [
                    {
                        text: 'Ok',
                    }
                ]
            )
        }
    }

    const updateTranining = async (data: TrainingCompleteForm) => {
        setLoading(true)
        const response = await updateService({
                data: {
                    ...training,
                    ...data,
                    suportPoints: suportPoints,
                },
                uuid: user?.uuid as string,
                trainingUuid: data.uuid as string});

        if (response.status && response.status === 200) {
            if (data.image) {
                const responseImage = await uploadTrainingImage({
                    src: data.image,
                    trainingUuid: data.uuid as string,
                    uuid: user?.uuid as string,
                })
                if (responseImage.status && response.status === 200) {
                    await loadWorkouts({
                        is_active: true,
                    });
                    Alert.alert(
                        'Treino atualizado com sucesso',
                        'Seu treino já está com os dados atualizados.',
                        [
                            {
                                text: 'Ok', onPress: () => {navigation.navigate('Home'); setLoading(false); resetTraining()},
                            }
                        ]
                    )
                } else {
                    Alert.alert(
                        'Houve um problema com a imagem',
                        'Verifique seus dados e tente novamente.',
                        [
                            {
                                text: 'Ok',
                            }
                        ]
                    )
                }
            } else {
                await loadWorkouts({
                    is_active: true,
                });
                Alert.alert(
                    'Treino atualizado com sucesso',
                    'Seu treino já está com os dados atualizados.',
                    [
                        {
                            text: 'Ok', onPress: () => {navigation.navigate('Home'); setLoading(false); resetTraining()},
                        }
                    ]
                )
            }
        } else {
            setLoading(false)
            Alert.alert(
                'Oops! Aparentementee houve um problema',
                'Verifique os dados e tente novamente.',
                [
                    {
                        text: 'Ok',
                    }
                ]
            )
        }
    }

    const handleTrainingObject = async (data: Partial<TrainingCompleteForm>, create?: boolean, recicle?: boolean) => {
        setTraining((prev) => prev = {
            ...prev,
            ...data,
        });
        if (create) {
            if (training.uuid) {
                await updateTranining({
                    ...training,
                    ...data,
                });
            } else {
                await createTranining({
                    ...training,
                    ...data,
                }, recicle);
            }
        }
    }

    const addSupportPoint = (data: LocationForm) => {
        const actual = suportPoints;
        actual.push(data);
        setSuportPoints(actual);
    }

    const removeSupportPoint = (id: string) => {
        const actual = suportPoints.filter((location) => location.id !== id)
        setSuportPoints(actual);
    }

    const loadWorkouts = async (data: LoadWorkoutsProps) => {
        setLoading(true)
        if (user?.type === 'ADVISOR') {
            const response = await listAdvisorWorkouts({
                uuid: user?.uuid as string,
                is_active: data.is_active,
            })
            if (response.status === 200) {
                setTrainings(response.data.trainings)
                setLoading(false)
            } else {
                Alert.alert(
                    'Oops! Aparentemente houve um problema',
                    'Não foi possível carregar seus treinos, verifiquer seus dados e tente novamente.',
                    [
                        {
                            text: 'Ok', onPress: () => {navigation.navigate('Perfil'); setLoading(false)},
                        }
                    ]
                )
            }

        } else{
            setLoading(false)
        }
    }

    const loadHistoric = async ({page}: {page: number}) => {
        if (user?.type === 'ADVISOR') {
            const response = await listAdvisorWorkouts({
                uuid: user?.uuid as string,
                is_active: false,
                page: page,
            })
            return response;
        } else {
            Alert.alert(
                'Oops! Aparentemente houve um problema',
                'Não foi possível carregar seus treinos, verifiquer seus dados e tente novamente.',
                [
                    {
                        text: 'Ok', onPress: () => navigation.navigate('Perfil'),
                    }
                ]
            )
        }
    }
    
    return (
        <TrainingContext.Provider value={{
            training,
            suportPoints,
            loading,
            trainings,
            loadWorkouts,
            handleTrainingObject,
            addSupportPoint,
            removeSupportPoint,
            resetTraining,
            loadHistoric,
        }}>
            {children}
        </TrainingContext.Provider>
    )
} 

export function useTraiining() {
    const context = useContext(TrainingContext);

    return context;
};