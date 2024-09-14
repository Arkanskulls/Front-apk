import React from "react";
import { FontAwesome5 } from '@expo/vector-icons'; 

import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from './styles';
import { useNavigation, useRoute } from "@react-navigation/native";
import { createOpenLink } from 'react-native-open-maps';
import { AssessmentItem, ButtonText, HeaderPage } from "../../components";
import { AssessmentAdvisorProps, DataAssessmentProps, TrainingCompleteForm, TrainingListCompleteForm } from "../../interfaces";
import { AddressList } from "./address-list";
import { useAuth } from "../../hooks/auth";
import { registerWorkout } from '../../services/training-athlete';
import { loadAssessment, getStarsAdvisor } from '../../services/assessments';
import { LoaddingView } from "../common/loadding";

type RootStackParamList = {
    Home: undefined;
    ActiveTrainingsAthlete: undefined;
    Perfil?: undefined;
    RegisterDone: {training: TrainingCompleteForm};
};

type ParamList = {
    training: TrainingListCompleteForm;
    fromActive?: boolean;
};
  
type DetailsScreenProp = StackNavigationProp<RootStackParamList>;

const DetailsTraining = () => {

    const { user } = useAuth();
    const { params } = useRoute();
    const { training, fromActive } = params as ParamList;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [assessments, setAssessments] = React.useState<DataAssessmentProps>(
        {} as DataAssessmentProps
    )
    const [advisorStars, setAdvisorStars] = React.useState();
    const navigation = useNavigation<DetailsScreenProp>();

    const seeRoute = createOpenLink({
        start: `${training.training.startAddress.street} ${training.training.startAddress.number} ${training.training.startAddress.neighborhood} ${training.training.startAddress.city} ${training.training.startAddress.state} ${training.training.startAddress.cep}`,
        end: `${training.training.finishAddress.street} ${training.training.finishAddress.number} ${training.training.finishAddress.neighborhood} ${training.training.finishAddress.city} ${training.training.finishAddress.state} ${training.training.finishAddress.cep}`,
        travelType: 'walk',
        zoom: 1000
    });

    const register = async () => {
        setLoading(true);
        const response = await registerWorkout({
            athleteUuid: user?.uuid as string,
            trainingUuid: training.training.uuid as string,
        })

        if (response.status === 200) {
            setLoading(false);
            navigation.navigate("RegisterDone", {
                training: training.training,
            });
        } else {
            Alert.alert(
                'Oops! Houve um problema',
                response,
                [
                  {text: 'Ok', onPress: () => setLoading(false)},
                ],
            );
        }
    }

    const confirmRegister = () => {
        return Alert.alert(
            training.training.name,
            'Deseja confirmar sua inscrição?',
            [
                {text: 'Cancelar'},
                {text: 'Confirmar', onPress:() => register()},
            ],
        );
    }

    const loadAssessments = async () => {
        const response = await loadAssessment({
            advisorUuid: training.training.advisorUuid,
        });

        if (response.status === 200) {
            setAssessments({
                isLoaded: true,
                data: response.data,
            })
        } else {
            setAssessments({
                isLoaded: true,
                data: [] as AssessmentAdvisorProps[],
            })
        }
    }

    const loadStars = async () => {
        const response = await getStarsAdvisor({
            advisorUuid: training.training.advisorUuid,
        })

        if (response.status === 200 || response.status === 201) {
            setAdvisorStars(response.data)
        }
    }

    React.useEffect(() => {
        loadStars()
        loadAssessments()
    }, [])

    return (
        <View style={styles().container}>
            {loading ?
                <LoaddingView /> :
                <>
                    <HeaderPage
                        title="Detalhes do Treino"
                        onBack={() => navigation.navigate(fromActive ? 'Perfil' : 'Home')}/>
                    <SafeAreaView style={styles().main}>
                        <ScrollView style={{ paddingLeft: 15, paddingRight: 15 }}>
                            <Image source={{uri: training.training.imgLink}} style={{height: 150, borderRadius: 5}} />
                            <Text style={styles().trainingName}>{training.training.name}</Text>
                            {training.advisor &&
                                <>
                                    <Text style={styles().titleSection}>Assessoria</Text>
                                    <Text style={styles().descriptionText}>{training.advisor.name}</Text>
                                </>
                            }
                            {advisorStars &&
                                <>
                                    <Text style={styles().titleSection}>Média de avaliações</Text>
                                    <Text style={styles().descriptionText}>{advisorStars}/5</Text>
                                </>
                            
                            }
                            <Text style={styles().titleSection}>Descrição</Text>
                            <Text style={styles().descriptionText}>{training.training.description}</Text>
                            <Text style={styles().titleSection}>Data limite das inscrições</Text>
                            <Text style={styles().descriptionText}>{training.training.limitDateRegistration}</Text>
                            <Text style={styles().titleSection}>Data do treino</Text>
                            <Text style={styles().descriptionText}>{training.training.startDate}</Text>
                            <Text style={styles().titleSection}>Ponto de partida</Text>
                            <AddressList address={training.training.startAddress} />
                            <Text style={styles().titleSection}>Ponto de chegada</Text>
                            <AddressList address={training.training.finishAddress} />
                            <Text style={styles().titleSection}>Pontos de apoio</Text>
                            {training.training.suportPoints.map((address, i) => (
                                <AddressList key={`support-${i}`} address={address} />
                            ))}
                            <View style={{
                                width: '100%',
                                padding: 15,
                                alignItems: 'center',
                            }}>
                                <TouchableOpacity
                                    onPress={seeRoute}>
                                    <Text>
                                        Ver Percurso no mapa
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles().divisor}></View>
                            {assessments.isLoaded &&
                            <>
                                <Text style={styles().titleAssessment}>Avaliações da assessoria</Text>
                                {assessments.data.length > 0 ? 
                                    assessments.data.map((assessment) => (
                                        <View key={assessment.uuid} >
                                            <AssessmentItem assessment={assessment} />
                                            <View style={styles().divisorAssessment}></View>
                                        </View>
                                    )) :
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: 15,
                                    }}>
                                        <FontAwesome5
                                            name="info-circle"
                                            size={16} />
                                        <Text style={{
                                            fontFamily: 'Poppins_400Regular',
                                            marginLeft: 5,
                                            fontSize: 12,
                                        }}>
                                            Essa assessoria ainda não foi avaliada.
                                        </Text>
                                    </View>
                                }
                            </> 
                            }
                        </ScrollView>
                        {!fromActive &&
                            <View style={{
                                width: '100%',
                                paddingTop: 15,
                                alignItems: 'center',
                            }}>
                                <ButtonText
                                    onPress={() => confirmRegister()}
                                    type={"MEDIUM"}
                                    text={"Participe já"}>
                                    <View style={{ paddingLeft: 5, justifyContent: 'center' }}>
                                    <FontAwesome5
                                        name="running"
                                        size={24}
                                        color="#fff" />
                                    </View>
                                </ButtonText>
                            </View>
                        }
                    </SafeAreaView>
                </>
            }
        </View>
    );
}


export {DetailsTraining}