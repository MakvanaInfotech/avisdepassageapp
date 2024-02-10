import React, {useEffect} from 'react';
import {
    Image,
    SafeAreaView, Share,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants, {ScreenName} from "../utils/Constants";
import fontDimen from "../styles/fontDimen";
import ConstantsFR from "../utils/ConstantsFR";

const AboutUsScreen = ({navigation}) => {
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
                    }}>{ConstantsFR.ABOUT_US}</Text>
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
            headerTintColor: colors.WHITE,
            color: colors.WHITE,
            headerTitle: () => renderTitle(),
        });
    }, []);

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.WHITE,
            paddingStart: 20,
            paddingEnd: 20,
        }}>
            <SafeAreaView/>
            <StatusBar translucent backgroundColor={colors.PRIMARY_COLOR}/>
            <View
                style={{
                    borderRadius: 20,
                    width: 80,
                    height: 70,
                    marginTop: 50,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.PRIMARY_COLOR,
                }}>
                <Image
                    style={{
                        width: 65,
                        height: 52,
                        marginTop: -10,
                    }}
                    source={require('../assets/images/ic_splash_logo.png')}/>
            </View>
            <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                    marginTop: 10,
                    color: colors.BLACK,
                    fontSize: 24,
                    fontFamily: fontStyle.SFProTextSemiBold,
                    overflow: 'hidden',
                    textAlign: "center"
                }}>{ConstantsFR.APP_TITLE}</Text>
            <View style={{
                flexDirection: 'row',
                marginTop: 20,
            }}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                        flex: 1,
                        marginTop: 10,
                        color: colors.BLACK,
                        fontSize: 14,
                        fontFamily: fontStyle.SFProTextSemiBold,
                        overflow: 'hidden',
                    }}>{ConstantsFR.AUTHOR}</Text>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                        marginTop: 10,
                        color: colors.BLACK,
                        fontSize: 14,
                        fontFamily: fontStyle.SFProTextSemiBold,
                        overflow: 'hidden',
                    }}>{ConstantsFR.BEN}</Text>
            </View>
            <View style={{
                marginTop: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
            }}/>

            <View style={{
                flexDirection: 'row',
                marginTop: 10,
            }}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                        flex: 1,
                        marginTop: 10,
                        color: colors.BLACK,
                        fontSize: 14,
                        fontFamily: fontStyle.SFProTextSemiBold,
                        overflow: 'hidden',
                    }}>{ConstantsFR.SHARE}</Text>
                <TouchableOpacity
                    onPress={() => {
                        Share.share({message: "https://play.google.com/store/apps/details?id=com.com.avisdepassage"})
                            .then((res) => console.log('Share result:', res))
                            .catch((err) => console.log('Share error:', err));
                    }}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            marginTop: 10,
                            color: colors.PRIMARY_COLOR,
                            fontSize: 14,
                            fontFamily: fontStyle.SFProTextSemiBold,
                            overflow: 'hidden',
                        }}>{ConstantsFR.SHARE_TXT}</Text>
                </TouchableOpacity>

            </View>
            <View style={{
                marginTop: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
            }}/>

            <View style={{
                flexDirection: 'row',
                marginTop: 10,
            }}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                        flex: 1,
                        marginTop: 10,
                        color: colors.BLACK,
                        fontSize: 14,
                        fontFamily: fontStyle.SFProTextSemiBold,
                        overflow: 'hidden',
                    }}>{ConstantsFR.SUPPORT}</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenName.SEND_FEEDBACK_SCREEN)
                    }}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            marginTop: 10,
                            color: colors.PRIMARY_COLOR,
                            fontSize: 14,
                            fontFamily: fontStyle.SFProTextSemiBold,
                            overflow: 'hidden',
                        }}>{ConstantsFR.SEND_FEEDBACK_}</Text>
                </TouchableOpacity>

            </View>

            <View style={{
                marginTop: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
            }}/>

        </View>
    );
}

export default AboutUsScreen;
