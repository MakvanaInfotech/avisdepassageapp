import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {PhoneSignIn} from "./PhoneSignIn";

import {storage} from "../App";
import MainScreen from "./MainScreen";
import Constants, {ScreenName} from "../utils/Constants";
import SplashScreen from "./SplashScreen";
import AddReviewScreen from "./AddReviewScreen";
import {ProfileScreen} from "./ProfileScreen";
import {SignInScreen} from "./SignInScreen";
import {SignUpScreen} from "./SignUpScreen";
const Stack = createNativeStackNavigator();


export function NavigationStackScreens({navigation}) {
    return (
        <Stack.Navigator>
            {/*{(*/}
            {/*    !storage.getBoolean("isLogin") ?*/}
            {/*        <Stack.Screen*/}
            {/*            name="PhoneSignIn"*/}
            {/*            component={PhoneSignIn}*/}
            {/*            options={{headerShown: false}}*/}
            {/*        />*/}
            {/*        :*/}
            {/*        <Stack.Screen*/}
            {/*            name="MainScreen"*/}
            {/*            component={MainScreen}*/}
            {/*            options={{headerShown: false}}*/}
            {/*        />*/}

            {/*)}*/}
            {/*{(*/}
            {/*    storage.getBoolean("isLogin") ?*/}
            {/*        <Stack.Screen*/}
            {/*            name="PhoneSignIn"*/}
            {/*            component={PhoneSignIn}*/}
            {/*            options={{headerShown: false}}*/}
            {/*        />*/}
            {/*        :*/}
            {/*        <Stack.Screen*/}
            {/*            name="MainScreen"*/}
            {/*            component={MainScreen}*/}
            {/*            options={{headerShown: false}}*/}
            {/*        />*/}

            {/*)}*/}

            <Stack.Screen
                name={ScreenName.SPLASH_SCREEN}
                component={SplashScreen}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name={ScreenName.MAIN_SCREEN}
                component={MainScreen}
                options={{headerShown: true}}
            />
            <Stack.Screen
                name={ScreenName.ADD_REVIEW_SCREEN}
                component={AddReviewScreen}
                options={{headerShown: true}}
            />
            <Stack.Screen
                name={ScreenName.PROFILE_SCREEN}
                component={ProfileScreen}
                options={{headerShown: true}}
            />
            <Stack.Screen
                name={ScreenName.SIGN_IN_SCREEN}
                component={SignInScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={ScreenName.SIGN_UP_SCREEN}
                component={SignUpScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="PhoneSignIn"
                component={PhoneSignIn}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}

export function DashStack() {
    return (
        <Stack.Navigator mode="modal">
            {/*Navigation push animation stack*/}
            <Stack.Screen
                name="DashStack"
                component={NavigationStackScreens}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}


