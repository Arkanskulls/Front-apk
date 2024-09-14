import React from "react";
import { Ionicons, Entypo } from '@expo/vector-icons'; 

import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from './styles';
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { ButtonText, HeaderPage } from "../../../components";
import { AthleteData, TrainingCompleteForm } from "../../../interfaces";
import { loadAthletesOnTraining } from '../../../services/training';

import { AthleteList } from "./components/athlete-list";

interface CreateTrainingProps {
    trainingEdit?: TrainingCompleteForm;
    editMode?: boolean;
}

type RootStackParamList = {
    Home: undefined;
    CreateTraining: CreateTrainingProps;
    CommunicationAthletes: {
        training: TrainingCompleteForm;
        athlete?: AthleteData;
    };
};

type ParamList = {
    training: TrainingCompleteForm;
};
  
type DetailsScreenProp = StackNavigationProp<RootStackParamList>;

interface AthletesProps {
    isLoaded: boolean;
    data: AthleteData[];
}

const Details = () => {

    const isFocused = useIsFocused();
    const { params } = useRoute();
    const { training } = params as ParamList;
    const [athletes, setAthletes] = React.useState<AthletesProps>({
        data: [] as AthleteData[],
        isLoaded: false,
    })
    const navigation = useNavigation<DetailsScreenProp>();

    const loadAtletes = async () => {
        setAthletes({
            data: [] as AthleteData[],
            isLoaded: true,
        })
        const response = await loadAthletesOnTraining({
            trainingUuid: training.uuid as string,
        })
        if (response.status === 200) {
            setAthletes({
                data: response.data,
                isLoaded: false,
            })
        } else {
            setAthletes({
                data: [] as AthleteData[],
                isLoaded: false,
            })
        }
    }

    React.useEffect(() => {
        loadAtletes()
    }, [isFocused])

    return (
        <View style={styles().container}>
            <HeaderPage
                title="Detalhes do Treino"
                onBack={() => navigation.navigate('Home')}/>
            <View style={styles().main}>
                <Image source={{uri: training.imgLink}} style={{height: 150, borderRadius: 5}} />
                <Text style={styles().trainingName}>{training.name}</Text>
                <Text style={styles().locationText}>{training.startAddress.city} - {training.startAddress.state}</Text>
                <Text style={styles().descriptionText}>{training.description}</Text>
                <View style={styles().divisor}></View>
                <Text style={styles().titleSection}>Atletas inscritos</Text>
                <ScrollView style={{ width: '100%', marginBottom: 0, }}>
                    {athletes.isLoaded ?
                        <View style={{justifyContent: 'center'}}>
                            <ActivityIndicator size={'small'} color={'#FA7921'} />
                        </View>
                    :
                        athletes.data.length > 0 ?
                            <>
                            {athletes.data.map((athlete, i) => (
                                <AthleteList athlete={athlete} key={`athlete-${i}`}>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('CommunicationAthletes', {
                                            training: training,
                                            athlete: athlete, 
                                        })
                                    }}>
                                        <Entypo size={28} name="mail" color={'#FA7921'}  />
                                    </TouchableOpacity>
                                </AthleteList>))
                            }
                            <View style={{
                                width: '100%',
                                alignItems: 'center',
                                marginTop: 15,
                            }}>
                                <ButtonText
                                    onPress={() => navigation.navigate('CommunicationAthletes', {
                                        training: training,
                                    })}
                                    type={"BIG"} text={""}>
                                    <Text style={{
                                        fontSize: 14,
                                    }}>
                                        Enviar mensagem pros atletas
                                    </Text>
                                </ButtonText>
                            </View>
                            </> :
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 30,
                            }}>
                                <Ionicons name="information-circle-outline" size={30} color="black" />
                                <Text style={{ fontFamily: 'Poppins_400Regular' }}>
                                    Ainda não há atletas inscritos neste treino.
                                </Text>
                            </View>
                    }
                    
                </ScrollView>
            </View>
            <View style={styles().editView}>
                <ButtonText
                    onPress={() => 
                        navigation.navigate('CreateTraining', {
                        editMode: true,
                        trainingEdit: training})
                    }
                    type={"LITTLE"}
                    text={"Editar"} />
            </View>
        </View>
    );
}


export {Details}