import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {Dimensions} from "react-native";

export default class ManageFont{
    static getSize(size){
        return RFValue(size, 600);
    }
}

// const getFontSize = (size) => {
//     return (
//      RFValue(size)
//     );
// }
//
// export default getFontSize;
