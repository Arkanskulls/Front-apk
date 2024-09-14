import { Image, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { TrainingCompleteForm } from "../../../../../interfaces"

import { styles } from './styles';
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
    DetailsHistoric: {training: TrainingCompleteForm};
};
  
type DetailsScreenProp = StackNavigationProp<RootStackParamList>;

const TrainingItem: React.FC<{training: TrainingCompleteForm}> = ({training}: {training: TrainingCompleteForm}) => {

    
    const { css } = styles();

    const navigation = useNavigation<DetailsScreenProp>();

    return (
        <View
            style={css.main}>
            <View>
                <Image style={css.image} source={{uri: training.imgLink}}/>
                <Text style={css.title}>{training.name}</Text>
            </View>
            <View style={css.buttomGroup}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("DetailsHistoric", {
                            training: training,
                        })
                    }}
                    style={css.buttom}>
                    <FontAwesome5 name="eye" size={22} color="#fff" />
                    <Text style={css.textButtom}>Ver detalhes</Text>
                </TouchableOpacity>
            </View>
        </ View>
    )
}

export { TrainingItem };