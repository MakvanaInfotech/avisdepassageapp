import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {PhoneSignIn} from "./PhoneSignIn";

import {storage} from "../App";
import MainScreen from "./MainScreen";
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
                name="MainScreen"
                component={MainScreen}
                options={{headerShown: true}}
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


