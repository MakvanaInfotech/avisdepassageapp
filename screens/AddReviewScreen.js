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
import {getCompanyList} from "../services/CompanyManager";
import CompanyListBottomSheet from "../components/CompanyListBottomSheet";
import DatePicker from "react-native-date-picker";
import Modal from 'react-native-modal';
import moment from 'moment';
import ProfileBottomSheet from "../components/ProfileBottomSheet";
import {uploadReviewPhoto} from "../services/StorageManager";
import {createReview} from "../services/ReviewManager";
import Indicator from "../components/Indicator";

let companySelectedObj = null, companyNameStr = "", selectedDateStr = "",
    ratingStr = "", postalCodeStr = "", cityStr = "",
    commentStr = "", packageNumberStr = "", shoppingWebSiteStr = "",
    submitComplaintFlag = false, emailStr = "", selectedImageStr = ""
const AddReviewScreen = ({navigation}) => {
    const [companyList, setCompanyList] = useState([]);
    const [companyName, setCompanyName] = useState(Constants.SELECT_COMPANY + "");
    const [companySelected, setCompanySelected] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [date, setDate] = useState(moment(new Date()).format('DD MMM YYYY'));
    const [rating, setRating] = useState(3);
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [comment, setComment] = useState('');
    const [image, setImage] = useState('');
    const [packageNumber, setPackageNumber] = useState('');
    const [shoppingWebSite, setShoppingWebsite] = useState('');
    const [submitComplaint, setSubmitComplaint] = useState(false);
    const [email, setEmail] = useState("");
    const [isCompanyDropDownVisible, setCompanyDropDownVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [changeProfile, setChangeProfile] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [isLoader, setLoader] = useState(false);

    useEffect(() => {
        getCompanyList((company) => {
            // console.log("company>>>>> ",company)
            setCompanyList(company)
        })
    }, [])
    useEffect(() => {
        // Your code here will run after every render when companyName or companyList changes
        // You can include the code to call full components here
        companySelectedObj = companySelected
        companyNameStr = companyName
        selectedDateStr = date
        ratingStr = rating
        postalCodeStr = postalCode
        cityStr = city
        commentStr = comment
        packageNumberStr = packageNumber
        shoppingWebSiteStr = shoppingWebSite
        submitComplaintFlag = submitComplaint
        emailStr = email
        selectedImageStr = selectedImage
    }, [companySelected, companyName, date, rating, postalCode, city, comment,
        packageNumber, shoppingWebSite, submitComplaint, email, selectedImage]);

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


    const clearAll = () => {
        companyNameStr = "";
        selectedDateStr = "";
        ratingStr = "";
        postalCodeStr = "";
        cityStr = "";
        commentStr = "";
        packageNumberStr = "";
        shoppingWebSiteStr = "";
        submitComplaintFlag = false;
        emailStr = "";
        selectedImageStr = "";
    }
    const submit = async () => {
        if (companyNameStr === "" || companyNameStr === Constants.SELECT_COMPANY) {
            alert(Constants.PLEASE_SELECT_COMPANY_NAME)
        } else if (postalCodeStr === "") {
            alert(Constants.PLEASE_ENTER_POSTAL_CODE)
        } else if (cityStr === "") {
            alert(Constants.PLEASE_ENTER_CITY)
        } else {
            setLoader(true)
            await createReview("", "", companySelectedObj, companyNameStr, selectedDateStr, ratingStr, postalCodeStr, cityStr,
                commentStr, packageNumberStr, shoppingWebSiteStr, submitComplaintFlag, emailStr,
                selectedImageStr, async (docId) => {
                    if (selectedImageStr !== "") {
                        await uploadReviewPhoto(
                            docId,
                            selectedImageStr,
                            callback => {
                                // console.log("Image URI", callback)
                                clearAll()
                                setLoader(false)
                                navigation.goBack()
                            })
                    }else{
                        clearAll()
                        setLoader(false)
                        navigation.goBack()
                    }
                })
        }
    }
    const handleCompanyList = async (item) => {
        setCompanyDropDownVisible(false)
        setCompanyName(item.name)
        setCompanySelected(item)
        console.log("item.name>>>>> ", item.name)
        console.log("companyName>>>>> ", companyName)
    }
    const handleDate = (isDone) => {
        setDatePickerVisible(false)
        // setCompanyName(item.name)
        if (isDone) {
            const formattedDate = moment(selectedDate).format('DD MMM YYYY');
            setDate(formattedDate)
        }
    }

    const handleImageSelected = async (imageUri) => {
        setChangeProfile(false);
        setSelectedImage(imageUri);
    }

    const renderCompanyListBottomSheet = () => {
        return (
            <CompanyListBottomSheet
                companyList={companyList}
                disabled={isCompanyDropDownVisible}
                onItemSelected={handleCompanyList}
                onClose={() => {
                    setCompanyDropDownVisible(false)
                }}/>
        )
    }

    const renderPicker = () => {
        return (
            <Modal isVisible={isDatePickerVisible} style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
                    <DatePicker
                        mode="date"
                        date={selectedDate}
                        textColor={'#3C3C43'}
                        minuteInterval={5}
                        onDateChange={(date) => {
                            setSelectedDate(date)
                        }}
                    />
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        alignItems: 'flex-end',
                        justifyContent: 'space-between'
                    }}>
                        <TouchableOpacity onPress={() => {
                            handleDate(false)
                        }} style={{marginTop: 10}}>
                            <Text style={{
                                fontFamily: fontStyle.SFProTextBold,
                                fontSize: 18,
                            }}>{Constants.CANCEL_CAP}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            handleDate(true)
                        }} style={{marginTop: 10}}>
                            <Text style={{
                                fontFamily: fontStyle.SFProTextBold,
                                fontSize: 18,
                            }}>{Constants.DONE_CAP}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

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
                        <TouchableOpacity
                            onPress={() => {
                                setCompanyDropDownVisible(true)
                            }}>
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
                                    {companyName}
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
                        </TouchableOpacity>
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
                        <TouchableOpacity
                            onPress={() => {
                                setDatePickerVisible(true)
                            }}>
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
                                    {date}
                                </Text>
                            </View>
                        </TouchableOpacity>
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
                                startingValue={rating}
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
                        <TouchableOpacity
                            onPress={() => {
                                setChangeProfile(true);
                            }}>
                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                borderRadius: 10,
                                padding: 13,
                                marginBottom: 15,
                                backgroundColor: colors.BG_TEXT_INPUT_COLOR,
                                alignItems: selectedImage !== "" ? 'center' : "flex-start",
                                justifyContent: selectedImage !== "" ? 'center' : "flex-start",
                            }}>
                                <Image
                                    source={selectedImage === "" ?
                                        require('../assets/images/ic_camera.png') :
                                        {uri: selectedImage}
                                    }
                                    resizeMode={"contain"}
                                    style={{
                                        alignSelf: "center",
                                        width: selectedImage === "" ? 22 : 100,
                                        height: selectedImage === "" ? 22 : 100,
                                    }}
                                />
                                {(
                                    selectedImage === "" &&
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
                                )}

                            </View>
                        </TouchableOpacity>
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
                                value={shoppingWebSite}
                                onChangeText={setShoppingWebsite}
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
                            marginBottom: 10,
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

            {renderCompanyListBottomSheet()}

            {renderPicker()}
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
