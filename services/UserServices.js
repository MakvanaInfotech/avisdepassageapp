import firestore, {Filter} from '@react-native-firebase/firestore';
import FirestoreConstant, {getISOStringFromDate} from "./FirestoreConstant";
import DeviceInfo from "react-native-device-info";
import UserModel from "./Models/UserModel";
import {getProfileUri, getUser, setUser} from "./DataManager";
import auth from "@react-native-firebase/auth";
import {authLogout} from "./AuthService";
import {getProfilePicture} from "./StorageManager";

import {Platform} from "react-native";
import moment from "moment";
import Constants, {firebaseAnalytic} from "../utils/Constants";
import ConstantsFR from "../utils/ConstantsFR";

const usersCollection = firestore().collection(FirestoreConstant.USER_TABLE);
let friendUserId = null;

export const signUpUser = async (userId, name, email, isVerified, emailVerified = true) => {
    const deviceId = await DeviceInfo.getUniqueId();
    const version = await DeviceInfo.getVersion();
    let currentTime = getISOStringFromDate(moment());

    let userModel = new UserModel(
        userId,
        name,
        email,
        "",
        deviceId,
        Platform.OS,
        "",
        version,
        "English",
        "",
        isVerified ? emailVerified : true,
        true,
        false,
        currentTime,
        currentTime,
    );
    await usersCollection
        .doc(userId)
        .set(userModel)
        .then((response) => {
            setUser(userModel)
        }).catch((error) => {
            console.log("error", error)
        });
};

export const updateUser = (userObj, callBack) => {
    usersCollection
        .doc(userObj.userId)
        .set(userObj)
        .then((response) => {
            setUser(userObj)
            if (callBack !== undefined && callBack !== null) {
                callBack();
            }
        }).catch((error) => {
        console.log("updateUser error", error)
    });
};

export const validateUser = (userId, callback) => {
    usersCollection
        .doc(userId)
        // .where(Filter.and(Filter('isActive', '==', true), Filter('isDeleted', '==', false)))
        .get()
        .then(documentSnapshot => {
            if (documentSnapshot.exists === true) {
                setUser(documentSnapshot._data);
                getProfilePicture(userId, true);
            }
            if (callback) {
                callback(documentSnapshot.exists, documentSnapshot._data)
            }
        });
};

export const getUserData = async (userId, callback) => {
    await usersCollection
        .doc(userId)
        .get()
        .then(documentSnapshot => {
            if (callback) {
                callback(documentSnapshot.exists, documentSnapshot._data)
            }
        });
};

export const getUserFCMToken = async (userId, callback) => {
    await usersCollection
        .doc(userId)
        .get()
        .then(documentSnapshot => {
            if (callback) {
                callback(documentSnapshot.exists, documentSnapshot._data.fcmToken)
            }
        });
};

export function deleteData(userId, callback) {
    usersCollection
        .doc(userId)
        .delete()
        .then(() => {
            let user = auth().currentUser;
            user.delete()
                .then(() => {
                    // console.log("User deleted from auth")
                })
                .catch((error) => {
                    // console.log('User Deleted error',error)
                });
            if (callback) {
                callback(true)
            }
            firebaseAnalytic(ConstantsFR.AUTH_EVENT, {
                eventName: ConstantsFR.DELETE_ACCOUNT,
                Message: "Success",
            })
        });
}

export const getUserIdForLogoutDynamicLink = () => {
    return friendUserId
}

export const setUserIdForLogoutDynamicLink = (userId) => {
    friendUserId = userId
}

export const getLoggedUserId = () => {
    if (auth().currentUser) {
        return auth().currentUser.uid
    }
    return ""
};
