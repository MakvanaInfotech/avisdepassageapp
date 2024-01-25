import React, {useEffect, useState} from 'react';
import {Alert, Button, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants from "../styles/Constants";
import {storage} from "../App";


export function PhoneSignIn({navigation}) {
    // If null, no SMS has been sent
    const [mobile, setMobile] = useState(null);
    const [confirm, setConfirm] = useState(null);

    // verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState(Constants.IND_CODE);
    const [cCode, setConfirmCode] = useState(null);

    // Handle login
    function onAuthStateChanged(user) {
        if (user) {
            // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
            // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
            // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
            // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    }

    async function confirmCode() {
        try {
           let confirmData = await confirm.confirm(cCode);
            console.log('Valid code.',JSON.stringify(confirmData));
            storage.set("user",JSON.stringify(confirmData))
            storage.set("isLogin",true)
            console.log("Login flag : ",storage.getBoolean("isLogin"))
            navigation.navigate('MainScreen')
        } catch (error) {
            Alert.alert("Invalid confirmation code","Please enter valid code")
            console.log('Invalid code.',error);
            storage.set("user", JSON.stringify({}))
            storage.set("isLogin",false)
        }
    }
    function handleMobile(text){
        setMobile(text)
    }
    function handleCode(text){
        setCode(text)
    }

    function handleConfirmCode(text){
        setConfirmCode(text)
    }

    // if (!confirm) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: colors.BG_COLOR,
            }}>
                <SafeAreaView/>
                <StatusBar translucent backgroundColor={colors.BG_COLOR}/>

                {/*<View style={{*/}
                {/*    height:50,*/}
                {/*    marginTop:22,*/}
                {/*    alignItems:'center',*/}
                {/*    justifyContent:'center',*/}
                {/*    backgroundColor:colors.PRIMARY_COLOR,*/}
                {/*    flexDirection:'row',*/}
                {/*}}>*/}
                {/*    <Text*/}
                {/*        style={{*/}
                {/*            fontFamily: fontStyle.MontserratBold,*/}
                {/*            fontSize: 20,*/}
                {/*            color: colors.WHITE*/}
                {/*        }}>{Constants.APP_TITLE}</Text>*/}
                {/*</View>*/}
                <View style={{
                    flex:1,
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    {(
                        !confirm ?
                            <View style={{
                                flexDirection:'column',
                                width:'100%',
                            }}>

                                <View style={{
                                    flexDirection:'row'
                                }}>
                                    <TextInput
                                        style = {{
                                            marginBottom: 20,
                                            marginTop: 20,
                                            marginLeft: 20,
                                            height: 50,
                                            borderColor: colors.FONT_COLOR,
                                            borderWidth: 1,
                                            borderRadius:6,
                                            paddingStart:10,
                                            paddingEnd:10,
                                            color:colors.FONT_COLOR,
                                            fontFamily: fontStyle.SFProTextBold,
                                            fontSize: 14,
                                        }}
                                        editable={false}
                                        selectTextOnFocus={false}
                                        // defaultValue={code}
                                        value={code}
                                        returnKeyType={"next"}
                                        underlineColorAndroid = "transparent"
                                        // placeholder ={Constants.IND_CODE}
                                        placeholderTextColor ={colors.FONT_COLOR}
                                        autoCapitalize = "none"
                                        // onChangeText = {handleCode}
                                    />
                                    <TextInput
                                        style = {{
                                            marginBottom: 20,
                                            marginTop: 20,
                                            marginLeft: 5,
                                            marginEnd:22,
                                            height: 50,
                                            borderColor: colors.FONT_COLOR,
                                            borderWidth: 1,
                                            borderRadius:6,
                                            paddingStart:10,
                                            flex:1,
                                            color:colors.FONT_COLOR,
                                            fontFamily: fontStyle.SFProTextBold,
                                            fontSize: 14,
                                        }}
                                        returnKeyType={"next"}
                                        underlineColorAndroid = "transparent"
                                        placeholder ={Constants.ENTER_MOBILE_NO}
                                        placeholderTextColor ={colors.FONT_COLOR}
                                        autoCapitalize = "none"
                                        onChangeText = {handleMobile}
                                    />
                                </View>

                                <TouchableOpacity
                                    onPress={()=>{
                                        if (mobile === null || mobile.trim() === "") {
                                            Alert.alert("", "Please enter Mobile number")
                                            return;
                                        }
                                        signInWithPhoneNumber(code + mobile)
                                    }}
                                    style={{
                                        // flex:1,
                                        marginBottom:10,
                                        width:"90%",
                                        alignSelf:'center',
                                    }}>
                                    <Text
                                        style={{
                                            fontFamily: fontStyle.SFProTextBold,
                                            fontSize: 16,
                                            paddingTop:16,
                                            alignSelf:'center',
                                            width:"100%",
                                            paddingBottom:16,
                                            textAlign:'center',
                                            paddingStart:20,
                                            paddingEnd:20,
                                            borderRadius:6,
                                            backgroundColor:colors.BUTTON_BG_COLOR,
                                            color: colors.FONT_COLOR}}>{
                                        Constants.SUBMIT
                                    }</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{
                                flexDirection:'column',
                                width:"100%",
                            }}>
                                <TextInput
                                    style = {{
                                        width:"90%",
                                        marginBottom: 20,
                                        // marginTop: 20,
                                        // marginLeft: 5,
                                        // marginEnd:22,
                                        height: 50,
                                        borderColor: colors.FONT_COLOR,
                                        borderWidth: 1,
                                        borderRadius:6,
                                        paddingStart:10,
                                        alignSelf:'center',
                                        color:colors.FONT_COLOR,
                                        fontFamily: fontStyle.SFProTextBold,
                                        fontSize: 14,
                                    }}
                                    returnKeyType={"next"}
                                    underlineColorAndroid = "transparent"
                                    placeholder ={Constants.ENTER_CONFIRM_CODE}
                                    placeholderTextColor ={colors.FONT_COLOR}
                                    autoCapitalize = "none"
                                    onChangeText = {handleConfirmCode}
                                />

                                <TouchableOpacity
                                    onPress={()=>{
                                        if (cCode === null || cCode.trim() === "") {
                                            Alert.alert(Constants.ENTER_CONFIRM_CODE)
                                            return;
                                        }
                                        confirmCode()
                                    }}
                                    style={{
                                        // flex:1,
                                        marginBottom:10,
                                        width:"90%",
                                        alignSelf:'center',
                                    }}>
                                    <Text
                                        style={{
                                            fontFamily: fontStyle.SFProTextBold,
                                            fontSize: 16,
                                            paddingTop:16,
                                            alignSelf:'center',
                                            width:"100%",
                                            paddingBottom:16,
                                            textAlign:'center',
                                            paddingStart:20,
                                            paddingEnd:20,
                                            borderRadius:6,
                                            backgroundColor:colors.BUTTON_BG_COLOR,
                                            color: colors.FONT_COLOR}}>{
                                        Constants.CONFIRM_CODE
                                    }</Text>
                                </TouchableOpacity>
                            </View>
                    )}
                </View>


            </View>
        );
    // }

    // return (
    //     <>
    //         <TextInput value={code} onChangeText={text => setCode(text)} />
    //         <Button title="Confirm Code" onPress={() => confirmCode()} />
    //     </>
    // );
}
