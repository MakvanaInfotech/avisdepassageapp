import auth from '@react-native-firebase/auth';
import 'react-native-get-random-values'
import Constants, {firebaseAnalytic} from "../utils/Constants";
import ConstantsFR from "../utils/ConstantsFR";

export const checkAuthStatus = async (callback) => {
    const user = auth().currentUser;
    if (user) {
        console.log('User email: ', user.email);
        callback(true)
    } else {
        callback(false)
    }
};

export const authLogout = async () => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
};

//----------------------------Perform create user using email/password------------------------------//
export const performEmailSignUp = async (email, password, callback) => {
    auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user", user)

            if (callback) {
                callback(null, userCredential);
            }
            // Send email verification
            return user.sendEmailVerification();

        })
        .then(() => {
            // Email verification sent successfully
            console.log("Email verification sent.");
            // You can perform additional actions here if needed
        }).catch((error) => {
            // Handle SignUp or email verification error
            const errorCode = error.code;
            const errorMessage = error.message;

            if (callback) {
                callback(error, null);
            }
        firebaseAnalytic(ConstantsFR.AUTH_EVENT, {
            eventName: ConstantsFR.EMAIL_SIGN_UP_TEXT,
            Message: "Failed",
            Error: JSON.stringify(error)
        })
            console.log("SignUp or email verification error:", errorCode, errorMessage);
        });
};

//----------------------------Perform email/password sigin------------------------------//
export const performEmailSignIn = async (email, password, callback) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);

        // If the SignUp is successful, call the callback with the userCredential
        if (callback) {
            callback(null, userCredential);
        }

        console.log('User account signed in!');
    } catch (error) {
        // If there's an error, call the callback with the error
        if (callback) {
            callback(error, null);
        }
        firebaseAnalytic(ConstantsFR.AUTH_EVENT, {
            eventName: ConstantsFR.EMAIL_SIGN_IN_TEXT,
            Message: "Failed",
            Error: JSON.stringify(error)
        })
    }
};

export const performSendVerificationEmail = async () => {
    await auth().currentUser.sendEmailVerification({
        iOS: {
            bundleId: 'com.avisdepassage',
        },
        android: {
            installApp: true,
            bundleId: 'com.avisdepassage',
        },
    });
};
