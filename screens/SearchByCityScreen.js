import React, {useEffect, useState} from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    TextInput, Image
} from 'react-native';
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants, {ScreenName} from "../utils/Constants";
import firestore from '@react-native-firebase/firestore';
import fontDimen from "../styles/fontDimen";
import FirestoreConstant from "../services/FirestoreConstant";
import {Rating} from "react-native-ratings";
const SearchByCityScreen = ({navigation}) => {

    const [reviewList, setReviewList] = useState([]);
    const [filterReviewList, setFilterReviewList] = useState([]);
    const [search, setSearch] = useState('');
    const [isMapStatus, setMapStatus] = useState(true);


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
            })
    }, [])

    const setHeader = () => {
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
                <View style={{
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            setMapStatus(prevState => !prevState);
                        }}>
                        <Image
                            source={
                                !isMapStatus?
                                    require('../assets/images/ic_map.png'):
                                    require('../assets/images/ic_search.png')
                            }
                            tintColor={colors.WHITE}
                            style={{
                                width: 24,
                                height: 24,
                                marginEnd: 10
                            }}
                            resizeMode={"contain"}
                        />
                    </TouchableOpacity>
                </View>
            )
        });
    }
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
                    }}>{Constants.REVIEWS_BY_CITY}</Text>
            </View>
        );
    };
    useEffect(() => {
        setHeader()
    }, [isMapStatus]);

    // Function to filter cities based on search input
    const filterCities = (input) => {
        if(reviewList.length> 0 ){
            const filtered = reviewList.filter(item =>
                item.city.toLowerCase().includes(input.toLowerCase())
            );
            setFilterReviewList(filtered);
        }
    };

    const renderReviewList = ({item, index}) => (
        <View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(ScreenName.REVIEW_DETAILS_SCREEN, {
                        item: item
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
            {(
                !isMapStatus &&
                <View>
                    <View style={{
                        flexDirection: 'row',
                        borderRadius: 10,
                        paddingStart: 10,
                        marginStart:20,
                        marginEnd:20,
                        marginTop:10,
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
                            value={search}
                            onChangeText={(text) => {
                                setSearch(text);
                                filterCities(text);
                            }}
                            placeholder={Constants.ENTER_CITY}
                            autoCapitalize="none"
                            keyboardType="default"
                        />
                    </View>
                    <View
                    style={{
                        height:1,
                        backgroundColor:colors.GRAY_F4_COLOR
                    }}>

                    </View>
                    <FlatList
                        data={filterReviewList}
                        bounces={false}
                        containerStyle={{flexGrow: 1}}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderReviewList}
                        keyExtractor={(item, index) => item + index} // Use item + index as the key
                    />
                </View>

            )}



        </View>
    );
}

export default SearchByCityScreen;
