import React from "react";

import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { ButtonText, HeaderPage } from '../../components';
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from './styles';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { TrainingItem } from "../home/components/training-item-athlete";
import { useAuth } from "../../hooks/auth";
import { listWorkoutsInscriptions } from "../../services/training-athlete";
import { TrainingListCompleteForm } from "../../interfaces";
import { LoaddingView } from "../common/loadding"; 

type RootStackParamList = {
    Perfil: undefined;
    CreateTraining: undefined;
};
  
type ScreenProp = StackNavigationProp<RootStackParamList>;

interface TrainingsProps {
    isLoaded: boolean;
    data: TrainingListCompleteForm[];
}

const HistoricTrainingsAthlete = () => {

    const isFocused = useIsFocused();
    const navigation = useNavigation<ScreenProp>();
    const [totalPages, setTotalPages] = React.useState();
    const [actualPage, setActualPage] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
    const [trainings, setTrainings]= React.useState<TrainingListCompleteForm[]>(
        [] as TrainingListCompleteForm[]
    )
    const { user } = useAuth();

    const loadWorkouts = async () => {
        setLoading(true)
        const response = await listWorkoutsInscriptions({
            athleteUuid: user?.uuid as string,
            is_active: false,
            page: actualPage,
        });

        if(response.status === 200) {
            setTotalPages(response.data.pages);
            if (actualPage > 1) {
                const newArray = [...trainings, ...response.data.trainings];
                setTrainings(newArray)
            } else {
                setTrainings(response.data.trainings)
            }
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    
    React.useEffect(() => {
        loadWorkouts();
    }, [isFocused, actualPage])

    React.useEffect(() => {
        setActualPage(1)
    }, [isFocused])

    return (
        <View style={styles().container}>
            <HeaderPage
                onBack={() => navigation.navigate('Perfil')} title={"Histórico de treinos"}/>
                <View style={styles().main}>
                {trainings.length > 0 ?
                    <ScrollView style={{ width: '100%', margin: 15, marginBottom: 20, paddingLeft: 15, paddingRight: 15 }}>
                        {trainings.map((item, i) => (
                            <TrainingItem fromActive fromHistoric training={item} key={`training-${i}`} />
                        ))}
                        {loading &&
                            <View style={{justifyContent: 'center',}}>
                                <ActivityIndicator size={'large'} color={'#FA7921'} />
                            </View>
                        }
                        {!loading && totalPages && actualPage < totalPages &&
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
                        Você não possui treinos no histórico.
                    </Text>}
                </View>
        </View>
    );
}


export {HistoricTrainingsAthlete}