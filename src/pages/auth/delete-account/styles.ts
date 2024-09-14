import { StyleSheet, TextStyle, ViewStyle} from "react-native";

interface Styles {
    main: ViewStyle;
    textInput: TextStyle;
    textInfoInput: TextStyle;
    wrapperButton: ViewStyle;
    wrapperForm: ViewStyle;
    error: TextStyle;
    keybordViewPage: ViewStyle;
}

export const styles = () => {

    const css = StyleSheet.create<Styles>({
        main: {
            flex: 1,
            backgroundColor: '#ffffff',
            width: '100%',
            paddingLeft: 14,
            paddingRight: 14,
            paddingBottom: 10
        },
        keybordViewPage: {
            flex: 1, 
            flexDirection: 'column',
            justifyContent: 'center', 
            backgroundColor: '#ffffff'
        },
        textInput: {
            marginTop: 8,
            width: '100%',
            backgroundColor: '#ffffff',
            justifyContent: 'center', 
        },
        textInfoInput: {
            fontFamily: 'Poppins_400Regular',
            fontSize: 16,
            color: '#FA7921',
            textAlign: 'center',
            fontWeight: '700',
            margin: 10,
        },
        wrapperForm: {
            height: '40%',
            flexDirection: 'column',
            padding: 15,
        },
        wrapperButton: {
            height: '50%',
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