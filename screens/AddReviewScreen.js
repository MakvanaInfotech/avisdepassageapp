import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    StyleSheet, TextInput, Image, ScrollView, Switch
} from 'react-native';
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants from "../utils/Constants";
import fontDimen from "../styles/fontDimen";
import {Rating, AirbnbRating} from 'react-native-ratings';

const AddReviewScreen = ({navigation}) => {
    const [companyName, setCompanyName] = useState('');
    const [date, setDate] = useState('');
    const [rating, setRating] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [comment, setComment] = useState('');
    const [image, setImage] = useState('');
    const [packageNumber, setPackageNumber] = useState('');
    const [shoppingWebSite, setShoppingWebsite] = useState('');
    const [submitComplaint, setSubmitComplaint] = useState(false);
    const [email, setEmail] = useState("");

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
                    }}>{Constants.MY_REVIEWS}</Text>
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
            headerBackTitle: Constants.BACK,
            headerShadowVisible: false,
            headerTintColor: colors.WHITE,
            color: colors.WHITE,
            headerTitle: () => renderTitle(),
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {

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

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.WHITE,
        }}>
            <SafeAreaView/>
            <StatusBar translucent backgroundColor={colors.PRIMARY_COLOR}/>
            <ScrollView>
                <View style={{
                    paddingStart: 10,
                    paddingEnd: 10,
                    paddingTop: 10,
                }}>
                    <View>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Text style={{
                                color: colors.BLACK,
                                fontFamily: fontStyle.SFProTextRegular,
                                fontWeight: 400,
                                fontSize: 16,
                                flex: 1,
                                marginStart: 5,
                            }}>
                                {Constants.COMPANY + "*"}
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
                            padding: 13,
                            marginBottom: 15,
                            backgroundColor: colors.BG_TEXT_INPUT_COLOR
                        }}>
                            <Text style={{
                                color: colors.GRAY_99_COLOR,
                                fontFamily: fontStyle.SFProTextRegular,
                                fontWeight: 400,
                                fontSize: 16,
                                flex: 1,
                            }}>
                                {Constants.SELECT_COMPANY + ""}
                            </Text>
                            <Image
                                source={
                                    require('../assets/images/ic_aerrow_down.png')
                                }
                                resizeMode={"contain"}
                                style={{
                                    alignSelf: "center",
                                    width: 16,
                                    height: 16,
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Text style={{
                                color: colors.BLACK,
                                fontFamily: fontStyle.SFProTextRegular,
                                fontWeight: 400,
                                fontSize: 16,
                                marginStart: 5,
                                flex: 1,
                            }}>
                                {Constants.DATE + "*"}
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
                            padding: 13,
                            marginBottom: 15,
                            backgroundColor: colors.BG_TEXT_INPUT_COLOR
                        }}>
                            <Image
                                source={
                                    require('../assets/images/ic_date.png')
                                }
                                resizeMode={"contain"}
                                style={{
                                    alignSelf: "center",
                                    width: 16,
                                    height: 16,
                                }}
                            />
                            <Text style={{
                                color: colors.GRAY_99_COLOR,
                                fontFamily: fontStyle.SFProTextRegular,
                                fontWeight: 400,
                                marginStart: 10,
                                fontSize: 16,
                                flex: 1,
                            }}>
                                {Constants.SELECT_DATE + ""}
                            </Text>
                        </View>
                    </View>

                    <View>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Text style={{
                                color: colors.BLACK,
                                fontFamily: fontStyle.SFProTextRegular,
                                fontWeight: 400,
                                fontSize: 16,
                                marginStart: 7,
                                flex: 1,
                            }}>
                                {Constants.NOTE + "*"}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 15,
                        }}>
                            <View style={{
                                flex: 1,
                                marginStart: 10,
                                alignSelf: 'center',
                            }}>
                                <Text>
                                    {"----"}
                                </Text>
                            </View>
                            <Rating
                                ratingColor={colors.PRIMARY_COLOR}
                                imageSize={20}
                                onFinishRating={(rating) => {
                                    // console.log("Rating is: " + rating)
                                    setRating(rating)
                                }}
                                style={{
                                    paddingVertical: 10,
                                    marginEnd: 10,
                                }}/>
                        </View>
                    </View>

                    <View>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Text style={{
                                color: colors.BLACK,
                                fontFamily: fontStyle.SFProTextRegular,
                                fontWeight: 400,
                                fontSize: 16,
                                marginStart: 5,
                                flex: 1,
                            }}>
                                {Constants.POSTAL_CODE + "*"}
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
                                value={postalCode}
                                onChangeText={setPostalCode}
                                placeholder={Constants.ENTER_POSTAL_CODE}
                                autoCapitalize="none"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <View>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Text style={{
                                color: colors.BLACK,
                                fontFamily: fontStyle.SFProTextRegular,
                                fontWeight: 400,
                                fontSize: 16,
                                marginStart: 5,
                                flex: 1,
                            }}>
                                {Constants.CITY + "*"}
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
                                value={city}
                                onChangeText={setCity}
                                placeholder={Constants.ENTER_CITY}
                                autoCapitalize="none"
                                keyboardType="default"
                            />
                        </View>
                    </View>

                    <View>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Text style={{
                                color: colors.BLACK,
                                fontFamily: fontStyle.SFProTextRegular,
                                fontWeight: 400,
                                fontSize: 16,
                                marginStart: 5,
                                flex: 1,
                            }}>
                                {Constants.COMMENT}
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
                                value={comment}
                                onChangeText={setComment}
                                placeholder={Constants.ENTER_COMMENT}
                                autoCapitalize="none"
                                keyboardType="default"
                            />
                        </View>
                    </View>


                    <View>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Text style={{
                                color: colors.BLACK,
                                fontFamily: fontStyle.SFProTextRegular,
                                fontWeight: 400,
                                fontSize: 16,
                                marginStart: 5,
                                flex: 1,
                            }}>
                                {Constants.ADDITIONAL_PHOTO}
                            </Text>
                        </View>
                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            borderRadius: 10,
                            padding: 13,
                            marginBottom: 15,
                            backgroundColor: colors.BG_TEXT_INPUT_COLOR
                        }}>
                            <Image
                                source={
                                    require('../assets/images/ic_camera.png')
                                }
                                resizeMode={"contain"}
                                style={{
                                    alignSelf: "center",
                                    width: 22,
                                    height: 22,
                                }}
                            />
                            <Text style={{
                                color: colors.GRAY_99_COLOR,
                                fontFamily: fontStyle.SFProTextRegular,
                                fontWeight: 400,
                                marginStart: 10,
                                fontSize: 16,
                                flex: 1,
                            }}>
                                {Constants.CHOOSE_AN_IMAGE}
                            </Text>
                        </View>
                    </View>


                    <View>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Text style={{
                                color: colors.BLACK,
                                fontFamily: fontStyle.SFProTextRegular,
                                fontWeight: 400,
                                fontSize: 16,
                                marginStart: 5,
                                flex: 1,
                            }}>
                                {Constants.PACKAGE_NUMBER}
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
                                value={packageNumber}
                                onChangeText={setPackageNumber}
                                placeholder={Constants.ENTER_PACKAGE_NUMBER}
                                autoCapitalize="none"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <View>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Text style={{
                                color: colors.BLACK,
                                fontFamily: fontStyle.SFProTextRegular,
                                fontWeight: 400,
                                fontSize: 16,
                                marginStart: 5,
                                flex: 1,
                            }}>
                                {Constants.SHOPPING_WEBSITE}
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
                                value={packageNumber}
                                onChangeText={setPackageNumber}
                                placeholder={Constants.ENTER_SHOPPING_WEBSITE}
                                autoCapitalize="none"
                                keyboardType="default"
                            />
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 15,
                        alignItems: "center",
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            flex: 1,
                            alignSelf: 'center',
                        }}>
                            <Text style={{
                                color: colors.BLACK,
                                fontFamily: fontStyle.SFProTextRegular,
                                fontWeight: 400,
                                fontSize: 16,
                                marginStart: 7,
                                flex: 1,
                            }}>
                                {Constants.SUBMIT_A_COMPLAINT}
                            </Text>
                        </View>
                        <Switch
                            thumbColor={colors.WHITE}
                            value={submitComplaint}
                            onValueChange={setSubmitComplaint}
                            trackColor={{false: colors.GRAY_99_COLOR, true: colors.PRIMARY_COLOR}}
                        />
                    </View>

                    <View>
                        <View style={{
                            flexDirection: "row",
                            marginBottom:10,
                        }}>
                            <Text style={{
                                color: colors.BLACK,
                                fontFamily: fontStyle.SFProTextRegular,
                                fontWeight: 400,
                                fontSize: 16,
                                marginStart: 5,
                                flex: 1,
                            }}>
                                {Constants.EMAIL}
                            </Text>
                        </View>
                        <View style={{
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
                                value={email}
                                onChangeText={setEmail}
                                placeholder={Constants.ENTER_EMAIL}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>
                    </View>

                </View>

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

export default AddReviewScreen;
