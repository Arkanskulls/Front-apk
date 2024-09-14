import { StyleSheet, TextStyle, ViewStyle} from "react-native";

interface Styles {
    container: ViewStyle;
    main: ViewStyle;
    text: TextStyle;
    titleSection: TextStyle;
    descriptionText: TextStyle;
    locationText: TextStyle;
    trainingName: TextStyle;
    titleAssessment: TextStyle;
    divisor: ViewStyle;
    divisorAssessment: ViewStyle;
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
            paddingTop: 7,
            paddingBottom: 7,
            color: '#217DE9',
        },
        titleAssessment: {
            fontFamily: 'Poppins_500Medium',
            fontSize: 16,
            paddingTop: 7,
            paddingBottom: 15,
            color: '#FA7921',
        },
        descriptionText: {
            fontFamily: 'Poppins_400Regular',
            fontSize: 14,
            paddingBottom: 15,
        },
        locationText: {
            fontFamily: 'Poppins_400Regular',
            fontSize: 14,
            color: '#000',
        },
        trainingName: {
            fontFamily: 'Poppins_500Medium',
            fontSize: 22,
            paddingTop: 5,
            color: '#FA7921',
        },
        divisor: {
            width: '100%',
            height: 1,
            backgroundColor: '#FA7921',
        },
        divisorAssessment: {
            width: '100%',
            height: 1,
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: '#d9d9d9',
        }
    });

    return { ...css }
}