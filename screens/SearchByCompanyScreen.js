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

const SearchByCompanyScreen = ({navigation}) => {

    const [reviewList, setReviewList] = useState([]);
    const [companyList, setCompanyList] = useState([]);

    useEffect(() => {
        getCompanyList((company) => {
            setCompanyList(company)
        })
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
                    }}>{Constants.AVERAGE_GRADES}</Text>
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


    const renderReviewList = ({item, index}) => (
        <View>
            <TouchableOpacity
                onPress={() => {
                    let companyReview = reviewList.filter((reviewItem) => reviewItem.companySelected.id === item.id)
                    navigation.navigate(ScreenName.AVERAGE_RATING_COMPANY_DETAILS_SCREEN, {
                        company: item,
                        reviews: companyReview,
                    })
                }}>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingEnd: 20,
                    }}>
                    <Image
                        style={{
                            marginTop: 5,
                            marginBottom: 5,
                            width: "50%",
                            height: 200,
                        }}
                        resizeMode={'cover'}
                        source={item.image !== undefined &&
                        item.image !== null && item.image !== "" ?
                            {uri: item.image} :
                            require('../assets/images/ic_profile.png')
                        }>
                    </Image>
                </View>
            </TouchableOpacity>
            {(
                <View style={{
                    // marginEnd: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                }}/>
            )}
        </View>
    );
    return (
        <View style={{
            flex: 1,
            // paddingStart: 20,
            backgroundColor: colors.WHITE,
        }}>
            <SafeAreaView/>
            <StatusBar translucent backgroundColor={colors.PRIMARY_COLOR}/>

            <FlatList
                data={companyList}
                bounces={false}
                containerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}
                renderItem={renderReviewList}
                keyExtractor={(item, index) => item + index} // Use item + index as the key
            />

        </View>
    );
}

export default SearchByCompanyScreen;
