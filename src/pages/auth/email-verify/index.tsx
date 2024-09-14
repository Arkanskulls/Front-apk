import React from "react";
import { Alert, Image, SafeAreaView, Text, View } from "react-native";
import CountDown from 'react-native-countdown-component';

import { styles } from "./styles";
import LogoR from '../../../assets/img/logo-r.png'
import { ButtonText } from "../../../components";
import { isVerified, sendLink } from "../../../services";
import { useAuth } from "../../../hooks/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
    Login: undefined;
};
  
type VerifyScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

const EmailVerify = () => {

    const navigation = useNavigation<VerifyScreenProp>();
    const { main, indicator, textTileWithLogo, wrapperLogo,
        textAwaiting, textInfo, countText } = styles();

    const {user} = useAuth();

    const verify = async () => {
        const response = await isVerified({
            uuid: user?.uuid as string,
        })

        if(response === 'OK') {
            Alert.alert(
                'Seu login está pronto.',
                'Vamos correr!',
                [
                  {text: 'Ok', onPress: () => {
                    navigation.navigate('Login')
                  }},
                ],
            );
        } else {
            Alert.alert(
                'Oops!',
                'Você ainda não verificou seu e-mail',
                [
                    {text: 'Cancelar', onPress: () => {
                        navigation.navigate('Login')
                    }},
                    {text: 'Tentar novamente'},
                ],
            );
        }
    }
    
    return (
        <SafeAreaView style={main}>
            <View style={wrapperLogo}>
                <Image source={LogoR}/>
                <Text style={textTileWithLogo}>unBuddy</Text>
            </View>
            <View style={indicator}>
                <Text style={textAwaiting}>Estamos te esperando</Text>
                <Text style={textInfo}>Enviamos um link no seu e-mail para que você confirme através dele seu amor por correr!</Text>
                <Text style={countText}>Seja rápido: O link irá expirar em 10 minutos.</Text>
                {/* <CountDown
                    until={600}
                    digitStyle={{
                        backgroundColor: '#FA7921',
                    }}
                    digitTxtStyle={{
                        color: '#fff'
                    }}
                    timeLabels={{
                        h: 'Horas',
                        m: 'Minutos',
                        s: 'Segundos',
                    }}
                    timeToShow={['H', 'M', 'S']}
                    size={20}
                    /> */}
            </View>
            <View style={wrapperLogo}>
                <ButtonText onPress={() => verify()} type="BIG" text="FEITO!"/>
            </View>
        </SafeAreaView >
    )
}

export { EmailVerify };