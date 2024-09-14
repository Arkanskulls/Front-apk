import { Text, View } from "react-native";
import { LocationForm } from "../../../interfaces";
import { ButtonText } from "../../../components";
import openMap, { createOpenLink } from 'react-native-open-maps';
import { styles } from "./styles";


interface AddressListProps {
    address: LocationForm;
    support?: boolean,
}   
const AddressList: React.FC<AddressListProps> = ({
    address, support
}: AddressListProps) => {

    const openMap = createOpenLink({
        query: `${address.street} ${address.number} ${address.neighborhood} ${address.city} ${address.state} ${address.cep}`,
        travelType: 'walk',
        zoom: 500
    });

    return (
        <View
            style={{
                ...styles().viewAddressInfo,
                }}>
            <Text style={styles().addressText}>
                {`${address.cep} - ${address.city} - ${address.neighborhood} - ${address.street} - ${address.number}`}
            </Text>
            <View
                style={{
                    width: '40%',
                    alignItems: 'flex-end',
                }}>
                <ButtonText
                    onPress={openMap}
                    type={"LITTLE"} text={"Ver no mapa"} />
            </View>
        </View>
    )
}

export { AddressList };
