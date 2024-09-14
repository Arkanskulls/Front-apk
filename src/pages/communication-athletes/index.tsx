import React from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "@react-native-material/core";
import { ButtonText, HeaderPage } from "../../components";
import { LoaddingView } from "../common/loadding";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesome } from '@expo/vector-icons'; 

import { AthleteData, TrainingCompleteForm, TrainingListCompleteForm } from "../../interfaces";
import { directMail, suitecaseMail } from '../../services/communication';
import { styles } from './styles';
import { useAuth } from "../../hooks/auth";

type RootStackParamList = {
    Details: {training: TrainingCompleteForm};
};

type ScreenProp = StackNavigationProp<RootStackParamList>;

type ParamList = {
    training: TrainingCompleteForm;
    athlete?: AthleteData;
};

const CommunicationAthletes = () => {
    const [loading, setLoading] = React.useState<boolean>();
    const navigation = useNavigation<ScreenProp>();
    const { params } = useRoute();
    const { user } = useAuth();
    const { training, athlete } = params as ParamList;
    const [coment, setComent] = React.useState('');

    const handleMail = async () => {
        setLoading(true)
        const response = athlete ? await directMail({
            advisorUuid: user?.uuid as string,
            athleteEmail: athlete.email,
            message: coment,
            trainingUuid: training.uuid as string,
        }) : await suitecaseMail({
            advisorUuid: user?.uuid as string,
            message: coment,
            trainingUuid: training.uuid as string,
        })

        if (response.status === 200 || response.status === 201) {
            return Alert.alert(
                'E-mail enviado!',
                undefined,
                [
                    {text: 'Ok', onPress: () => {
                        setLoading(false)
                        navigation.navigate('Details', {
                            training: training,
                        })
                    }},
                ],
            );
        } else {
            return Alert.alert(
                'Oops! Houve um problema',
                response,
                [
                    {text: 'Ok', onPress: () => {
                        setLoading(false)
                    }},
                ],
            );
        }
    }

    return (
        <View style={styles().container}>
            {loading ?
                <LoaddingView /> :
                <>
                    <HeaderPage
                        title="Comunicação"
                        onBack={() => navigation.navigate('Details', {
                            training: training,
                        })}/>
                    <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={Platform.OS === 'ios' && {flex: 1}}
                            keyboardVerticalOffset={0}
                        >
                        <View style={{
                            padding: 15,
                            paddingBottom: 0,
                        }}>
                            <Image source={{uri: training.imgLink}} style={{height: 150, borderRadius: 5}} />
                        </View>
                        <ScrollView style={{ paddingLeft: 15, paddingRight: 15, marginTop: 15 }}>
                            <Text style={styles().titleSection}>A comunicação será feita através de um e-mail para {
                                athlete ? athlete.name : 'todos os atletas'
                            }</Text>
                            <TextInput
                                onChangeText={(e) => setComent(e)}
                                value={coment}
                                variant="outlined"
                                color="#217DE9"
                                label="Mensagem de texto"
                                numberOfLines={6}
                                multiline
                                style={styles().textInput}
                                inputStyle={styles().inputMultiple} />
                            {coment.length > 0 &&
                                <View style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 15,
                                }}>
                                    <ButtonText
                                        onPress={() => handleMail()}
                                        type={"MEDIUM"}
                                        text={'Enviar'}/>
                                </View>
                            }
                        </ScrollView>
                    </KeyboardAvoidingView>
                </>
            }
        </View>
    );
}

export { CommunicationAthletes };