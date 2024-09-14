import { StyleSheet, ImageStyle, ViewStyle, TextStyle} from "react-native";

interface Styles {
    sxView: ViewStyle;
    sxData: ViewStyle;
    sxCol1: ViewStyle;
    perfilImage: ImageStyle;
    athleteName: TextStyle;
}

export const styles = () => {

    const css = StyleSheet.create<Styles>({
        sxView: {
            paddingBottom: 10,
            paddingTop: 10,
            borderBottomColor: '#217DE9',
            borderBottomWidth: 1,
        },
        sxData: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
        },
        sxCol1: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        perfilImage: {
            width: 40,
            height: 40,
            borderRadius: 50,
        },
        athleteName: {
            fontFamily: 'Poppins_500Medium',
            marginLeft: 10,
        },
    });

    return { css }
}