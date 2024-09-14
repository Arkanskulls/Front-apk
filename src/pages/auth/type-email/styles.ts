import { StyleSheet, TextStyle, ViewStyle} from "react-native";

interface Styles {
    main: ViewStyle;
    viewTextInput: ViewStyle;
    wrapperButton: ViewStyle;
    wrapperInfo: ViewStyle;
    textInput: TextStyle;
    textInfo: TextStyle;
    textInfoInput: TextStyle;
    textEmail: TextStyle;
    error: TextStyle;
    keybordViewPage: ViewStyle;
  
}

export const styles = () => {

    const css = StyleSheet.create<Styles>({
        main: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#ffffff',
            width: '100%',
            paddingLeft: 14,
            paddingRight: 14,
            paddingBottom: 10
        },
        viewTextInput: {
            width: '100%',
            height: '30%',
        },
        textInput: {
            marginTop: 20,
            width: '100%',
            backgroundColor: '#ffffff',
            justifyContent: 'center', 
        },
        textInfo: {
            fontFamily: 'Poppins_400Regular',
            fontSize: 16,
            textAlign: 'center',
            color: '#909090',
        },
        textInfoInput: {
            fontFamily: 'Poppins_400Regular',
            fontSize: 16,
            textAlign: 'center',
            color: '#FA7921',
        },
        textEmail: {
            fontFamily: 'Poppins_500Medium',
            fontSize: 16,
            textAlign: 'center',
            color: '#217DE9'
        },
        keybordViewPage: {
            flex: 1, 
            flexDirection: 'column',
            justifyContent: 'center', 
            backgroundColor: '#ffffff'
        },
        wrapperInfo: {
            height: '30%',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
        },
        wrapperButton: {
            height: '30%',
            alignItems: 'flex-end',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        error: {
            color: 'red',
        },
    });

    return { ...css }
}