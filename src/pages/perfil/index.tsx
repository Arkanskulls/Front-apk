import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Image, Alert, TouchableOpacity } from "react-native";

import { HeaderPage } from '../../components';
import LogoR from '../../assets/img/logo-r.png';

import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesome } from '@expo/vector-icons'; 
import { useAuth } from "../../hooks/auth";
import { useNavigation } from "@react-navigation/native";

import { Menu } from "./component/menu";
import { styles } from "./styles";
import { sections } from "./data";
import { MediaTypeOptions, PermissionStatus, launchImageLibraryAsync, useMediaLibraryPermissions } from "expo-image-picker";

type RootStackParamList = {
    Home: undefined;
    MyData: undefined;
};
  
type PerfilScreenProp = StackNavigationProp<RootStackParamList>;

const Perfil = () => {
    const [libraryPermissionInformation, requestPermission]= useMediaLibraryPermissions();
    const navigation = useNavigation<PerfilScreenProp>();
    const { user, uploadPerfilImage } = useAuth();

    async function verifyPermission(){
        if (libraryPermissionInformation && libraryPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse= await requestPermission();
    
            return permissionResponse.granted;
        }
        if (libraryPermissionInformation && libraryPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert(
                'Insufficient permission!',
                'You need to grant gallery access to use this app'
            );
            return false
        }
        return true;
    }

    async function camerapressHandler(){
        const hasPermission=await verifyPermission()
        if (!hasPermission){
            return;
        }
        const image=await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:0.5
        });
        if (image.assets) {
            try {
                const response = await uploadPerfilImage({
                    src: image.assets ? image.assets[0] : '',
                })
            } catch (error) {
            }
        }
    }
    
    return (
        <View style={styles().main}>
            <HeaderPage
                onBack={() => navigation.navigate('Home')}
                title={"Perfil"}/>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles().usernameAvatarView}>
                    {!user?.imageLink ?
                        <TouchableOpacity onPress={camerapressHandler}>
                            <View style={styles().cameraIcon}>
                                <FontAwesome
                                    onPress={camerapressHandler}
                                    name={'camera'}
                                    size={14}
                                    color={'#fff'}
                                    style={{
                                    }} />
                            </View>
                            <FontAwesome
                                onPress={camerapressHandler}
                                name={'user-circle'}
                                size={60}
                                color={'#FA7921'} />  
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={camerapressHandler}>
                            <View style={styles().cameraIcon}>
                                <FontAwesome
                                    onPress={camerapressHandler}
                                    name={'camera'}
                                    size={20}
                                    color={'#fff'}
                                    style={{
                                    }} />
                            </View>
                            <Image
                                source={{uri: user?.imageLink}} style={{
                                width: 80,
                                height: 80,
                                borderRadius: 50 }}/>
                        </TouchableOpacity>
                    }
                    <View style={styles().usernameView}>
                        <Text style={styles().usernameText}>{user?.name}</Text>
                        <Text
                            style={styles().usertypeText}>
                            {user?.type === 'ADVISOR' ? 'Assessoria' : 'Atleta'}
                        </Text>
                    </View>
                </View>
                <ScrollView style={styles().menu}>
                    {sections(user?.type).map(({id, icon, pageName, section, color, action}) => (
                        <Menu
                            onPress={() => pageName ? navigation.navigate(pageName as any) :
                                action ? action() : null} 
                            key={id}
                            section={section}
                            color={color}
                            icon={icon} />
                    ))}
                </ScrollView>
                <View style={styles().logo}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Image style={styles().logoR} source={LogoR}/>
                        <Text style={styles().textTileWithLogo}>unBuddy</Text>
                    </View>
                    <Text style={styles().version}>v1.0</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

export {Perfil}

