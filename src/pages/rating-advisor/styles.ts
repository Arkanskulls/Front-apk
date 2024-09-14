import { StyleSheet, TextStyle, ViewStyle} from "react-native";

interface Styles {
    container: ViewStyle;
    keybordViewPage: ViewStyle;
    main: ViewStyle;
    text: TextStyle;
    titleSection: TextStyle;
    advisorName: TextStyle;
    inputMultiple: TextStyle;
    textInput: TextStyle;
}

export const styles = () => {

    const css = StyleSheet.create<Styles>({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        main: {
            backgroundColor: '#fff',
            marginTop: 15,
            flex: 1,
        },
        text: {
            fontSize: 18,
            textAlign: 'center',
            marginBottom: 20,
            fontFamily: 'Poppins_500Medium'
        },
        titleSection: {
            fontFamily: 'Poppins_500Medium',
            fontSize: 14,
            paddingTop: 15,
            paddingBottom: 7,
            color: '#217DE9',
            textAlign: 'center',
        },
        advisorName: {
            textAlign: 'center',
            fontFamily: 'Poppins_500Medium',
            fontSize: 22,
            paddingTop: 10,
            color: '#FA7921',
        },
        textInput: {
            width: '100%',
            justifyContent: 'center', 
            borderColor: '#000',
        },
        inputMultiple: {
            color: '#217DE9',
            paddingTop: 15,
            paddingBottom: 15,
            fontFamily: 'Poppins_500Medium',
            fontSize: 12,
        },
        keybordViewPage: {
            flex: 1, 
            flexDirection: 'column',
            justifyContent: 'center', 
            backgroundColor: '#ffffff',
            paddingTop: 14,
        }
    });

    return { ...css }
}