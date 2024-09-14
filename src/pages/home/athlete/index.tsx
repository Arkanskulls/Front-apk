import React from "react";

import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { ButtonText, HeaderHome } from '../../../components';
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from './styles';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { TrainingItem } from "../components/training-item-athlete";
import { useAuth } from "../../../hooks/auth";
import { listWorkouts } from "../../../services/training-athlete";
import { TrainingCompleteForm, TrainingListCompleteForm } from "../../../interfaces";
import { LoaddingView } from "../../common/loadding";
import { FontAwesome5 } from '@expo/vector-icons'; 

type RootStackParamList = {
    Perfil: undefined;
    CreateTraining: undefined;
};
  
type HomeScreenProp = StackNavigationProp<RootStackParamList>;

interface TrainingsProps {
    isLoaded: boolean;
    data: TrainingListCompleteForm[];
}

const HomeAthlete = () => {

    const isFocused = useIsFocused();
    const navigation = useNavigation<HomeScreenProp>();
    const [totalPages, setTotalPages] = React.useState();
    const [actualPage, setActualPage] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
    const [trainings, setTrainings] = React.useState<TrainingListCompleteForm[]>([] as TrainingListCompleteForm[])
    const { user } = useAuth();

    const loadWorkouts = async () => {
        setLoading(true)
        const response = await listWorkouts({
            cep: user?.cep as string,
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
        setActualPage(1);
    }, [isFocused])

    return (
        <View style={styles().container}>
            <HeaderHome
                navTo={() => navigation.navigate('Perfil')}/>
                <View style={styles().main}>
                    <View style={{
                        width: '100%',
                        paddingLeft: 15,
                        paddingRight: 15,
                    }}>
                        <View style={{
                            backgroundColor: '#d9d9d9',
                            padding: 10,
                            borderRadius:10,
                        }}>
                            <Text style={{ fontFamily: 'Poppins_400Regular' }}>
                                Exibindo treinos pela seguinte localização:
                            </Text>
                            <View style={{marginTop: 5, flexDirection: 'row', alignItems:'center',}}>
                                <FontAwesome5 name="map-marker-alt" size={24} color='#FA7921' />
                                <Text style={{
                                    paddingLeft: 5,
                                    fontFamily: 'Poppins_500Medium',
                                }}>{user?.city} - {user?.state} - {user?.cep} </Text>
                            </View>
                        </View>
                    </View>
                    {trainings.length > 0 ?
                    <ScrollView style={{ width: '100%', margin: 15, marginBottom: 20, paddingLeft: 15, paddingRight: 15 }}>
                        {trainings.map((item, i) => (
                            <TrainingItem training={item} key={`training-${i}`} />
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
                        Você não possui treinos disponíveis para essa localização.
                    </Text>}
                </View>
        </View>
    );
}


export {HomeAthlete}