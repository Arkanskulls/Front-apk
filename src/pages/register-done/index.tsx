import { useNavigation, useRoute } from "@react-navigation/native";
import { TrainingCompleteForm } from "../../interfaces";
import { SafeAreaView, Text, View } from "react-native";
import { ButtonText, HeaderPage } from "../../components";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useAuth } from "../../hooks/auth";
import { styles } from './styles';

type ParamList = {
    training: TrainingCompleteForm;
};

type RootStackParamList = {
    Home: undefined;
    ActiveTrainingsAthlete: undefined;
};

type DoneScreenProp = StackNavigationProp<RootStackParamList>;

const RegisterDone = () => {

    const { css } = styles();
    const { params } = useRoute();
    const { user } = useAuth();
    const { training } = params as ParamList;
    const navigation = useNavigation<DoneScreenProp>();

    return (
        <View style={css.container}>
            <HeaderPage
                title="Inscrição concluída"
                onBack={() => navigation.navigate('Home')} />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={css.main}>
                    <FontAwesome5 name="check" size={80} color='#FA7921'/>
                    <Text style={css.textInscription}>
                        Inscrição concluída com sucesso no treino
                    </Text>
                    <Text style={css.trainingName}>
                        {training.name}
                    </Text>
                    <Text style={css.textEmail}>
                        Você receberá um e-mail em {user?.email} confirmando sua inscrição.
                    </Text>
                </View>
                <View style={{
                    height: '30%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    <ButtonText onPress={() => navigation.navigate('ActiveTrainingsAthlete')} type={"MEDIUM"} text={"Treinos ativos"} />
                </View>
            </SafeAreaView>
        </View>
    )
}

export { RegisterDone };
