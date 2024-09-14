import { Image, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5, Foundation } from '@expo/vector-icons'; 
import { TrainingCompleteForm } from "../../../../interfaces"

import { styles } from './styles';
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
    Details: {training: TrainingCompleteForm};
};
  
type DetailsScreenProp = StackNavigationProp<RootStackParamList>;

interface TrainingItemProps {
    training: TrainingCompleteForm;
    suspenderAction?: () => void;
}

const TrainingItem: React.FC<TrainingItemProps> = ({training, suspenderAction}: TrainingItemProps) => {
    
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
                        navigation.navigate("Details", {
                            training: training,
                        })
                    }}
                    style={css.buttom}>
                    <FontAwesome5 name="eye" size={22} color="#fff" />
                    <Text style={css.textButtom}>Ver detalhes</Text>
                </TouchableOpacity>
                <View style={css.divisor}></View>
                <TouchableOpacity
                    onPress={suspenderAction}
                    style={css.buttom}>
                    {training.isActive ?
                    <>
                        <Foundation name="pause" size={24} color="#fff" />
                        <Text style={css.textButtom}>Suspender</Text>
                    </> :
                    <>
                        <Foundation name="play" size={24} color="#fff" />
                        <Text style={css.textButtom}>Ativar</Text>
                    </> 
                    }
                </TouchableOpacity>
            </View>
        </ View>
    )
}

export { TrainingItem };