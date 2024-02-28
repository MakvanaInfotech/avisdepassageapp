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
import Constants, {ScreenName} from "../utils/Constants";
import firestore from '@react-native-firebase/firestore';
import {storage} from "../App";
import fontDimen from "../styles/fontDimen";
import FirestoreConstant from "../services/FirestoreConstant";
import {Rating} from "react-native-ratings";
import {getCompanyList} from "../services/CompanyManager";
import ConstantsFR from "../utils/ConstantsFR";

const AverageRatingCompanyDetailsScreen = ({navigation, route}) => {
    const [company] = useState(route?.params?.company || "")
    const [reviews] = useState(route?.params?.reviews || "")
    const [averageRating, setAverageRating] = useState(0)

    const [reviewList, setReviewList] = useState(route?.params?.reviews || "")

    useEffect(()=>{
        if(reviewList.length > 0 ){
            const totalRating = reviewList.reduce((sum, item) => sum + item.rating, 0);
            const averageRating = totalRating / reviewList.length;
            setAverageRating(averageRating)
        }
    },[])
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
                    }}>{company.name}</Text>
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


    const renderReviewList = ({item, index}) => (
        <View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(ScreenName.REVIEW_DETAILS_SCREEN,{
                        item : item
                    })
                }}>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingStart: 10,
                        paddingEnd: 20,
                    }}>
                    <Image
                        style={{
                            marginStart: 10,
                            // backgroundColor:'red',
                            marginTop: 5,
                            marginBottom: 5,
                            width: 50,
                            height: 50,
                            // backgroundColor:'red',
                        }}
                        resizeMode={item.companySelected.id === "HMeHpTjKctnJpYJKEsWA" ? 'cover' : 'contain'}
                        source={item.companySelected.image !== undefined &&
                        item.companySelected.image !== null && item.companySelected.image !== "" ?
                            {uri: item.companySelected.image} :
                            require('../assets/images/ic_profile.png')
                        }>
                    </Image>
                    <Text
                        style={{
                            marginStart: 5,
                            fontSize: 16,
                            fontWeight: 400,
                            fontFamily: fontStyle.SFProTextRegular,
                            color: colors.BLACK,
                        }}>
                        {item.city}
                    </Text>

                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flexDirection: 'row'
                    }}>
                        <Rating
                            readonly
                            startingValue={item.rating}
                            ratingColor={colors.PRIMARY_COLOR}
                            imageSize={20}
                            style={{
                                paddingVertical: 10,
                                marginEnd: 10,
                            }}/>
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
            {(
                // index !== reviewList.length - 1 &&
                <View style={{
                    // marginTop: 10,
                    marginStart: 20,
                    marginEnd: 20,

                    // marginStart: "18%",
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                }}/>
            )}
        </View>
    );
    return (
        <View style={{
            flex: 1,
            paddingStart:10,
            paddingEnd:10,
            backgroundColor: colors.WHITE,
        }}>
            <SafeAreaView/>
            <StatusBar translucent backgroundColor={colors.PRIMARY_COLOR}/>
            <View style={{
                // backgroundColor:'red',
                alignItems:'center',
            }}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                        marginTop: 40,
                        color: colors.BLACK,
                        fontSize: fontDimen.font_14,
                        fontFamily: fontStyle.SFProTextBold,
                        overflow: 'hidden',
                    }}>{ConstantsFR.OVERALL_RATING}</Text>
                <Rating
                    readonly
                    startingValue={averageRating}
                    ratingColor={colors.PRIMARY_COLOR}
                    imageSize={20}
                    style={{
                        paddingVertical: 10,
                        marginEnd: 10,
                    }}/>
            </View>
            <View style={{
                marginTop: 10,
                marginStart: 20,
                marginEnd: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
            }}/>
            {(
                reviewList.length <=0 &&
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                        alignSelf:'center',
                        marginTop: 40,
                        color: colors.BLACK,
                        fontSize: fontDimen.font_14,
                        fontFamily: fontStyle.SFProTextBold,
                        overflow: 'hidden',
                    }}>{ConstantsFR.NO_REVIEW_FOUND}</Text>
            )}
            <FlatList
                data={reviewList}
                bounces={false}
                containerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}
                renderItem={renderReviewList}
                keyExtractor={(item, index) => item + index} // Use item + index as the key
            />
            <SafeAreaView/>
        </View>
    );
}

export default AverageRatingCompanyDetailsScreen;
