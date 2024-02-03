import React, {useEffect, useState} from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    Text, TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants, {ScreenName} from "../utils/Constants";
import fontDimen from "../styles/fontDimen";
import {showAlertWithButtons} from "../utils/Common";
import auth from "@react-native-firebase/auth";

let fromStr = "", messageStr;

const SendFeedbackScreen = ({navigation}) => {
    const [from, setFrom] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fromStr = ""
        messageStr = ""
    }, [])

    useEffect(() => {
        fromStr = from
        messageStr = message
    }, [from, message])

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
                    }}>{Constants.SEND_FEEDBACK}</Text>
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
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        submit()
                    }}
                >
                    <Image
                        source={
                            require('../assets/images/ic_tick.png')
                        }
                        style={{
                            width: 24,
                            height: 24,
                        }}
                    />
                </TouchableOpacity>
            )
        });
    }, []);
    const submit = async () => {
        console.log("", fromStr)
        if (fromStr.trim() === "") {
            alert(Constants.PLEASE_FROM_EMAIL)
        } else if (messageStr === "") {
            alert(Constants.PLEASE_MESSAGE)
        } else {
            showAlertWithButtons("",
                Constants.YOUR_FEEDBACK_SENT,
                Constants.OK,
                "",  (isBtn1Pressed) => {
                console.log("isBtn1Pressed",isBtn1Pressed)
                    if (isBtn1Pressed) {
                        navigation.goBack()
                    }
                })
        }
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.WHITE,
            paddingStart: 10,
            paddingEnd: 10,
        }}>
            <SafeAreaView/>
            <StatusBar translucent backgroundColor={colors.PRIMARY_COLOR}/>
            <View>
                <View style={{
                    flexDirection: "row",
                    marginTop: 20,
                }}>
                    <Text style={{
                        color: colors.BLACK,
                        fontFamily: fontStyle.SFProTextRegular,
                        fontWeight: 400,
                        fontSize: 16,
                        marginStart: 5,
                        flex: 1,
                    }}>
                        {Constants.FROM}
                    </Text>
                    <Text style={{
                        color: colors.GRAY_99_COLOR,
                        fontFamily: fontStyle.SFProTextRegular,
                        fontWeight: 400,
                        marginEnd: 10,
                        fontSize: 12
                    }}>
                        {Constants.REQUIRED}
                    </Text>
                </View>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    borderRadius: 10,
                    paddingStart: 10,
                    marginBottom: 15,
                    backgroundColor: colors.BG_TEXT_INPUT_COLOR
                }}>
                    <TextInput
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 16,
                            textAlign: 'left',
                            color: colors.BLACK,
                            fontFamily: fontStyle.SFProTextRegular
                        }}
                        value={from}
                        onChangeText={setFrom}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>
            </View>

            <View>
                <View style={{
                    flexDirection: "row",
                    marginTop: 10,
                }}>
                    <Text style={{
                        color: colors.BLACK,
                        fontFamily: fontStyle.SFProTextRegular,
                        fontWeight: 400,
                        fontSize: 16,
                        marginStart: 5,
                        flex: 1,
                    }}>
                        {Constants.MESSAGE}
                    </Text>
                    <Text style={{
                        color: colors.GRAY_99_COLOR,
                        fontFamily: fontStyle.SFProTextRegular,
                        fontWeight: 400,
                        marginEnd: 10,
                        fontSize: 12
                    }}>
                        {Constants.REQUIRED}
                    </Text>
                </View>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    borderRadius: 10,
                    paddingStart: 10,
                    paddingEnd: 10,
                    marginBottom: 15,
                    backgroundColor: colors.BG_TEXT_INPUT_COLOR
                }}>
                    <TextInput
                        style={{
                            flex: 1,
                            fontSize: 16,
                            textAlign: 'left', // for iOS
                            textAlignVertical: 'top', // for Android
                            color: 'black',
                            fontFamily: 'YourFontFamily', // specify your font family
                        }}
                        numberOfLines={6}
                        value={message}
                        onChangeText={setMessage}
                        autoCapitalize="none"
                        keyboardType="default"
                        multiline={true}
                    />
                </View>
            </View>
        </View>
    );
}

export default SendFeedbackScreen;
