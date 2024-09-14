import React from "react";
import { FontAwesome5, Foundation } from '@expo/vector-icons'; 

import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from './styles';
import { useNavigation, useRoute } from "@react-navigation/native";
import { ButtonText, HeaderPage } from "../../../components";
import { TrainingCompleteForm } from "../../../interfaces";
import { AddressList } from "./address-list";

interface CreateTrainingProps {
    trainingEdit?: TrainingCompleteForm;
    editMode?: boolean;
}

type RootStackParamList = {
    HistoricTraining: undefined;
    CreateTraining: CreateTrainingProps;
};

type ParamList = {
    training: TrainingCompleteForm;
};
  
type DetailsScreenProp = StackNavigationProp<RootStackParamList>;

const DetailsHistoric = () => {

    const { params } = useRoute();
    const { training } = params as ParamList;
    const navigation = useNavigation<DetailsScreenProp>();

    return (
        <View style={styles().container}>
            <HeaderPage
                title="Detalhes do Treino"
                onBack={() => navigation.navigate('HistoricTraining')}/>
            <SafeAreaView style={styles().main}>
                <ScrollView>
                    <Image source={{uri: training.imgLink}} style={{height: 150, borderRadius: 5}} />
                    <Text style={styles().trainingName}>{training.name}</Text>
                    <Text style={styles().titleSection}>Descrição</Text>
                    <Text style={styles().descriptionText}>{training.description}</Text>
                    <Text style={styles().titleSection}>Data limite das inscrições</Text>
                    <Text style={styles().descriptionText}>{training.limitDateRegistration}</Text>
                    <Text style={styles().titleSection}>Data do treino</Text>
                    <Text style={styles().descriptionText}>{training.startDate}</Text>
                    <Text style={styles().titleSection}>Ponto de partida</Text>
                    <AddressList address={training.startAddress} />
                    <Text style={styles().titleSection}>Ponto de chegada</Text>
                    <AddressList address={training.startAddress} />
                    <Text style={styles().titleSection}>Pontos de apoio</Text>
                    {training.suportPoints.map((address, i) => (
                        <AddressList key={`support-${i}`} address={address} />
                    ))}
                    <View style={{
                        width: '100%',
                        paddingTop: 15,
                        alignItems: 'center',
                    }}>
                        <ButtonText
                            onPress={() => 
                                navigation.navigate('CreateTraining', {
                                editMode: false,
                                trainingEdit: training})
                            }
                            type={"MEDIUM"}
                            text={"Reciclar treino"}>
                            {/* <View style={{ paddingLeft: 5, justifyContent: 'center' }}>
                            <FontAwesome5
                                name="running"
                                size={24}
                                color="#fff" />
                            </View> */}
                        </ButtonText>
                    </View>
                    {/* <View style={styles().divisor}></View> */}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}


export {DetailsHistoric}