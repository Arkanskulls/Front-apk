import { StyleSheet, TextStyle, ViewStyle, } from "react-native";

interface Styles {
    main: ViewStyle;
    textInput: ViewStyle;
    textTitle: TextStyle;
    textTileWithLogo : TextStyle;
    backgroundText: TextStyle;
    textLink: TextStyle;
    emailSymbolMargin: ViewStyle;
    passwordSynbolMargin: ViewStyle

}

export const styles = () => {
    const css = StyleSheet.create<Styles>({
        main: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#ffffff',
            width: '100%',
            paddingLeft: 14,
            paddingRight: 14
        },
        textInput: {
            width: '100%',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: '#217DE9',
            borderRadius: 25,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 12,
            paddingRight: 12,
            fontFamily: 'Poppins_400Regular',
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'row'
        },
        textTitle: {
            fontFamily: 'Poppins_400Regular',
            fontSize: 16,
            textAlign: 'center',
            paddingTop: 20
        },
        textTileWithLogo: {
            fontFamily: 'Poppins_500Medium',
            fontSize: 38,
            marginLeft: -15
        },
        backgroundText: {
            fontSize: 18, 
            width: '90%',
        },
        textLink: {
            fontFamily: 'Poppins_400Regular',
            fontSize: 16,
            textAlign: 'right',
            textDecorationLine: 'underline',
            color: '#217DE9'
        },
        emailSymbolMargin: {
            marginRight: 8, 
            marginLeft: 4,
            color: '#FA7921'
        },
        passwordSynbolMargin:{
            marginRight: 8,
            color: '#FA7921'
        }
    });

    return { ...css }
}