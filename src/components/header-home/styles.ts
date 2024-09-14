import { ImageStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";

interface Styles {
    main: ViewStyle;
    logo: ViewStyle;
    textTileWithLogo: TextStyle;
    logoR: ImageStyle;
    sxIcon: ViewStyle;
}

export const styles = () => {

    const css = StyleSheet.create<Styles>({
        main: {
            paddingLeft: 14,
            paddingRight: 14,
            width: '100%',
            paddingTop: 60,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
        },
        textTileWithLogo: {
            fontFamily: 'Poppins_500Medium',
            fontSize: 28,
            marginLeft: -8
        },
        logo: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        },
        logoR: {
            height: 35,
            width: 34,
            zIndex: 2,
        },
        sxIcon: {
            height: 35,
            width: 35,
            position: 'absolute',
            right: 0,
            bottom: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 14,
        },
    });

    return { ...css }
}