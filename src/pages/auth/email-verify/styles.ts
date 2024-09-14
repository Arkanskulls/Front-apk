import { StyleSheet, TextStyle, ViewStyle, } from "react-native";

interface Styles {
    main: ViewStyle;
    indicator: ViewStyle;
    wrapperLogo: ViewStyle;
    textTileWithLogo : TextStyle;
    textAwaiting : TextStyle;
    textInfo : TextStyle;
    countText : TextStyle;
}

export const styles = () => {
    const css = StyleSheet.create<Styles>({
        main: {
            flex: 1,
            backgroundColor: '#ffffff',
            width: '100%',
            height: '20%',
            paddingLeft: 14,
            paddingRight: 14
        },
        indicator: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingLeft: 14,
            paddingRight: 14,
        },
        wrapperLogo: {
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            width: '100%',
            height: '30%',
        },
        textTileWithLogo: {
            fontFamily: 'Poppins_500Medium',
            fontSize: 38,
            marginLeft: -15
        },
        textAwaiting: {
            fontFamily: 'Poppins_500Medium',
            marginTop: 50,
            fontSize: 24,
        },
        textInfo: {
            fontFamily: 'Poppins_400Regular',
            fontSize: 16,
            textAlign: 'center',
        },
        countText: {
            fontFamily: 'Poppins_400Regular',
            fontSize: 14,
            marginTop: 15,
            textAlign: 'center',
        }
    });

    return { ...css }
}