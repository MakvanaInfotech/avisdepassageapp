/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
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
import {NavigationContainer} from '@react-navigation/native';

import {firebase} from "@react-native-firebase/database";

import {MMKV} from 'react-native-mmkv'
import {DashStack} from "./screens/DashStack";
import auth from "@react-native-firebase/auth";
import {validateUser} from "./services/UserServices";
import {getUser} from "./services/DataManager";

export const storage = new MMKV()
export const language = "fr"

type SectionProps = PropsWithChildren<{
    title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {children}
            </Text>
        </View>
    );
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
