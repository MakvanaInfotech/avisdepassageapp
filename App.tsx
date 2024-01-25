/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
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

import { MMKV } from 'react-native-mmkv'
import {DashStack} from "./screens/DashStack";
export const storage = new MMKV()

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
    apiKey: "AIzaSyD2f-z-woL3Lx1WoP9dqPK_hWcX8m1qTJ4",
    authDomain: "devavisdepassage.firebaseapp.com",
    projectId: "devavisdepassage",
    storageBucket: "devavisdepassage.appspot.com",
    messagingSenderId: "989360086735",
    appId: "1:989360086735:web:3117a3f46f49889cb3e1ba",
    measurementId: "G-NPEB12JYSH",
    databaseURL: "https://devavisdepassage.firebaseapp.com",
  };

  let app;
  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
  } else {
    app = firebase.app()
  }

  return (
      <View
          style={{
            flex: 1,
          }}>
        <StatusBar translucent backgroundColor="transparent"/>
        <NavigationContainer>
          {<DashStack />}
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
