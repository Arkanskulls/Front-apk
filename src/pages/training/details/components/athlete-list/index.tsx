import React from "react"
import { View, Image, Text, TouchableOpacity } from "react-native"
import { FontAwesome5, Entypo } from '@expo/vector-icons';

import { styles } from './styles';

interface AthleteListProps {
    athlete: {
        name: string;
        email: string;
        telephone: string;
        imageLink?: string | undefined;
    };
    children: React.ReactNode;
}

const AthleteList: React.FC<AthleteListProps> = ({athlete, children}: AthleteListProps) => {
    
    const { css } = styles();
    return (
        <View style={{ ...css.sxView }}>
            <View style={{ ...css.sxData }}>
                <View style={{ ...css.sxCol1 }}>
                    {athlete.imageLink ?
                        <Image
                            source={{uri: athlete.imageLink}} style={{ ...css.perfilImage }}/> :
                        <FontAwesome5 size={30} name="user-circle" color={'#FA7921'} />
                    }
                    <Text style={{ ...css.athleteName }}>
                        {athlete.name}
                    </Text>
                </View>
                {children}
            </View>
        </View>
    )
}

export { AthleteList };