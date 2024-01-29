import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import colors from "../styles/colors";

const Indicator = () => {
    return (
        <View style={{
            backgroundColor: colors.PRIMARY_COLOR_TRANS,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            // marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <ActivityIndicator style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                // marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
            }} size="large" color={colors.PRIMARY_COLOR}/>
        </View>
    );
};
export default Indicator;
