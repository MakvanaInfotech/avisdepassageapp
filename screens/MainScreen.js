import React, {useEffect, useState} from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    StyleSheet, TextInput, Image
} from 'react-native';
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants from "../styles/Constants";
import firestore from '@react-native-firebase/firestore';
import {storage} from "../App";
import fontDimen from "../styles/fontDimen";

const MainScreen = ({navigation}) => {


    const renderTitle = () => {
        return (
            <View style={{
                flexDirection: 'row',
                alignSelf: 'center',
            }}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                        color: colors.WHITE,
                        fontSize: fontDimen.font_14,
                        fontFamily: fontStyle.SFProTextBold,
                        overflow: 'hidden',
                        textAlign: "center"
                    }}>{Constants.REVIEWS}</Text>
            </View>
        );
    };
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: colors.PRIMARY_COLOR,
                flex: 1
            },
            // headerBackTitle: Constants.BACK,
            headerShadowVisible: false,
            headerTintColor: colors.WHITE,
            color: colors.WHITE,
            headerTitle: () => renderTitle(),
            headerRight: () => (
                <Image
                    source={
                        require('../assets/images/ic_menu.png')
                    }
                    tintColor={colors.WHITE}
                    style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        transform: [{ rotate: '90deg'}]
                    }}
                />
            )
        });
    }, []);

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.WHITE,
        }}>
            <SafeAreaView/>
            <StatusBar translucent backgroundColor={colors.PRIMARY_COLOR}/>
            <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                    marginTop:20,
                    color: colors.BLACK,
                    fontSize: fontDimen.font_14,
                    fontFamily: fontStyle.SFProTextBold,
                    overflow: 'hidden',
                    textAlign: "center"
                }}>{Constants.HOW_WAS_YOUR_LAST_DELIVERY}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    cityName: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    container: {
        flex: 1,
        backgroundColor: colors.BG_COLOR,
    },
    item: {
        backgroundColor: '#ffffff',
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
    },
    itemText: {
        fontSize: 16,
    },
});

export default MainScreen;
