import { StyleSheet, TextStyle, ViewStyle} from "react-native";

interface Styles {
    main: ViewStyle;
    textInput: TextStyle;
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
            height: '70%',
            paddingLeft: 14,
            paddingRight: 14,
            paddingBottom: 10
        },
        textInput: {
            marginTop: 8,
            width: '100%',
        },
        titleDivisorArea: {
            fontFamily: 'Poppins_500Medium',
            fontSize: 20,
            marginBottom: 8,
            marginTop: 8,
            color: '#FA7921'
        },
        keybordViewPage: {
            flex: 1, 
            flexDirection: 'column',
            justifyContent: 'center', 
            backgroundColor: '#ffffff'
        }
    });

    return { ...css }
}