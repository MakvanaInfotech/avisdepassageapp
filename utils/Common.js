import {Alert} from "react-native";


export const showAlertWithButtons = (title, message, btn1, btn2, callback) => {
    console.log("title>>>>> ",title)
    console.log("message>>>>> ",message)
    let buttons = []
    if (btn1) {
        buttons[0] = {
            text: btn1,
            onPress: () => {
                if (callback) {
                    callback(true)
                }
            },
        };
    }
    if (btn2) {
        buttons[1] = {
            text: btn2,
            onPress: () => {
                callback(false)
            },
        }
    }
    Alert.alert(
        title,
        message,
        buttons.length > 0 ? buttons : null,
        {cancelable: false}
    );
}
