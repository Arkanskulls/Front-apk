import { StyleSheet, TextStyle, ViewStyle} from "react-native";

interface Styles {
    main: ViewStyle;
    text: TextStyle;
}

export const styles = () => {

    const css = StyleSheet.create<Styles>({
        main: {
            borderBottomWidth: 1,
            borderBottomColor: '#217DE9',
            display: 'flex',
            flexDirection: 'row',
            padding: 14,
            paddingRight: 14,
            paddingLeft: 14,
            alignItems: 'center',
        },
        text: {
            fontFamily: 'Poppins_500Medium',
            fontSize: 18,
            marginLeft: 6,
        },
    });

    return { ...css }
}