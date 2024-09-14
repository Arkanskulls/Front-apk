import { StyleSheet, TextStyle, ViewStyle} from "react-native";

interface Styles {
    main: ViewStyle;
    title: TextStyle;
  
}

export const styles = (onBack: boolean) => {

    const css = StyleSheet.create<Styles>({
        main: {
            paddingLeft: 14,
            paddingRight: 14,
            paddingBottom: 8,
            width: '100%',
            paddingTop: 65,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderBottomColor: '#FA7921',
            borderBottomWidth: 1,
        },
        title: {
            width: '100%',
            fontSize: 20,
            top: 2,
            textAlign: 'left',
            left: 20,
            fontFamily: 'Poppins_500Medium',
        }
    });

    return { ...css }
}