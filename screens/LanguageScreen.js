import React, {useEffect} from 'react';
import {
    Image,
    Linking,
    Platform,
    SafeAreaView, ScrollView,
    StatusBar, StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants, {ScreenName} from "../utils/Constants";
import fontDimen from "../styles/fontDimen";
import ConstantsFR from "../utils/ConstantsFR";
import {changeLanguage, language} from "../App";
import {CommonActions} from "@react-navigation/native";

const LanguageScreen = ({navigation}) => {

    const renderTitle = () => {
        return (
            <View style={{
                flexDirection: 'row',
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
                    }}>{ConstantsFR.LANGUAGE}</Text>
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
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerBackTitle: ConstantsFR.BACK,
            headerTintColor: colors.WHITE,
            color: colors.WHITE,
            headerTitle: () => renderTitle(),
        });
    }, []);

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.PRIMARY_COLOR_BG,
        }}>
            <SafeAreaView/>
            <StatusBar translucent backgroundColor={colors.PRIMARY_COLOR}/>
            <View style={{
                padding:16,
            }}>
                <View style={{
                    flexDirection: 'row',
                    borderRadius: 10,
                    padding: 13,
                    marginBottom: 15,
                    backgroundColor: colors.WHITE
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            changeLanguage("fr", navigation)
                        }}
                        style={{
                            paddingEnd: 10,
                            width: "100%",
                            alignSelf: 'center',
                        }}>
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: colors.WHITE
                            }}>
                            <Text
                                style={{
                                    marginStart: 10,
                                    fontSize: 16,
                                    fontWeight: 400,
                                    fontFamily: fontStyle.SFProTextRegular,
                                    color: colors.BLACK,
                                }}>
                                {ConstantsFR.FRENCH}
                            </Text>

                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                flexDirection: 'row'
                            }}>
                                {(
                                    language === "fr" &&
                                    <Image
                                        style={{
                                            width: 20,
                                            height: 20,
                                        }}
                                        resizeMode={'contain'}
                                        tintColor={colors.PRIMARY_COLOR}
                                        source={require('../assets/images/ic_right.png')}>
                                    </Image>
                                )}

                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row',
                    borderRadius: 10,
                    padding: 13,
                    marginBottom: 15,
                    backgroundColor: colors.WHITE
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            changeLanguage("en", navigation)
                        }}
                        style={{
                            paddingEnd: 10,
                            width: "100%",
                            alignSelf: 'center',
                        }}>
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: colors.WHITE
                            }}>
                            <Text
                                style={{
                                    marginStart: 10,
                                    fontSize: 16,
                                    fontWeight: 400,
                                    fontFamily: fontStyle.SFProTextRegular,
                                    color: colors.BLACK,
                                }}>
                                {ConstantsFR.ENGLISH}
                            </Text>

                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                flexDirection: 'row'
                            }}>
                                {(
                                    language === "en" &&
                                    <Image
                                        style={{
                                            width: 20,
                                            height: 20,
                                        }}
                                        resizeMode={'contain'}
                                        tintColor={colors.PRIMARY_COLOR}
                                        source={require('../assets/images/ic_right.png')}>
                                    </Image>
                                )}

                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


            <SafeAreaView/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.BLACK
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: colors.BLACK
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});
export default LanguageScreen;
