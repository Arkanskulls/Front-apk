import { StyleSheet, TextStyle, ViewStyle} from "react-native";

interface Styles {
    main: ViewStyle;
    titleDivisorArea: TextStyle;
    viewAddressInfo: ViewStyle;
    addressText: TextStyle;
}

export const styles = () => {

    const css = StyleSheet.create<Styles>({
        main: {
            paddingBottom: 20,
        },
        titleDivisorArea: {
            fontFamily: 'Poppins_500Medium',
            fontSize: 16,
            marginBottom: 6,
            marginTop: 12,
            color: '#FA7921'
        },
        viewAddressInfo: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 10,
        },
        addressText: {
            width: '50%',
            fontFamily: 'Poppins_400Regular',
        },
    });

    return { ...css }
}