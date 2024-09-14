import { ImageStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";

interface Styles {
    main: ViewStyle;
    menu: ViewStyle;
    textTileWithLogo: TextStyle;
    version: TextStyle;
    logo: ViewStyle;
    logoR: ImageStyle;
    usernameAvatarView: ViewStyle;
    usernameView: ViewStyle;
    usernameText: TextStyle;
    usertypeText: TextStyle;
    cameraIcon: ViewStyle;
}

export const styles = () => {

    const css = StyleSheet.create<Styles>({
        main: {
            flex: 1,
            backgroundColor: '#ffffff',
        },
        menu: {
            flex: 1,
            padding: 14,
        },
        textTileWithLogo: {
            fontFamily: 'Poppins_500Medium',
            fontSize: 18,
            marginLeft: -8
        },
        logo: {
            alignItems: 'center',
            width: '100%',
            paddingTop: 20,
            height: 120,
        },
        logoR: {
            height: 25,
            width: 25,
            zIndex: 2,
        },
        version: {
            color: 'grey',
            fontSize: 14,
            fontFamily: 'Poppins_500Medium',
        },
        usernameAvatarView: {
            flexDirection: 'row',
            padding: 14,
            paddingTop: 42,
            alignItems: 'center',
        },
        usernameView: {
            paddingLeft: 14
        },
        usernameText: {
            fontFamily: 'Poppins_500Medium',
            fontSize: 20,
        },
        usertypeText: {
            fontFamily: 'Poppins_500Medium',
            fontSize: 16
        },
        cameraIcon: {
            position: 'absolute',
            zIndex: 2,
            top: -8,
            right: -8,
            backgroundColor: '#217DE9',
            padding: 6,
            borderRadius: 200,
        }
    });

    return { ...css }
}