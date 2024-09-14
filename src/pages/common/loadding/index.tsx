import React from "react";
import { ActivityIndicator, View } from "react-native";

const LoaddingView: React.FC = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center',}}>
            <ActivityIndicator size={'large'} color={'#FA7921'} />
        </View>
    )
}

export {LoaddingView}