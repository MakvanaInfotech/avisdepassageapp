import firestore from "@react-native-firebase/firestore";
import FirestoreConstant, {getISOStringFromDate} from "./FirestoreConstant";
import moment from "moment";
import ReviewModel from "./Models/ReviewModel";
import {setUser} from "./DataManager";

const collection = firestore().collection(FirestoreConstant.REVIEW_TABLE);

export const createReview = async (
    userId, userName, companySelectedObj, companyName, selectedDate, rating, postalCode,
    city, comment, packageNumber, shoppingWebSite, submitComplaint,
    email, selectedImage, callback) => {

    let currentTime = getISOStringFromDate(moment());
    let review = new ReviewModel(
        userId, userName, companySelectedObj, companyName, selectedDate, rating, postalCode,
        city, comment, packageNumber, shoppingWebSite, submitComplaint,
        email, selectedImage,
        currentTime,
        currentTime,
    );

    collection
        .add(review)
        .then((snapshot) => {
            // console.log("snapshot : ", snapshot)
            const docId = snapshot.id; // Get the document ID from the snapshot
            // console.log("snapshot id: ", docId)
            if (callback) {
                callback(docId, review)
            }
        })
        .catch((error) => {
            console.log("Create review error: ", error)
            if (callback) {
                callback("")
            }
        });
};


export const updateReview = (docId, reviewObj, callBack) => {
    collection
        .doc(docId)
        .set(reviewObj)
        .then((response) => {
            if (callBack !== undefined && callBack !== null) {
                callBack(true);
            }
        }).catch((error) => {
        callBack(false);
        console.log("updateUser error", error)
    });
};

export const getAllReviewByDocId = async (docId, callback) => {
    await collection
        .get(docId)
        .then(documentSnapshot => {
            if (callback) {
                callback(documentSnapshot.exists, documentSnapshot._data)
            }
        }).catch((err) => {
            if (callback) {
                callback(false)
            }
        });
};
export const getAllReviewByData = async (userId, callback) => {
    await collection
        .get()
        .then(documentSnapshot => {
            if (callback) {
                callback(documentSnapshot.exists, documentSnapshot._data)
            }
        }).catch((err) => {
            if (callback) {
                callback(false)
            }
        });
};
