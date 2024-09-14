import { ImageStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";

interface Styles {
    main: ViewStyle;
    image: ImageStyle;
    title: TextStyle;
    buttomGroup: ViewStyle;
    buttom: ViewStyle;
    buttomDiv: ViewStyle;
    divisor: ViewStyle;
    textButtom: TextStyle;
}

export const styles = () => {

    const css = StyleSheet.create<Styles>({
        main: {
            marginBottom: 15,
            borderRadius: 10,
        },
        title: {
            position: 'absolute',
            bottom: 0,
            fontFamily: 'Poppins_500Medium',
            color: '#FA7921',
            fontSize: 18,
            paddingLeft: 10,
        },
        image: {
            width: '100%',
            height: 100,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
        },
        buttomGroup: {
            flexDirection: 'row',
            backgroundColor: '#FA7921',
            height: 50,
            alignItems: 'center',
            borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
        },
        buttom: {
            width: '100%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        buttomDiv: {
            width: '50%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        divisor: {
            width: 1,
            height: 40,
            backgroundColor: 'white',
        },
        textButtom: {
            marginTop: 2,
            color: '#fff',
            paddingLeft: 5,
            fontFamily: 'Poppins_500Medium',
        },
    });

    return { css }
}