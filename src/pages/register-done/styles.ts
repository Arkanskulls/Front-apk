import { StyleSheet, TextStyle, ViewStyle} from "react-native";

interface Styles {
    container: ViewStyle;
    main: ViewStyle;
    textInscription: TextStyle;
    trainingName: TextStyle;
    textEmail: TextStyle;
}

export const styles = () => {

    const css = StyleSheet.create<Styles>({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        main: {
            height: '70%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        textInscription: {
            fontFamily: 'Poppins_400Regular',
            fontSize: 16,
            textAlign: 'center',
            padding: 15,
            paddingBottom: 0,
        },
        trainingName: {
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 24,
            paddingLeft: 15,
            paddingRight: 15,
            textAlign: 'center',
            paddingBottom: 0,
            color: '#217DE9',
        },
        textEmail: {
            fontFamily: 'Poppins_400Regular',
            fontSize: 14,
            textAlign: 'center',
            padding: 15,
            paddingBottom: 0,
        }
    });

    return { css }
}