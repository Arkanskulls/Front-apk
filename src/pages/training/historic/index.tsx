import React from "react";
import { View, SafeAreaView, ScrollView, Text, ActivityIndicator } from "react-native";
import { ButtonText, HeaderPage } from "../../../components";
import { StackNavigationProp } from "@react-navigation/stack";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTraiining } from "../../../hooks/training";
import { TrainingCompleteForm, TrainingListCompleteForm } from "../../../interfaces";
import { TrainingItem } from "./components/training-item";
import { LoaddingView } from "../../common/loadding";

type RootStackParamList = {
    Perfil: undefined;
};

type HistoricScreenProp = StackNavigationProp<RootStackParamList>;

const HistoricTraining: React.FC = () => {

    const isFocused = useIsFocused();
    const navigation = useNavigation<HistoricScreenProp>();
    const { loadHistoric } = useTraiining();
    const [totalPages, setTotalPages] = React.useState();
    const [actualPage, setActualPage] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
    const [trainings, setTrainings] = React.useState<TrainingListCompleteForm[]>([] as TrainingListCompleteForm[])

    const load = async () => {
        setLoading(true)
        const response = await loadHistoric({
            page: actualPage,
        });

        if (response.data) {
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
        load();
    }, [isFocused, actualPage])

    React.useEffect(() => {
        setActualPage(1)
    }, [isFocused])

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
        }}>
            <HeaderPage onBack={() => navigation.navigate('Perfil')} title={"Histórico de treinos"}/>
            <SafeAreaView style={{ flex: 1, margin: 15 }}>
            {trainings.length > 0 ?
                <ScrollView style={{ width: '100%' }}>
                    {trainings.map((item, i) => (
                        <TrainingItem training={item.training} key={`training-${i}`} />
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
                    paddingTop: 15,
                }}>
                    Você não possui treinos no histórico.
                </Text>}
            </SafeAreaView>
        </View>
    )
}

export { HistoricTraining };