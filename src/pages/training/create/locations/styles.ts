import { StyleSheet, TextStyle, ViewStyle} from "react-native";

interface Styles {
    main: ViewStyle;
    textInput: TextStyle;
    input: TextStyle;
    titleDivisorArea: TextStyle;
    keybordViewPage: ViewStyle;
  
}

export const styles = () => {

    const css = StyleSheet.create<Styles>({
        main: {
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            backgroundColor: '#ffffff',
            width: '100%',
            height: '100%',
            paddingLeft: 14,
            paddingRight: 14,
            paddingBottom: 10
        },
        textInput: {
            marginTop: 6,
            marginBottom: 6,
            width: '100%',
            justifyContent: 'center', 
            borderColor: '#000',
        },
        titleDivisorArea: {
            fontFamily: 'Poppins_500Medium',
            fontSize: 16,
            marginBottom: 6,
            marginTop: 12,
            color: '#FA7921'
        },
        keybordViewPage: {
            flex: 1, 
            flexDirection: 'column',
            justifyContent: 'center', 
            backgroundColor: '#ffffff',
            paddingTop: 14,
        },
        input: {
            color: '#217DE9',
            fontFamily: 'Poppins_500Medium',
        }
    });

    return { ...css }
}