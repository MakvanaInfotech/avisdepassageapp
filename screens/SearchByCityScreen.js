import React, {useEffect, useState} from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Image,
    Platform,
    Dimensions,
    StyleSheet,
} from 'react-native';
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants, {ScreenName} from "../utils/Constants";
import firestore from '@react-native-firebase/firestore';
import fontDimen from "../styles/fontDimen";
import FirestoreConstant from "../services/FirestoreConstant";
import {Rating} from "react-native-ratings";
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import ConstantsFR from "../utils/ConstantsFR";

const {width, height} = Dimensions.get('window');

const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 100;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const SAMPLE_REGION = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};

Geocoder.init('key ');

const SearchByCityScreen = ({navigation}) => {

    const [reviewList, setReviewList] = useState([]);
    const [filterReviewList, setFilterReviewList] = useState([]);
    const [search, setSearch] = useState('');
    const [isMapStatus, setMapStatus] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [markers, setMarkers] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(SAMPLE_REGION);

    const fetchMarkers = async (reviews) => {
        const markerList = [];
        let count = 0
        for (const item of reviews) {
            try {
                if (item !== undefined && item.city !== undefined) {
                    const response = await Geocoder.from(item.city);
                    const {lat, lng} = response.results[0].geometry.location;
                    console.log("item.city>>> ", item.city + " lat: " + lat + " lng: " + lng)
                    markerList.push({
                        id: count,
                        item: item,
                        coordinates: {
                            latitude: lat,
                            longitude: lng,
                        },
                    });
                    count++
                }
            } catch (error) {
                // console.log(`Error geocoding ${item.city}:`, error);
            }
        }

        if (markerList.length > 0 && markerList[0].coordinates !== undefined) {
            let coordinate = markerList[0].coordinates
            // console.log("",coordinate)
            setCurrentLocation({
                latitude: coordinate.latitude, // Initial latitude
                longitude: coordinate.longitude, // Initial longitude
                latitudeDelta: 0.0922,
                longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
            })
        }
        setMarkers(markerList);

    };

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
                let markerList = reviews.filter(item => item.coordinates !== undefined && item.coordinates !== null)
                setMarkers(markerList);
                if (markerList.length > 0 && markerList[0].coordinates !== undefined) {
                    let coordinate = markerList[0].coordinates
                    setCurrentLocation({
                        latitude: coordinate.latitude, // Initial latitude
                        longitude: coordinate.longitude, // Initial longitude
                        latitudeDelta: 0.0822,
                        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
                    })
                }
                setFilterReviewList(reviews)
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
            headerBackTitle: ConstantsFR.BACK,
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
                                !isMapStatus ?
                                    require('../assets/images/ic_map.png') :
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
                    }}>{ConstantsFR.REVIEWS_BY_CITY}</Text>
            </View>
        );
    };
    useEffect(() => {
        setHeader()
    }, [isMapStatus]);

    // Function to filter cities based on search input
    const filterCities = (input) => {
        if (reviewList.length > 0) {
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
                <View style={{
                    marginStart: 20,
                    marginEnd: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                }}/>
            )}
        </View>
    );
    return (
        <View style={{
            flex: 1,
            flexGrow: 1,
            // paddingBottom:20,
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
                        marginStart: 20,
                        marginEnd: 20,
                        marginTop: 10,
                        marginBottom: 15,
                        backgroundColor: colors.BG_TEXT_INPUT_COLOR
                    }}>
                        <TextInput
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 16,
                                paddingTop: Platform.OS === "ios" ? 15 : 10,
                                paddingBottom: Platform.OS === "ios" ? 15 : 10,
                                textAlign: 'left',
                                color: colors.BLACK,
                                fontFamily: fontStyle.SFProTextRegular
                            }}
                            value={search}
                            onChangeText={(text) => {
                                setSearch(text);
                                filterCities(text);
                            }}
                            placeholder={ConstantsFR.ENTER_CITY}
                            autoCapitalize="none"
                            keyboardType="default"
                        />
                    </View>
                    <View
                        style={{
                            height: 1,
                            backgroundColor: colors.GRAY_F4_COLOR
                        }}>

                    </View>
                    <FlatList
                        data={filterReviewList}
                        // bounces={false}
                        containerStyle={{flexGrow: 1}}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderReviewList}
                        keyExtractor={(item, index) => item + index} // Use item + index as the key
                    />
                    <SafeAreaView/>
                </View>

            )}

            {(
                isMapStatus &&
                <MapView
                    style={{flex: 1}}
                    initialRegion={currentLocation}
                    onPress={() => {
                        setSelectedItem(null)
                    }}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker.coordinates}
                            title={marker.city}
                            onPress={() => {
                                setTimeout(() => {
                                    setSelectedItem(marker)
                                }, 1000)
                            }}
                        />
                    ))}

                </MapView>
            )}

            {(
                selectedItem !== null &&
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        flex: 1,
                        width: "100%",
                        paddingTop: 10,
                        paddingBottom: 10,
                        backgroundColor: colors.WHITE
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenName.REVIEW_DETAILS_SCREEN, {
                                item: selectedItem
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
                                    marginTop: 5,
                                    marginBottom: 5,
                                    width: 50,
                                    height: 50,
                                }}
                                resizeMode={selectedItem.companySelected.id === "HMeHpTjKctnJpYJKEsWA" ? 'cover' : 'contain'}
                                source={selectedItem.companySelected.image !== undefined &&
                                selectedItem.companySelected.image !== null && selectedItem.companySelected.image !== "" ?
                                    {uri: selectedItem.companySelected.image} :
                                    require('../assets/images/ic_profile.png')
                                }>
                            </Image>
                            <View style={{
                                marginStart: 5,
                                flex: 1,
                                marginTop: 8,
                                flexDirection: 'column',  // Set flexDirection to 'row' for horizontal arrangement

                            }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 400,
                                        fontFamily: fontStyle.SFProTextRegular,
                                        color: colors.BLACK,
                                    }}>
                                    {selectedItem.city}
                                </Text>
                                <Text
                                    numberOfLines={2}            // Set the maximum number of lines
                                    ellipsizeMode="tail"
                                    style={{
                                        flex: 1,
                                        marginTop: 5,
                                        fontSize: 10,
                                        fontFamily: fontStyle.SFProTextRegular,
                                        color: colors.BLACK,
                                    }}>
                                    {selectedItem.comment}
                                </Text>
                            </View>

                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                flexDirection: 'row'
                            }}>
                                <Rating
                                    readonly
                                    startingValue={selectedItem.rating}
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
                </View>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})

export default SearchByCityScreen;
