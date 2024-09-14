import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'; 

import LogoR from '../../assets/img/logo-r.png';
import {styles} from './styles';
import { useAuth } from "../../hooks/auth";

interface HeaderPageProps {
    navTo?: () => void;
}

const HeaderHome = ({navTo}: HeaderPageProps) => {

    const { user } = useAuth();
    return (
        <View style={styles().main}>
            <View style={styles().logo}>
                <Image style={styles().logoR} source={LogoR}/>
                <Text style={styles().textTileWithLogo}>unBuddy</Text>
            </View>

            {user?.imageLink ?
                <TouchableOpacity style={styles().sxIcon} onPress={navTo}>
                    <Image
                    source={{uri: user?.imageLink}} style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50 }}/>
                </TouchableOpacity> :
                <TouchableOpacity style={styles().sxIcon} onPress={navTo}>
                    <FontAwesome5 size={30} name="user-circle" color={'#FA7921'} />
                </TouchableOpacity>
            }
        </View>
    );
}

export {HeaderHome}