import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from "@react-native-material/core";
import { AntDesign } from '@expo/vector-icons'; 

interface RadionButtonProps {
    label: string;
    selected?: boolean;
    onPress?: () => void;
}

const RadioButton = ({label, selected, onPress}: RadionButtonProps) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 35
            }}>
                <View style={{
                    height: 20,
                    width: 20,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#FA7921',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {
                    selected ?
                        <View style={{
                        height: 10,
                        width: 10,
                        borderRadius: 6,
                        backgroundColor: '#FA7921',
                        }}/>
                        : null
                    }
                </View>
                <Text style={{
                    fontSize: 20,
                    marginLeft: 8,
                    textAlign: 'center',
                    fontFamily: 'Poppins_500Medium'}}>{label}</Text>
            </TouchableOpacity>
            
        </View>
    );
}

export {RadioButton}