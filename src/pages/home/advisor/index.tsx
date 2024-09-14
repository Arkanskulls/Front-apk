import React from "react";
import { FontAwesome5 } from '@expo/vector-icons'; 

import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import { ButtonText, HeaderHome } from '../../../components';
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from './styles';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTraiining } from "../../../hooks/training";
import { TrainingItem } from "../components/training-item";
import { LoadWorkoutsProps, TrainingListCompleteForm } from "../../../interfaces";
import { LoaddingView } from "../../common/loadding";
import { listAdvisorWorkouts, suspendedTraining, reactivateTraining } from "../../../services/training";
import { useAuth } from "../../../hooks/auth";

type RootStackParamList = {
    Perfil: undefined;
    CreateTraining: undefined;
};

interface HandleTraining {
    isActive: boolean;
    trainingUuid: string;
    advisorUuid: string;
}
  
type HomeScreenProp = StackNavigationProp<RootStackParamList>;

const HomeAdvisor = () => {

    const isFocused = useIsFocused();
    const { user } = useAuth();
    const navigation = useNavigation<HomeScreenProp>();
    const [totalPages, setTotalPages] = React.useState();
    const [actualPage, setActualPage] = React.useState(1);
    const [loadingAction, setLoadingAction] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [trainings, setTrainings] = React.useState<TrainingListCompleteForm[]>([] as TrainingListCompleteForm[])
    const { resetTraining } = useTraiining();


    const handleTrainingStats = async ({
        isActive, advisorUuid, trainingUuid
    }: HandleTraining) => {
        setLoadingAction(true);
        let response;
        if (isActive) {
            response = await suspendedTraining({
                advisorUuid: advisorUuid,
                trainingUuid: trainingUuid,
            })
        } else {
            response = await reactivateTraining({
                advisorUuid: advisorUuid,
                trainingUuid: trainingUuid,
            })
        }

        if (response && response.status === 200) {
            loadWorkouts({
                is_active: true,
            });
            return Alert.alert(
                `Treino ${isActive ? 'suspenso' : 'ativado'} com sussesso`,
                isActive ? 'As inscrições estão suspensas' : 'As inscrições estão abertas',
                [
                    {
                        text: 'Ok',
                        onPress: () => setLoadingAction(false)
                    }
                ]
            )
        } else {
            return Alert.alert(
                `Oops! Houve um problema`,
                response as string,
                [
                    {
                        text: 'Ok',
                        onPress: () => setLoadingAction(false)
                    }
                ]
            )
        }
    }

    const loadWorkouts = async (data: LoadWorkoutsProps) => {
        setLoading(true)
        if (user?.type === 'ADVISOR') {
            const response = await listAdvisorWorkouts({
                uuid: user?.uuid as string,
                is_active: data.is_active,
                page: actualPage,
            })
            if (response.status === 200) {
                setTotalPages(response.data.pages);
                if (actualPage > 1) {
                    const newArray = [...trainings, ...response.data.trainings];
                    setTrainings(newArray)
                } else {
                    setTrainings(response.data.trainings)
                }
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

    React.useEffect(() => {
        loadWorkouts({
            is_active: true,
        });
    }, [isFocused, actualPage])

    React.useEffect(() => {
        setActualPage(1)
    }, [isFocused])

    return (
        <View style={styles().container}>
            <HeaderHome
                navTo={() => navigation.navigate('Perfil')}/>
            {loadingAction ?
                <LoaddingView /> :
                <View style={styles().main}>
                    <ButtonText
                        onPress={() => {resetTraining(); navigation.navigate('CreateTraining')}}
                        type={"MEDIUM"}
                        text={"Criar treino"}>
                        <FontAwesome5
                            name="running"
                            size={24}
                            color="#fff" />
                    </ButtonText>
                    {trainings.length > 0 ?
                        <ScrollView style={{ width: '100%', margin: 15, marginBottom: 20, paddingLeft: 15, paddingRight: 15 }}>
                            {trainings.map((item, i) => (
                                <TrainingItem
                                    suspenderAction={() => {
                                        handleTrainingStats({
                                            isActive: item.training.isActive,
                                            advisorUuid: item.training.advisorUuid,
                                            trainingUuid: item.training.uuid as string,
                                        })
                                    }}
                                    training={item.training}
                                    key={`training-${i}`} />
                            ))}
                            {loading &&
                                <View style={{justifyContent: 'center',}}>
                                    <ActivityIndicator size={'large'} color={'#FA7921'} />
                                </View>
                            }
                            {!loading && totalPages && actualPage <= totalPages &&
                                <View style={{alignItems: 'center', width: '100%'}}>
                                    <ButtonText
                                        onPress={() => {setActualPage(actualPage + 1)}}
                                        type={"LITTLE"}
                                        text={"Mostrar mais"}>
                                    </ButtonText>
                                </View>
                            }
                        </ScrollView> :
                        <Text style={{
                            fontFamily: 'Poppins_400Regular',
                            textAlign: 'center',
                            padding: 15,
                        }}>
                            Você não possui treinos ativos.
                        </Text>}
                </View>
            }
        </View>
    );
}


export {HomeAdvisor}