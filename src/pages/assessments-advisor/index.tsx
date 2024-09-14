import React from "react";

import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AssessmentItem, ButtonText, HeaderPage } from '../../components';
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from './styles';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";
import { LoaddingView } from "../common/loadding"; 
import { AssessmentAdvisorProps, DataAssessmentProps } from "../../interfaces";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { advisorResponseAssessment, deleteAdvisorComment, deleteAthleteComment, loadAssessment } from "../../services/assessments";
import { TextInput } from "@react-native-material/core";

type RootStackParamList = {
    Perfil: undefined;
};

type ScreenProp = StackNavigationProp<RootStackParamList>;
const AssessmentsAdvisor = () => {

    const isFocused = useIsFocused();
    const navigation = useNavigation<ScreenProp>();
    const [loading, setLoading] = React.useState<boolean>();
    const [assessments, setAssessments] = React.useState<DataAssessmentProps>(
        {} as DataAssessmentProps
    );
    const [coment, setComent] = React.useState('');
    const [expandedId, setExpandedId] = React.useState('');
    const { user } = useAuth();

    const loadAssessments = async () => {
        const response = await loadAssessment({
            advisorUuid: user?.uuid as string,
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

    const responseAssessment = async () => {
        if (coment.length > 0) {
            setLoading(true)
            const response = await advisorResponseAssessment({
                advisorUuid:  user?.uuid as string,
                response: coment,
                assessmentUuid: expandedId,
            });
    
            if (response.status === 200 || response.status === 201) {
                Alert.alert(
                    'Resposta adicionada',
                    'Você pode alterar quando quiser',
                    [
                        {text: 'Ok', onPress: () => {
                            loadAssessments();
                            setLoading(false)}},
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
        } else {
            Alert.alert(
                'Oops! Houve um problema',
                'Insira um comentário para respnder',
                [
                    {text: 'Ok', onPress: () => setLoading(false)},
                ],
            );
        }
    }

    const deleteComment = async () => {
        setLoading(true)
        const response = await deleteAthleteComment({
            advisorUuid: user?.uuid as string,
            assessmentUuid: expandedId,
        });

        if (response.status === 200 || response.status === 201) {
            Alert.alert(
                'Comentário deletado',
                'Não é possível reverter',
                [
                    {text: 'Ok', onPress: () => {setLoading(false); loadAssessments()}},
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

    const deleteMyComment = async () => {
        setLoading(true)
        const response = await deleteAdvisorComment({
            advisorUuid: user?.uuid as string,
            assessmentUuid: expandedId,
        });

        if (response.status === 200 || response.status === 201) {
            Alert.alert(
                'Comentário deletado',
                undefined,
                [
                    {text: 'Ok', onPress: () => {setLoading(false); loadAssessments()}},
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

    const confirmDeleteComment = () => {
        return Alert.alert(
            'Tem certeza que deseja excluir?',
            'Não é possível reverter',
            [
                {text: 'Ok', onPress: () => deleteComment()},
                {text: 'Cancelar'},
            ],
        );
    }

    const confirmDeleteAdvisorComment = () => {
        return Alert.alert(
            'Tem certeza que deseja excluir?',
            'Você poderá comentar novamente',
            [
                {text: 'Ok', onPress: () => deleteMyComment()},
                {text: 'Cancelar'},
            ],
        );
    }

    React.useEffect(() => {
        loadAssessments()
    }, [isFocused])

    return (
        <View style={styles().container}>
            {loading ?
                <LoaddingView /> :
                <>
                <HeaderPage
                    onBack={() => navigation.navigate('Perfil')} title={"Avaliações"} />
                    <View style={styles().main}>
                        <ScrollView style={{ width: '100%', margin: 15, marginBottom: 20, marginTop: 0, paddingLeft: 15, paddingRight: 15 }}>
                            {assessments.isLoaded ? (
                                assessments.data.length > 0 ?
                                    assessments.data.map((assessment, i) => (
                                        <View key={assessment.uuid}>
                                            <TouchableOpacity
                                                style={{
                                                    paddingTop: 15,
                                                    paddingBottom: 15,
                                                    borderBottomColor: expandedId === assessment.uuid ? 'transparent' : '#989898',
                                                    borderBottomWidth: 1,
                                                }}
                                                onPress={() => {
                                                    if (expandedId === assessment.uuid) {
                                                        setExpandedId('')
                                                    } else {
                                                        setExpandedId(assessment.uuid)
                                                    }
                                                }}
                                                activeOpacity={0.5}>
                                                <AssessmentItem assessment={assessment} key={`assessment-${i}`} />
                                            </TouchableOpacity>
                                            {expandedId === assessment.uuid && assessment.athleteCanComment &&
                                                <View
                                                    style={{
                                                        paddingBottom: 15,
                                                        borderBottomColor: '#989898',
                                                        borderBottomWidth: 1,
                                                        alignItems: 'center',
                                                    }}>
                                                    {assessment.comment && assessment.athleteCanComment &&
                                                        <ButtonText
                                                            onPress={() => confirmDeleteComment()}
                                                            type={"BIG"} text={""}>
                                                            <Text style={{
                                                                fontSize: 14,
                                                            }}>
                                                                Excluir comentário do atleta
                                                            </Text>
                                                        </ButtonText>
                                                    }
                                                    {assessment.advisorResponseComment && assessment.athleteCanComment &&
                                                        <ButtonText
                                                            onPress={() => confirmDeleteAdvisorComment()}
                                                            type={"BIG"} text={""}>
                                                            <Text style={{
                                                                fontSize: 14,
                                                            }}>
                                                                Excluir comentário assessoria
                                                            </Text>
                                                        </ButtonText>
                                                    }
                                                    {assessment.athleteCanComment &&
                                                        <>
                                                            <TextInput
                                                                variant="outlined"
                                                                color="#217DE9"
                                                                label="Responda esta avaliação"
                                                                onChangeText={(e) => setComent(e)}
                                                                value={coment}
                                                                numberOfLines={6}
                                                                multiline
                                                                style={styles().textInput}
                                                                inputStyle={styles().inputMultiple} />
                                                            {coment.length > 0 &&
                                                                <ButtonText
                                                                    onPress={() => responseAssessment()}
                                                                    type={"LITTLE"}
                                                                    text={"Responder"} />
                                                            }
                                                        </>
                                                    }
                                                </View>
                                            }
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
                                        Sua assessoria ainda não foi avaliada.
                                    </Text>
                                </View>
                            ) : <LoaddingView />}
                        </ScrollView>
                    </View>
                </>
            }
        </View>
    );
}


export {AssessmentsAdvisor}