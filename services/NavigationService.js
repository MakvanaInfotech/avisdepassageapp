import auth from "@react-native-firebase/auth";
import {getLoggedUserId, signUpUser, updateUser, validateUser} from "./UserServices";
import {CommonActions} from "@react-navigation/native";
import {getUser, getUserName, setUser} from "./DataManager";
import {authLogout, performEmailSignIn} from "./AuthService";
import {showAlertWithButtons} from "../utils/Common";
import {Alert} from "react-native";
import Constants, {firebaseAnalytic, ScreenName} from "../utils/Constants";

export async function signUpHelper(navigation, result, signWithEmail, isLogin, pass = "") {

    try {
        //Collect user data
        let userEmail = "";
        let displayName = getUserName();
        let emailVerified = true;
        if (result !== null) {
            if (result.user !== undefined && result.user !== null) {
                try {
                    if (result.user.email !== undefined && result.user.email !== null) {
                        userEmail = result.user.email;
                    }
                    if (displayName === "" && result.user.displayName !== undefined && result.user.displayName !== null) {
                        displayName = result.user.displayName;
                    }

                    if (displayName === "") {
                        if (result.user.name !== undefined && result.user.name !== null) {
                            let name = result.user.name;
                            if (name.firstName !== undefined && name.firstName !== null &&
                                name.lastName !== undefined && name.lastName !== null) {
                                displayName = `${name.firstName} ${name.lastName}`
                            }
                        }
                    }

                    if (result.user.emailVerified !== undefined && result.user.emailVerified !== null) {
                        emailVerified = result.user.emailVerified;
                    }
                } catch (e) {
                    console.log("One of parameters not found:", e)
                }
            }
        }
        //Start signUp process
        const userId = getLoggedUserId();
        await validateUser(userId, async (result) => {

            let userData = getUser();
            if (result === true) {

                if (userData !== undefined && userData !== null && userData.isDeleted) {
                    await authLogout();
                    Alert.alert(
                        Constants.ACCOUNT_DELETED,
                        Constants.ACCOUNT_DELETED_MESSAGE,
                        [
                            {
                                text: Constants.OK,
                                onPress: () => {
                                    setUser(null);

                                    navigation.dispatch(
                                        CommonActions.reset({
                                            index: 1,
                                            routes: [{name: ScreenName.MAIN_SCREEN}],
                                        })
                                    );
                                },
                            },
                        ],
                        {cancelable: false}
                    );
                } else if (userData !== undefined && userData.isVerified) {
                    firebaseAnalytic(Constants.AUTH_EVENT, {
                        eventName: Constants.SIGN_IN,
                        Message: "Successful SIGN IN User",
                        User: userId
                    })
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{
                                name: ScreenName.MAIN_SCREEN,
                                params: {
                                    isFromLogIn: isLogin
                                }
                            }],
                        }));
                } else {
                    if (emailVerified) {
                        updateEmailVerifiedData()
                    } else {
                        console.log("Constants.VERIFICATION_ALERT_TITLE",Constants.VERIFICATION_ALERT_TITLE)
                        console.log("Constants.VERIFICATION_MESSAGE",Constants.VERIFICATION_MESSAGE)
                        showAlertWithButtons(Constants.VERIFICATION_ALERT_TITLE,
                            Constants.VERIFICATION_MESSAGE,
                            Constants.BTN_RESEND,
                            Constants.BTN_PROCEED, async (isBtn1Pressed) => {

                                if (isBtn1Pressed) {
                                    await auth().currentUser.sendEmailVerification();
                                } else {
                                    goToNextAfterSignUpVerified(pass);
                                }
                            })
                    }
                }
            } else {
                if (emailVerified) {
                    await signUpUser(userId, displayName, userEmail, signWithEmail, emailVerified);
                    firebaseAnalytic(Constants.AUTH_EVENT, {
                        eventName: Constants.SIGN_IN_EMAIL,
                        Message: "Successful Email SIGN UP user",
                        User: userId
                    })
                    navigation.navigate(ScreenName.MAIN_SCREEN)
                } else {
                    console.log("emailVerified>>> ",emailVerified)
                    console.log("Constants.VERIFICATION_ALERT_TITLE>>> ",Constants.VERIFICATION_ALERT_TITLE)
                    await signUpUser(userId, displayName, userEmail, signWithEmail, false);

                    showAlertWithButtons(Constants.VERIFICATION_ALERT_TITLE,
                        Constants.VERIFICATION_MESSAGE,
                        Constants.BTN_LOGIN,
                        Constants.BTN_PROCEED, async (isBtn1Pressed) => {
                            if (isBtn1Pressed) {
                                authLogout();
                                navigation.navigate(ScreenName.MAIN_SCREEN)
                            } else {
                                goToNextAfterSignUpVerified(pass);
                            }
                        })
                }
            }
        });
        // Do something with signInResult if needed
    } catch (error) {
        console.log('Error in sign up:', error);
        // Handle the error as needed
    }

    const goToNextAfterSignUpVerified = async (pass) => {
        let userData = getUser();

        await performEmailSignIn(userData.email, pass,
            async (error, userCredential) => {
                if (error) {
                    if (error.code === 'auth/invalid-credential') {
                        Alert.alert("", Constants.INVALID_VALIDATION_MSG);
                    } else {
                        console.log("Error in sign up process:", error.code);
                    }
                    firebaseAnalytic(Constants.AUTH_EVENT, {
                        eventName: Constants.EMAIL_SIGN_IN_TEXT,
                        Message: "Failed",
                        Error: JSON.stringify(error)
                    })
                } else {

                    let user = userCredential.user;
                    let emailVerified = user.emailVerified;

                    if (emailVerified) {
                        updateEmailVerifiedData()
                    } else {
                        console.log("Constants.VERIFICATION_ALERT_TITLE",Constants.VERIFICATION_ALERT_TITLE)
                        console.log("Constants.VERIFICATION_MESSAGE",Constants.EMAIL_VERIFICATION_MSG)

                        showAlertWithButtons(Constants.VERIFICATION_ALERT_TITLE,
                            Constants.EMAIL_VERIFICATION_MSG, Constants.OK);
                    }
                }
            });
    }

    const updateEmailVerifiedData = () => {
        let userData = getUser();
        if (userData !== undefined && userData !== null) {
            userData.isVerified = true;
            updateUser(userData);
            firebaseAnalytic(Constants.AUTH_EVENT, {
                eventName: Constants.SIGN_UP_EMAIL,
                Message: "Successful Email Verified user",
                User: userData
            })
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{name: ScreenName.MAIN_SCREEN}],
                }));
        }
    }
}
