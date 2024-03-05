/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
    NativeModules,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {CommonActions, NavigationContainer} from '@react-navigation/native';

import {firebase} from "@react-native-firebase/database";

import {MMKV} from 'react-native-mmkv'
import {DashStack} from "./screens/DashStack";
import auth from "@react-native-firebase/auth";
import {validateUser} from "./services/UserServices";
import {getUser} from "./services/DataManager";
import {ScreenName} from "./utils/Constants";

export const storage = new MMKV()

export let language = storage.getString('language');

if (language === undefined) {
    language = "fr"
    storage.set('language', language)
}
export function changeLanguage( lang, navigation ) {
    storage.set('language', lang)
    language = lang
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{name: ScreenName.MAIN_SCREEN}],
        }));
}

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const firebaseConfig = {
        apiKey: "AIzaSyDSEsOgwv3SKSeS3v0Kd_e6pNakgGMJBFw",
        authDomain: "avis-de-passage.firebaseapp.com",
        projectId: "avis-de-passage",
        storageBucket: "avis-de-passage.appspot.com",
        messagingSenderId: "968907835431",
        appId: "1:968907835431:web:be82864e184b27a2b86602",
        measurementId: "G-XTPMQ0X0KH",
        databaseURL: "https://avis-de-passage.firebaseapp.com",

    };

    let app;
    if (firebase.apps.length === 0) {
        app = firebase.initializeApp(firebaseConfig)
    } else {
        app = firebase.app()
    }

    useEffect(() => {
        const isAuthenticatedUser = auth().currentUser;
        if (isAuthenticatedUser) {
            validateUser(auth().currentUser.uid, (callback => {
                let userData = getUser();
            }))
        }
    })

    return (
        <View
            style={{
                flex: 1,
            }}>
            <StatusBar translucent backgroundColor="transparent"/>
            <NavigationContainer>
                {<DashStack/>}
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
