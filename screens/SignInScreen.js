import React, {useEffect, useState} from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    StatusBar,
    Text,
    TextInput, TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants, {firebaseAnalytic, ScreenName} from "../utils/Constants";
import {performEmailSignIn} from "../services/AuthService";
import {signUpHelper} from "../services/NavigationService";


export function SignInScreen({navigation}) {
    const [loader, setLoader] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    const handleEmailSignIn = async (navigation) => {
        try {
            setLoader(true);
            await performEmailSignIn(email, password, (error, userCredential) => {
                if (error) {
                    setLoader(false);
                    if (error.code === 'auth/invalid-credential') {
                        Alert.alert("", Constants.INVALID_VALIDATION_MSG);
                    } else if (error.code === 'auth/invalid-email') {
                        Alert.alert("", Constants.EMAIL_INVALID_VALIDATION_MSG);
                    } else if (error.code === 'auth/too-many-requests') {
                        Alert.alert(Constants.MANY_REQ_TITLE_MSG, Constants.MANY_REQ_VALIDATION_MSG);
                    } else {
                        console.log("Error in sign up process:", error);
                    }
                    firebaseAnalytic(Constants.AUTH_EVENT, {
                        eventName: Constants.SIGN_IN_EMAIL,
                        Message: "Failed",
                        Error: JSON.stringify(error)
                    })
                } else {
                    if (!userCredential.user.emailVerified) {
                        setLoader(false);
                    }
                    signUpHelper(navigation, userCredential, true, true, password);
                }
            });
        } catch (error) {
            setLoader(false);
            console.log('Error in handleEmailSignUp:', error);
        }
    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.PRIMARY_COLOR,
            // alignItems: 'center',
            // justifyContent: 'center',
        }}>
            <SafeAreaView/>
            <StatusBar translucent backgroundColor={colors.PRIMARY_COLOR}/>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
                style={{
                    position: 'absolute',
                    top: 50,
                    left: 10,
                }}>
                <Image
                    resizeMode={'contain'}
                    style={{
                        width: 24, height: 24,
                        transform: [{rotate: '180deg'}]
                    }}
                    tintColor={colors.WHITE}
                    source={require('../assets/images/ic_chevron.png')}/>
            </TouchableOpacity>

            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                marginStart: 10,
                marginEnd: 10,
                flexDirection: 'column'
            }}>

                <Image
                    style={{width: 211, height: 185}}
                    source={require('../assets/images/ic_splash_logo.png')}/>
                <Text
                    style={{
                        marginTop: 50,
                        marginStart: 10,
                        fontSize: 16,
                        fontWeight: 400,
                        fontFamily: fontStyle.SFProTextRegular,
                        color: colors.WHITE,
                    }}>
                    {Constants.SIGN_IN_WITH_EMAIL}
                </Text>
                <View style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    borderRadius: 10,
                    paddingStart: 10,
                    marginBottom: 15,
                    backgroundColor: colors.WHITE
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
                        value={email}
                        onChangeText={setEmail}
                        placeholder={Constants.ENTER_YOUR_EMAIL}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    borderRadius: 10,
                    paddingStart: 10,
                    marginBottom: 15,
                    backgroundColor: colors.WHITE
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
                        value={password}
                        onChangeText={setPassword}
                        placeholder={Constants.ENTER_YOUR_PASSWORD}
                        autoCapitalize="none"
                        secureTextEntry={hidePassword}
                    />
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={{
                            position: 'absolute',
                            right: 10, // Adjust the right position of the eye icon
                            top: 10, // Adjust the top position of the eye icon
                        }}
                    >
                        <Image
                            style={{width: 24, height: 24}}
                            source={hidePassword ?
                                require('../assets/images/ic_eye_hide.png') :
                                require('../assets/images/ic_eye_visible.png')}/>
                    </TouchableOpacity>
                </View>

                <View style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    borderRadius: 10,
                    // paddingStart: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                    backgroundColor: colors.PRIMARY_COLOR_LIGHT
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (email.trim() === "") {
                                Alert.alert("", Constants.EMAIL_VALIDATION_MSG);
                            } else if (password.trim() === "") {
                                Alert.alert("", Constants.PASSWORD_VALIDATION_MSG);
                            } else {
                                handleEmailSignIn(navigation)
                            }
                        }}
                        style={{
                            width: '100%',
                        }}>
                        <Text style={{
                            width: '100%',
                            textAlign: 'center',
                            color: colors.WHITE,
                            paddingBottom: 15,
                            paddingTop: 15,
                            fontFamily: fontStyle.SFProTextMedium,
                            fontWeight: 500,
                            fontSize: 20
                        }}>
                            {Constants.SIGN_IN}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenName.SIGN_UP_SCREEN)
                    }}
                    style={{}}>
                    <Text style={{
                        textAlign: 'center',
                        color: colors.WHITE,
                        fontFamily: fontStyle.SFProTextRegular,
                        fontWeight: 500,
                        fontSize: 16
                    }}>
                        {Constants.NEW_USER_REGISTER}
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}
