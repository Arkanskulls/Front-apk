import { Image, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5, Foundation } from '@expo/vector-icons'; 
import { TrainingCompleteForm, TrainingListCompleteForm } from "../../../../interfaces"

import { styles } from './styles';
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
    DetailsTraining: {training: TrainingListCompleteForm; fromActive?: boolean;};
    RatingAdvisor: {training: TrainingListCompleteForm};
};
  
type DetailsScreenProp = StackNavigationProp<RootStackParamList>;

const TrainingItem: React.FC<{training: TrainingListCompleteForm; fromActive?: boolean; fromHistoric?: boolean}> = ({training, fromActive, fromHistoric}: {training: TrainingListCompleteForm; fromActive?: boolean; fromHistoric?: boolean}) => {

    
    const { css } = styles();

    const navigation = useNavigation<DetailsScreenProp>();

    return (
        <View
            style={css.main}>
            <View>
                <Image style={css.image} source={{uri: training.training.imgLink}}/>
                <Text style={css.title}>{training.training.name}</Text>
            </View>
            <View style={css.buttomGroup}>
                {!fromHistoric ?
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("DetailsTraining", {
                                training: training,
                                fromActive: fromActive,
                            })
                        }}
                        style={css.buttom}>
                        <FontAwesome5 name="eye" size={22} color="#fff" />
                        <Text style={css.textButtom}>Ver detalhes</Text>
                    </TouchableOpacity> :
                    <>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("DetailsTraining", {
                                    training: training,
                                    fromActive: fromActive,
                                })
                            }}
                            style={css.buttomDiv}>
                            <FontAwesome5 name="eye" size={22} color="#fff" />
                            <Text style={css.textButtom}>Ver detalhes</Text>
                        </TouchableOpacity>
                        <View style={css.divisor}></View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("RatingAdvisor", {
                                    training: training,
                                })
                            }}
                            style={css.buttomDiv}>
                            <Foundation name="star" size={24} color="#fff" />
                            <Text style={css.textButtom}>Avaliar</Text>
                        </TouchableOpacity>
                    </>
                }
            </View>
        </ View>
    )
}

export { TrainingItem };