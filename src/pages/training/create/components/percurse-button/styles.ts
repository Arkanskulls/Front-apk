import { StyleSheet, TextStyle, ViewStyle} from "react-native";

interface Styles {
    main: ViewStyle;
    textButton: TextStyle;
}

export const styles = () => {

    const css = StyleSheet.create<Styles>({
        main: {
            width: '100%',
            flexDirection: 'row',
            padding: 10,
            borderBottomWidth: 0.7,
            borderBottomColor: '#FA7921',
        },
        textButton: {
            paddingLeft: 10,
            fontSize: 18,
            fontFamily: 'Poppins_500Medium'
        },
    });

    return { css }
}