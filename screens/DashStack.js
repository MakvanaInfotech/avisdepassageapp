import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import MainScreen from "./MainScreen";
import {ScreenName} from "../utils/Constants";
import SplashScreen from "./SplashScreen";
import AddReviewScreen from "./AddReviewScreen";
import {ProfileScreen} from "./ProfileScreen";
import {SignInScreen} from "./SignInScreen";
import {SignUpScreen} from "./SignUpScreen";
import ReviewDetailsScreen from "./ReviewDetailsScreen";
import SearchScreen from "./SearchScreen";
import SearchByCompanyScreen from "./SearchByCompanyScreen";
import AverageRatingCompanyDetailsScreen from "./AverageRatingCompanyDetailsScreen";
import AboutUsScreen from "./AboutUsScreen";
import PrivacyPolicyScreen from "./PrivacyPolicyScreen";
import TermConditionScreen from "./TermConditionScreen";
import SendFeedbackScreen from "./SendFeedbackScreen";
import SearchByCityScreen from "./SearchByCityScreen";
import LanguageScreen from "./LanguageScreen";

const Stack = createNativeStackNavigator();


export function NavigationStackScreens({navigation}) {
    return (
        <Stack.Navigator>
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
                name={ScreenName.REVIEW_DETAILS_SCREEN}
                component={ReviewDetailsScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={ScreenName.SEARCH_SCREEN}
                component={SearchScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={ScreenName.SEARCH_BY_COMPANY_SCREEN}
                component={SearchByCompanyScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={ScreenName.SEARCH_BY_CITY_SCREEN}
                component={SearchByCityScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={ScreenName.AVERAGE_RATING_COMPANY_DETAILS_SCREEN}
                component={AverageRatingCompanyDetailsScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={ScreenName.ABOUT_US_SCREEN}
                component={AboutUsScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={ScreenName.PRIVACY_POLICY_SCREEN}
                component={PrivacyPolicyScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={ScreenName.TERM_CONDITIONS_SCREEN}
                component={TermConditionScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={ScreenName.SEND_FEEDBACK_SCREEN}
                component={SendFeedbackScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={ScreenName.LANGUAGE_SCREEN}
                component={LanguageScreen}
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
