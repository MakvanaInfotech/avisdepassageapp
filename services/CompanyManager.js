import firestore, {Filter} from "@react-native-firebase/firestore";
import FirestoreConstant from "./FirestoreConstant";


const collection = firestore().collection(FirestoreConstant.COMPANY_TABLE);

export const getCompanyList = async (callback) => {
    collection
        .get()
        .then((querySnapshot)=>{
            const company = [];
            querySnapshot.forEach(documentSnapshot => {
                // console.log("documentSnapshot",documentSnapshot.id)
                let data = {
                    id: documentSnapshot.id,
                    name: documentSnapshot.data().name,
                    image: documentSnapshot.data().image,
                }
                company.push(data)
            })
            callback(company)
        })

}
