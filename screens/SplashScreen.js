import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {ScreenName} from "../utils/Constants";
import colors from "../styles/colors";
import {CommonActions} from '@react-navigation/native';


const SplashScreen = ({navigation}) => {
    useEffect(()=>{
        setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{name: ScreenName.MAIN_SCREEN}],
                }));
        }, 3000)
    })
    return (
        <View
        style={{
            backgroundColor:colors.PRIMARY_COLOR,
            alignItems:'center',
            flex:1,
            justifyContent:'center',
        }}>
            <Image
                style={{ width:211, height:185 }}
                source={require('../assets/images/ic_splash_logo.png')}/>
        </View>
    );
};
export default SplashScreen;
