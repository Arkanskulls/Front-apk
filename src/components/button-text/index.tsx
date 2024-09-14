import React, { Children } from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonTextProps {
    type: 'BIG' | 'MEDIUM' | 'LITTLE';
    text: string;
    onPress?: () => void;
    children?: React.ReactNode;
}

const ButtonText = ({type, text, onPress, children}: ButtonTextProps) => {

    const handleType = (type: string) => {
        switch(type) {
            case 'BIG':
                return {
                    width: 250,
                    fontSize: 24
                };
            case 'MEDIUM':
                return {
                    width: 250,
                    fontSize: 20
                };
            case 'LITTLE':
                return {
                    width: 150,
                    fontSize: 16
                };
            default:
                return {
                    width: 250,
                    fontSize: 20
                };
        }
    }
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: '#FA7921',
                width: '100%',
                maxWidth: handleType(type).width,
                padding: 8,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                marginLeft: 5,
                marginRight: 5,
                marginBottom: 10
            }}
        >
            <Text style={{
                fontSize: handleType(type).fontSize,
                fontWeight: '600',
                fontFamily: 'Poppins_600SemiBold',
                color: '#ffffff'
            }}
            >
                {text}
                {children}
            </Text>
        </TouchableOpacity>
    );
}

export {ButtonText}