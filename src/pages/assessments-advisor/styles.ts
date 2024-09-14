import { StyleSheet, TextStyle, ViewStyle} from "react-native";

interface Styles {
    container: ViewStyle;
    main: ViewStyle;
    text: TextStyle;
    inputMultiple: TextStyle;
    textInput: TextStyle;
    titleSection: TextStyle;
}

export const styles = () => {

    const css = StyleSheet.create<Styles>({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        main: {
            paddingTop: 15,
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
        },
        text: {
            fontSize: 18,
            textAlign: 'center',
            marginBottom: 20,
            fontFamily: 'Poppins_500Medium'
        },
        textInput: {
            width: '100%',
            justifyContent: 'center', 
            borderColor: '#000',
        },
        titleSection: {
            fontFamily: 'Poppins_500Medium',
            fontSize: 14,
            paddingTop: 15,
            paddingBottom: 7,
            color: '#000',
        },
        inputMultiple: {
            color: '#217DE9',
            paddingTop: 15,
            paddingBottom: 15,
            fontFamily: 'Poppins_500Medium',
            fontSize: 12,
        },
    });

    return { ...css }
}