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
import ConstantsFR from "../utils/ConstantsFR";

const MainScreen = ({navigation}) => {

    const [reviewList, setReviewList] = useState([]);

    useEffect(() => {
        const subscribeReview = firestore()
            .collection(FirestoreConstant.REVIEW_TABLE)
            .onSnapshot(documentSnapshot => {
                const reviews = [];
                documentSnapshot.forEach((documentSnapshot) => {
                    const data = documentSnapshot.data();
                    reviews.push(data);
                });
                reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setReviewList(reviews)
                //console.log("All review data:", reviews);
            })
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
                    }}>{ConstantsFR.REVIEWS}</Text>
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
            headerBackTitle: ConstantsFR.BACK,
            headerShadowVisible: false,
            headerTintColor: colors.WHITE,
            color: colors.WHITE,
            headerTitle: () => renderTitle(),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenName.SEARCH_SCREEN)
                        }}>
                        <Image
                            source={
                                require('../assets/images/ic_search.png')
                            }
                            tintColor={colors.WHITE}
                            style={{
                                width: 24,
                                height: 24,
                                marginEnd: 10,
                                borderRadius: 12
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenName.PROFILE_SCREEN)
                        }}>
                        <Image
                            source={
                                require('../assets/images/ic_profile.png')
                            }
                            tintColor={colors.WHITE}
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12
                            }}
                        />
                    </TouchableOpacity>

                </View>
            )
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
            backgroundColor: colors.WHITE,
        }}>
            <SafeAreaView/>
            <StatusBar translucent backgroundColor={colors.PRIMARY_COLOR}/>
            <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                    marginTop: 40,
                    color: colors.BLACK,
                    fontSize: fontDimen.font_14,
                    fontFamily: fontStyle.SFProTextRegular,
                    overflow: 'hidden',
                    textAlign: "center"
                }}>{ConstantsFR.HOW_WAS_YOUR_LAST_DELIVERY}</Text>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(ScreenName.ADD_REVIEW_SCREEN)
                }}
                style={{
                    margin: 20,
                    backgroundColor: colors.PRIMARY_COLOR,
                    borderRadius: 8,
                    alignItems: 'center'
                }}>
                <Text style={{
                    color: colors.WHITE,
                    padding: 18,
                    fontFamily: fontStyle.SFProTextRegular,
                    fontWeight: 500,
                    fontSize: 16
                }}>
                    {ConstantsFR.NOTE_A_DELIVERY}
                </Text>
            </TouchableOpacity>
            <View
                style={{
                    height: 1,
                    marginStart: 20,
                    marginEnd: 20,
                    backgroundColor: colors.BLACK_TRANS_66,
                }}
            />
            <Text style={{
                color: colors.BLACK,
                padding: 18,
                fontFamily: fontStyle.SFProTextMedium,
                fontSize: 24
            }}>
                {ConstantsFR.RECENT_REVIEWS}
            </Text>


            <FlatList
                data={reviewList}
                bounces={false}
                containerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}
                renderItem={renderReviewList}
                keyExtractor={(item, index) => item + index} // Use item + index as the key
            />

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
