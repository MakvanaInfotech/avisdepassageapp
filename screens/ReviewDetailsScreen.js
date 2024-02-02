import React, {useEffect, useState} from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    StyleSheet, TextInput, Image, ScrollView
} from 'react-native';
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants, {ScreenName} from "../utils/Constants";
import firestore from '@react-native-firebase/firestore';
import {storage} from "../App";
import fontDimen from "../styles/fontDimen";
import FirestoreConstant from "../services/FirestoreConstant";
import {Rating} from "react-native-ratings";
import {setProfileUri, setUser, setUserName} from "../services/DataManager";
import {authLogout} from "../services/AuthService";
import {CommonActions} from "@react-navigation/native";
import ProfileBottomSheet from "../components/ProfileBottomSheet";
import Indicator from "../components/Indicator";
import moment from "moment";

const ReviewDetailsScreen = ({navigation, route}) => {
    const [item] = useState(route?.params?.item || "")
    const [companySelected] = useState(route?.params?.item.companySelected || "")

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
                    }}>{item.city}</Text>
            </View>
        );
    };
    useEffect(() => {
        // console.log("item", item)
        // console.log("companySelected", companySelected)
        // console.log("item.selectedImage", item)
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
            headerTitle: () => renderTitle()
        });
    }, []);

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.WHITE,
        }}>
            <SafeAreaView/>
            <StatusBar translucent backgroundColor={colors.PRIMARY_COLOR}/>
            <ScrollView style={{width: '100%'}}
                        bounces={false}>
                {(
                    <View style={{
                        paddingBottom:20,
                    }}>
                        <Image
                            style={{
                                backgroundColor: colors.GRAY_F4_COLOR,
                                width: "100%",
                                height: 252,
                                alignSelf: 'center',
                            }}
                            resizeMode={"contain"}
                            source={companySelected.image ?
                                {uri: companySelected.image} :
                                require('../assets/images/ic_profile_bg.png')}
                        />

                        <View style={{
                            marginStart: 20,
                            marginEnd: 20,
                        }}>
                            <Text
                                style={{
                                    marginTop: 10,
                                    fontSize: 24,
                                    fontWeight: 400,
                                    fontFamily: fontStyle.SFProTextSemiBold,
                                    color: colors.BLACK,
                                }}>
                                {Constants.DESCRIPTION}
                            </Text>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 10,
                                marginEnd: 2,
                            }}>
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: 14,
                                        fontFamily: fontStyle.SFProTextRegular,
                                        color: colors.BLACK,
                                    }}>
                                    {Constants.CITY}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontFamily: fontStyle.SFProTextRegular,
                                        color: colors.BLACK,
                                    }}>
                                    {item.city}
                                </Text>
                            </View>
                            <View style={{
                                marginTop: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: colors.BLACK_TRANS_66,
                            }}/>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 15,
                                marginEnd: 2,
                            }}>
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: 14,
                                        fontFamily: fontStyle.SFProTextRegular,
                                        color: colors.BLACK,
                                    }}>
                                    {Constants.COMPANY}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontFamily: fontStyle.SFProTextRegular,
                                        color: colors.BLACK,
                                    }}>
                                    {item.companyName}
                                </Text>
                            </View>
                            <View style={{
                                marginTop: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: colors.BLACK_TRANS_66,
                            }}/>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 15,
                                marginEnd: 2,
                            }}>
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: 14,
                                        fontFamily: fontStyle.SFProTextRegular,
                                        color: colors.BLACK,
                                    }}>
                                    {Constants.NOTE}
                                </Text>
                                <Rating
                                    readonly
                                    startingValue={item.rating}
                                    ratingColor={colors.PRIMARY_COLOR}
                                    imageSize={20}
                                />
                            </View>
                            <View style={{
                                marginTop: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: colors.BLACK_TRANS_66,
                            }}/>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 15,
                                marginEnd: 2,
                            }}>
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: 14,
                                        fontFamily: fontStyle.SFProTextRegular,
                                        color: colors.BLACK,
                                    }}>
                                    {Constants.DATE}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontFamily: fontStyle.SFProTextRegular,
                                        color: colors.BLACK,
                                    }}>
                                    {moment(item.createdAt).format("MMM DD, YYYY hh:MM")}
                                </Text>
                            </View>
                            <View style={{
                                marginTop: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: colors.BLACK_TRANS_66,
                            }}/>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 15,
                                marginEnd: 2,
                            }}>
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: 14,
                                        fontFamily: fontStyle.SFProTextRegular,
                                        color: colors.BLACK,
                                    }}>
                                    {Constants.SHOPPING_WEBSITE}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontFamily: fontStyle.SFProTextRegular,
                                        color: colors.BLACK,
                                    }}>
                                    {item.shoppingWebSite}
                                </Text>
                            </View>
                            <View style={{
                                marginTop: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: colors.BLACK_TRANS_66,
                            }}/>


                            <View style={{
                                flexDirection: 'row',
                                marginTop: 15,
                                marginEnd: 2,
                            }}>
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: 14,
                                        fontFamily: fontStyle.SFProTextRegular,
                                        color: colors.BLACK,
                                    }}>
                                    {Constants.PACKAGE_NUMBER}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontFamily: fontStyle.SFProTextRegular,
                                        color: colors.BLACK,
                                    }}>
                                    {item.packageNumber}
                                </Text>
                            </View>
                            <View style={{
                                marginTop: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: colors.BLACK_TRANS_66,
                            }}/>
                            <Text
                                style={{
                                    marginTop:15,
                                    flex: 1,
                                    fontSize: 14,
                                    fontFamily: fontStyle.SFProTextRegular,
                                    color: colors.BLACK,
                                }}>
                                {Constants.COMMENT +":"}
                            </Text>

                            <Text
                                style={{
                                    flex: 1,
                                    marginTop:5,
                                    fontSize: 14,
                                    fontFamily: fontStyle.SFProTextRegular,
                                    color: colors.BLACK,
                                }}>
                                {item.comment}
                            </Text>

                            <Text
                                style={{
                                    alignSelf:'center',
                                    marginTop:15,
                                    flex: 1,
                                    fontSize: 14,
                                    fontFamily: fontStyle.SFProTextBold,
                                    color: colors.BLACK,
                                }}>
                                {Constants.DELIVERY_PHOTO}
                            </Text>
                            <Image
                                style={{
                                    marginTop:10,
                                    width: "100%",
                                    height: 152,
                                    alignSelf: 'center',
                                }}
                                resizeMode={"contain"}
                                source={item.selectedImage ?
                                    {uri: item.selectedImage} :
                                    require('../assets/images/ic_profile_bg.png')}
                            />

                        </View>


                    </View>
                )}
            </ScrollView>
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

export default ReviewDetailsScreen;