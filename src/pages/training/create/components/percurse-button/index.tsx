import React from "react"
import { TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'; 

interface PercurseButtonProps {
    title: string;
    onPress: () => void;
}

import { styles } from './styles';

const PercurseButton = ({
    title, onPress
}: PercurseButtonProps) => {

    const { css } = styles();
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ ...css.main }}>
            <FontAwesome5 name="map" size={24} color='#FA7921' />
            <Text style={{ ...css.textButton }}>{title}</Text>
        </TouchableOpacity>
    )
}

export { PercurseButton };
