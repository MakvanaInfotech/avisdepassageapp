import React, {useEffect, useState} from 'react';
import {Alert, Image, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View} from 'react-native';
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants, {ScreenName} from "../utils/Constants";
import fontDimen from "../styles/fontDimen";
import {getProfileUri, getUser, getUserName, setProfileUri, setUser, setUserName} from "../services/DataManager";
import {authLogout} from "../services/AuthService";
import {CommonActions} from "@react-navigation/native";
import ProfileBottomSheet from "../components/ProfileBottomSheet";
import Indicator from "../components/Indicator";
import {uploadProfilePicture} from "../services/StorageManager";
import {getLoggedUserId} from "../services/UserServices";

export function ProfileScreen({navigation}) {
    let userData = getUser();
    const [userName, setName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [points, setPoints] = useState("0");
    const [changeProfile, setChangeProfile] = useState(false);
    const [isLoader, setLoader] = useState(false);
    const [selectedImage, setSelectedImage] = useState(getProfileUri());

    useEffect(() => {
        userData = getUser();

        if (userData !== undefined && userData !== null) {
            if (userData.name !== undefined &&
                userData.name !== null &&
                userData.name !== "") {
                setName(userData.name)
                if (getUserName() === "") {
                    setUserName(userData.name)
                }
            }
            if (userData.points !== undefined &&
                userData.points !== null &&
                userData.points !== "") {
                setPoints(userData.points)
            }
            if (userData.email !== undefined &&
                userData.email !== null &&
                userData.email !== "") {
                setUserEmail(userData.email)
            }
        }
    }, [])
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
                    }}>{Constants.PROFILE}</Text>
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
            // headerBackTitle: Constants.BACK,
            headerShadowVisible: false,
            headerTintColor: colors.WHITE,
            color: colors.WHITE,
            headerTitle: () => renderTitle(),
            headerRight: () => (
                <View/>
            )
        });
    }, []);

    const handleImageSelected = async (imageUri) => {
        setLoader(true);
        setChangeProfile(false);
        try {
            await uploadProfilePicture(getLoggedUserId(), imageUri, callback => {
                if (callback) {
                    setLoader(false);
                    getProfileImage()
                } else {
                    setLoader(false);
                }
            });
        } catch (error) {
            setLoader(false);
            console.log('Failed to upload profile picture:', error);
        }
    };

    const getProfileImage = async () => {
        let downloadURL = await getProfileUri();
        if (downloadURL !== undefined && downloadURL !== null) {
            setSelectedImage(downloadURL);
        }
    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.PRIMARY_COLOR_BG,
        }}>
            <SafeAreaView/>
            <StatusBar translucent backgroundColor={colors.PRIMARY_COLOR}/>
            <ScrollView style={{width: '100%'}}
                        bounces={false}>
                {(
                    userData !== undefined && userData !== null &&
                    <View>
                        <Image
                            style={{
                                width: 162,
                                height: 162,
                                marginTop: 10,
                                alignSelf: 'center',
                                borderRadius: 81,
                            }}
                            source={selectedImage ? {uri: selectedImage, cache: 'force-cache'}:
                                require('../assets/images/ic_profile_bg.png')}/>
                        <Text
                            style={{
                                marginStart: 10,
                                alignSelf: 'center',
                                fontSize: 24,
                                fontFamily: fontStyle.SFProTextBold,
                                color: colors.BLACK,
                            }}>
                            {userName}
                        </Text>
                        <Text
                            style={{
                                marginStart: 10,
                                alignSelf: 'center',
                                fontSize: 12,
                                fontFamily: fontStyle.SFProTextSemiBold,
                                color: colors.BLACK,
                            }}>
                            {userEmail}
                        </Text>

                        <Text
                            style={{
                                marginTop: 6,
                                padding: 6,
                                borderRadius: 4,
                                backgroundColor: colors.PRIMARY_COLOR,
                                marginStart: 10,
                                alignSelf: 'center',
                                fontSize: 12,
                                fontFamily: fontStyle.SFProTextBold,
                                color: colors.WHITE,
                            }}>
                            {`${Constants.EARNING_POINTS}: ${points}`}
                        </Text>
                    </View>
                )}


                <View style={{
                    flex: 1,
                    marginTop: 10,
                    marginStart: 10,
                    marginEnd: 10,
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        {(
                            userData !== undefined && userData !== null &&
                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                borderRadius: 10,
                                padding: 13,
                                marginBottom: 5,
                                backgroundColor: colors.WHITE
                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setChangeProfile(true)
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
                                        <Image
                                            style={{
                                                width: 24,
                                                height: 22,
                                            }}
                                            source={require('../assets/images/ic_camera_profile.png')}>
                                        </Image>
                                        <Text
                                            style={{
                                                marginStart: 10,
                                                fontSize: 16,
                                                fontWeight: 400,
                                                fontFamily: fontStyle.SFProTextRegular,
                                                color: colors.BLACK,
                                            }}>
                                            {Constants.CHANGE_PROFILE_PHOTO}
                                        </Text>

                                        <View style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            flexDirection: 'row'
                                        }}>
                                            <Image
                                                style={{
                                                    width: 8,
                                                    height: 14,
                                                }}
                                                resizeMode={'contain'}
                                                source={require('../assets/images/ic_chevron.png')}>
                                            </Image>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}

                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            borderRadius: 10,
                            padding: 13,
                            marginBottom: 15,
                            backgroundColor: colors.WHITE
                        }}>
                            <TouchableOpacity
                                onPress={() => {
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
                                    <Image
                                        style={{
                                            width: 24,
                                            height: 22,
                                        }}
                                        source={require('../assets/images/ic_about.png')}>
                                    </Image>
                                    <Text
                                        style={{
                                            marginStart: 10,
                                            fontSize: 16,
                                            fontWeight: 400,
                                            fontFamily: fontStyle.SFProTextRegular,
                                            color: colors.BLACK,
                                        }}>
                                        {Constants.ABOUT_US}
                                    </Text>

                                    <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        flexDirection: 'row'
                                    }}>
                                        <Image
                                            style={{
                                                width: 8,
                                                height: 14,
                                            }}
                                            resizeMode={'contain'}
                                            source={require('../assets/images/ic_chevron.png')}>
                                        </Image>
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
                                    <Image
                                        style={{
                                            width: 24,
                                            height: 24,
                                        }}
                                        source={require('../assets/images/ic_terms_conditions.png')}>
                                    </Image>
                                    <Text
                                        style={{
                                            marginStart: 10,
                                            fontSize: 16,
                                            fontWeight: 400,
                                            fontFamily: fontStyle.SFProTextRegular,
                                            color: colors.BLACK,
                                        }}>
                                        {Constants.TERM_CONDITIONS}
                                    </Text>

                                    <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        flexDirection: 'row'
                                    }}>
                                        <Image
                                            style={{
                                                width: 8,
                                                height: 14,
                                            }}
                                            source={require('../assets/images/ic_chevron.png')}>
                                        </Image>
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
                                    <Image
                                        style={{
                                            width: 24,
                                            height: 24,
                                        }}
                                        source={require('../assets/images/ic_privacy_policy.png')}>
                                    </Image>
                                    <Text
                                        style={{
                                            marginStart: 10,
                                            fontSize: 16,
                                            fontWeight: 400,
                                            fontFamily: fontStyle.SFProTextRegular,
                                            color: colors.BLACK,
                                        }}>
                                        {Constants.PRIVACY_POLICY}
                                    </Text>

                                    <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        flexDirection: 'row'
                                    }}>
                                        <Image
                                            style={{
                                                width: 8,
                                                height: 14,
                                            }}
                                            source={require('../assets/images/ic_chevron.png')}>
                                        </Image>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View
                style={{
                    marginStart: 10,
                    marginEnd: 10,
                    marginBottom: 10,
                    // flex: 1,
                    // backgroundColor: 'red',
                    // alignSelf: "flex-end",
                    // position:"absolute",
                    // bottom:-10,
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
                            if (userData !== undefined && userData !== null) {
                                setUser(null);
                                setProfileUri(null);
                                setUserName("")
                                authLogout()
                                navigation.dispatch(
                                    CommonActions.reset({
                                        index: 1,
                                        routes: [{name: ScreenName.MAIN_SCREEN}],
                                    }));
                            } else {
                                navigation.navigate(ScreenName.SIGN_IN_SCREEN)
                            }
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
                                justifyContent: 'center',
                                backgroundColor: colors.WHITE
                            }}>
                            <Text
                                style={{
                                    marginStart: 10,
                                    fontSize: 16,
                                    fontWeight: 400,
                                    fontFamily: fontStyle.SFProTextBold,
                                    color: colors.RED_COLOR,
                                }}>
                                {userData !== undefined && userData !== null ? Constants.LOGOUT : Constants.LOGIN}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {(
                    userData !== undefined && userData !== null &&
                    <View style={{
                        flexDirection: 'row',
                        borderRadius: 10,
                        padding: 13,
                        marginBottom: 15,
                        backgroundColor: colors.WHITE
                    }}>
                        <TouchableOpacity
                            onPress={() => {
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
                                    justifyContent: 'center',
                                    backgroundColor: colors.WHITE
                                }}>
                                <Text
                                    style={{
                                        marginStart: 10,
                                        fontSize: 16,
                                        fontWeight: 400,
                                        fontFamily: fontStyle.SFProTextBold,
                                        color: colors.RED_COLOR,
                                    }}>
                                    {Constants.DELETE_ACCOUNT}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}


                <Text
                    style={{
                        marginStart: 10,
                        fontSize: 16,
                        fontWeight: 400,
                        alignSelf: "center",
                        fontFamily: fontStyle.SFProTextBold,
                        color: colors.PRIMARY_COLOR,
                    }}>
                    {"Version 1.0.0(1)"}
                </Text>
            </View>
            <ProfileBottomSheet
                disabled={changeProfile}
                onImageSelected={handleImageSelected}
                onClose={() => {
                    setChangeProfile(false)
                }}/>
            {isLoader && <Indicator/>}
        </View>
    );
}
