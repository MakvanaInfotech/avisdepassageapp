import storage from '@react-native-firebase/storage';
import {setProfileUri} from "./DataManager";

export const uploadProfilePicture = async (userId, localImagePath, callback) => {
    try {
        const reference = storage().ref(`profilePictures/${userId}`);
        await reference.putFile(localImagePath);
        let imageUrl = await reference.getDownloadURL();
        setProfileUri(imageUrl);
        if (callback) {
            callback(true)
        }
    } catch (error) {
        console.log('Error uploading profile picture:', error);
        if (callback) {
            callback(false)
        }
    }
};

export const uploadReviewPhoto = async (reviewId, localImagePath, callback) => {
    try {
         let storageName = "reviewPhoto";

        // Extract the file extension from the localImagePath
        const fileExtension = localImagePath.split('.').pop();

        const reference = storage().ref(`${storageName}/${reviewId}.${fileExtension}`);
        await reference.putFile(localImagePath);

        let imageUrl = await reference.getDownloadURL();

        if (callback) {
             callback(imageUrl);
        }
    } catch (error) {
        console.log('Error uploading profile picture:', error);
        if (callback) {
            callback("");
        }
    }
};

export const getMediaFromStorage  = async (storageName, userId, isLoginUser, callback) => {
    try {
        const reference = storage().ref(`${storageName}/${userId}`);
        let imageUrl = await reference.getDownloadURL();
        if(callback !== undefined && callback !== null){
            callback(imageUrl)
        }
        if(isLoginUser && storageName === "profilePictures"){
            setProfileUri(imageUrl);
        }
    } catch (error) {
        if (callback){
            callback(null)
        }
    }
};
