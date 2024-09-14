import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import {styles} from './styles'

interface HeaderPageProps {
    title: string;
    onBack?: () => void;
}

const HeaderPage = ({title, onBack}: HeaderPageProps) => {
    return (
        <View style={styles(!!onBack).main}>
            {onBack &&
                <TouchableOpacity style={{ zIndex: 10 }} onPress={onBack}>
                    <AntDesign size={24} name="left" color={'#FA7921'} />
                </TouchableOpacity>
            }
            <Text style={styles(!!onBack).title}>
                    {title}
                </Text>
            <View></View>
        </View>
    );
}

export {HeaderPage}