import { StyleSheet, TextStyle, ViewStyle} from "react-native";

interface Styles {
    container: ViewStyle;
    main: ViewStyle;
    text: TextStyle;
  
}

export const styles = () => {

    const css = StyleSheet.create<Styles>({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        main: {
            paddingTop: 15,
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
        },
        text: {
            fontSize: 18,
            textAlign: 'center',
            marginBottom: 20,
            fontFamily: 'Poppins_500Medium'
        }
    });

    return { ...css }
}