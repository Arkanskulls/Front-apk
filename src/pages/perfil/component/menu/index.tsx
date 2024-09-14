import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
import { styles } from "./styles";

interface MenuProps {
    section: string;
    icon: string;
    color?: string;
    onPress?: () => void;
}
const Menu = ({
    icon, section, onPress, color   
}: MenuProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles().main}>
            <View style={{
                width: 25,
            }}>
                <FontAwesome
                    name={icon as any}
                    size={22}
                    color={color ? color : '#FA7921'} />
            </View>
            <Text style={styles().text}>{section}</Text>
        </TouchableOpacity>
    )
}

export { Menu };