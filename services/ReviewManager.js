import firestore from "@react-native-firebase/firestore";
import FirestoreConstant, {getISOStringFromDate} from "./FirestoreConstant";
import moment from "moment";
import ReviewModel from "./Models/ReviewModel";

const collection = firestore().collection(FirestoreConstant.REVIEW_TABLE);

export const createReview = async (
    userId, userName, companyName, selectedDate, rating, postalCode,
    city, comment, packageNumber, shoppingWebSite, submitComplaint,
    email, selectedImage, callback) => {

    let currentTime = getISOStringFromDate(moment());
    let review = new ReviewModel(
        userId, userName, companyName, selectedDate, rating, postalCode,
        city, comment, packageNumber, shoppingWebSite, submitComplaint,
        email, selectedImage,
        currentTime,
        currentTime,
    );

    collection
        .add(review)
        .then((snapshot) => {
            const docId = snapshot.id; // Get the document ID from the snapshot
            console.log("snapshot : ",docId)
            if (callback) {
                callback(docId)
            }
        })
        .catch((error)=>{
            console.log("Create review error: ",error)
            if(callback){
                callback("")
            }
        });
};

export const getNotificationHistoryData = async (userId, callback) => {
    await collection
        .doc(userId)
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

export const deleteAllNotificationHistory = async (userId, callback) => {
    collection
        .doc(userId)
        .delete()
        .then(() => {
            console.log('All Notification History deleted!');
            if (callback) {
                callback(true)
            }
        });
}
