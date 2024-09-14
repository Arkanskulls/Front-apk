import React from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "@react-native-material/core";
import { ButtonText, HeaderPage } from "../../components";
import { LoaddingView } from "../common/loadding";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesome } from '@expo/vector-icons'; 

import { TrainingListCompleteForm } from "../../interfaces";
import { advisorAssessment, verifyAssessment, updateAssessment, deleteAssessment } from '../../services/assessments';
import { styles } from './styles';
import { useAuth } from "../../hooks/auth";

type RootStackParamList = {
    HistoricTrainingsAthlete: undefined;
};

type ScreenProp = StackNavigationProp<RootStackParamList>;

type ParamList = {
    training: TrainingListCompleteForm;
};

const RatingAdvisor = () => {
    const isFocused = useIsFocused();
    const [loading, setLoading] = React.useState<boolean>();
    const [editMode, setEditMode] = React.useState<boolean>();
    const [assessmentId, setAssessmentId] = React.useState<string>('');
    const navigation = useNavigation<ScreenProp>();
    const { params } = useRoute();
    const { user } = useAuth();
    const { training } = params as ParamList;
    const [canComent, setCanComent] = React.useState<boolean>(true);
    const [coment, setComent] = React.useState('');
    const [defaultRating, setDefaultRating] = React.useState(1);
    const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5]);

    const handleRating = async () => {
        setLoading(true)
        const response = await advisorAssessment({
            athleteUuid: user?.uuid as string,
            advisorUuid: training.training.advisorUuid,
            stars: defaultRating,
            comment: coment ? coment : '',
        })

        if (response.status === 200 || response.status === 201) {
            Alert.alert(
                'Avaliação concluída!',
                'Obrigado pelo feedback',
                [
                    {text: 'Ok', onPress: () => {
                        setLoading(false)
                        navigation.navigate('HistoricTrainingsAthlete')
                    }},
                ],
                );
        } else {
            Alert.alert(
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

    const handleEditRating = async () => {
        setLoading(true);
        const response = await updateAssessment({
            athleteUuid: user?.uuid as string,
            assessmentUuid: assessmentId,
            data: {
                comment: coment ? coment : '',
                stars: defaultRating,
            }
        })

        if (response.status === 200 || response.status === 201) {
            Alert.alert(
                'Avaliação concluída!',
                'Obrigado pelo feedback',
                [
                    {text: 'Ok', onPress: () => {
                        navigation.navigate('HistoricTrainingsAthlete')
                    }},
                ],
            );
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

    const handleDeleteRating = async () => {
        setLoading(true);
        const response = await deleteAssessment({
            athleteUuid: user?.uuid as string,
            assessmentUuid: assessmentId
        })

        if (response.status === 200 || response.status === 201) {
            Alert.alert(
                'Avaliação excluída.',
                'Você pode avaliar novamente quando quiser',
                [
                    {text: 'Ok', onPress: () => {
                        navigation.navigate('HistoricTrainingsAthlete')
                    }},
                ],
            );
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

    const verify = async () => {
        setLoading(true)
        const response = await verifyAssessment({
            advisorUuid: training.training.advisorUuid,
            athleteUuid: user?.uuid as string,
        });

        if (response.status === 200) {
            if (response.data.comment) {
                setComent(response.data.comment)
            }
            setCanComent(response.data.athleteCanComment)
            setAssessmentId(response.data.uuid)
            setEditMode(true)
            setDefaultRating(response.data.stars)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        verify()
    }, [isFocused])

    return (
        <View style={styles().container}>
            {loading ?
                <LoaddingView /> :
                <>
                    <HeaderPage
                        title="Avaliação da assessoria"
                        onBack={() => navigation.navigate('HistoricTrainingsAthlete')}/>
                    <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={Platform.OS === 'ios' && {flex: 1}}
                            keyboardVerticalOffset={0}
                        >
                        <View style={{
                            padding: 15,
                            paddingBottom: 0,
                        }}>
                            <Image source={{uri: training.training.imgLink}} style={{height: 150, borderRadius: 5}} />
                            {training.advisor &&
                                <>
                                    <Text style={styles().advisorName}>{training.advisor.name}</Text>
                                </>
                            }
                        </View>
                        <ScrollView style={{ paddingLeft: 15, paddingRight: 15 }}>
                            <Text style={styles().titleSection}>Avalie de 1 a 5 estrelas</Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                                {maxRating.map((item, i) => (
                                    <TouchableOpacity
                                        key={item}
                                        activeOpacity={0.5}
                                        onPress={() => {
                                            setDefaultRating(item)
                                        }}
                                        style={{
                                            padding: 5
                                        }}>
                                            <FontAwesome name={item <= defaultRating ? "star" : "star-o"} size={42} color={'#FA7921'} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            {canComent &&
                                <>
                                    <Text style={styles().titleSection}>Deixe um comentário</Text>
                                    <TextInput
                                        onChangeText={(e) => setComent(e)}
                                        value={coment}
                                        variant="outlined"
                                        color="#217DE9"
                                        label="O que você achou da assessoria?"
                                        numberOfLines={6}
                                        multiline
                                        style={styles().textInput}
                                        inputStyle={styles().inputMultiple} />
                                </>
                            }
                            <View style={{
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 15,
                            }}>
                                <ButtonText
                                    onPress={() => editMode ? handleEditRating() : handleRating()}
                                    type={"MEDIUM"}
                                    text={editMode ? "Editar sua avaliação" : "Avaliar"}/>
                                {editMode &&
                                    <ButtonText
                                        onPress={() => handleDeleteRating()}
                                        type={"LITTLE"}
                                        text={"Excluir"}/>
                                }
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </>
            }
        </View>
    );
}

export { RatingAdvisor };