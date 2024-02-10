import React, {useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, Platform} from "react-native";
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BlurView} from '@react-native-community/blur';
import fontDimen from "../styles/fontDimen";
import fontStyle from "../styles/fontStyle";
import colors from "../styles/colors";
import Constants from "../utils/Constants";
import ConstantsFR from "../utils/ConstantsFR";

const ProfileBottomSheet = ({onClose, onPress, disabled, onImageSelected}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleCameraPress = () => {

        if (Platform.OS === 'ios') {
            onClose();
            // If the platform is iOS, set a timeout before picking an image
            setTimeout(() => {
                pickImage();
            }, 500);
        } else {
            // If the platform is not iOS, directly pick an image
            pickImage();
        }
    };

    const handleLibraryPress = () => {

        if (Platform.OS === 'ios') {
            onClose();
            // If the platform is iOS, set a timeout before picking an image
            setTimeout(() => {
                openImageLibrary();
            }, 500);
        } else {
            // If the platform is not iOS, directly pick an image
            openImageLibrary();
        }
    };

    const pickImage = () => {
        let config = {
            mediaType: 'photo',
            maxHeight: 250,
            maxWidth: 250,
            quality: 0.7,
            saveToPhotos: Platform.OS !== 'ios'
        }

        launchCamera(config, (response) => {
            // Check if the user cancelled the image picker
            if (response.didCancel) {
                console.log('User cancelled image picker');
                onClose()
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                onClose()
            } else {
                if (response.assets && response.assets.length > 0) {
                    const selectedImageUri = response.assets[0].uri;
                    setSelectedImage({uri: selectedImageUri});
                    onImageSelected(selectedImageUri);
                }
            }
        });
    };

    const openImageLibrary = () => {
        let mediaType = "photo"

        let config = {
            mediaType: mediaType,
            maxHeight: 250,
            videoQuality: 'low',
            formatAsMp4: true,
            maxWidth: 250
        }
        launchImageLibrary(config, (response) => {
            // Check if the user cancelled the image picker
            if (response.didCancel) {
                console.log('User cancelled image picker');
                onClose()
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                onClose()
            } else {
                if (response.assets && response.assets.length > 0) {
                    const selectedImageUri = response.assets[0].uri;
                    setSelectedImage({uri: selectedImageUri});
                    onImageSelected(selectedImageUri);
                    //onClose()
                }
            }
        });
    };


    return (
        <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            useNativeDriver={true}
            transparent={true}
            isVisible={disabled}
            onBackdropPress={onClose}
            backdropTransitionOutTiming={0}
            hideModalContentWhileAnimating
            style={{margin: 0}}>

            <View style={styles.container}>
                <View
                    style={styles.main}>
                    <View
                        style={styles.buttonBG}
                    >
                        {Platform.OS === 'ios' && (
                            <BlurView
                                style={styles.absolute}
                                blurType="xlight"
                                blurAmount={0.1}
                                reducedTransparencyFallbackColor="white"
                            />
                        )}
                        <TouchableOpacity
                            onPress={
                                handleCameraPress
                            }
                            style={styles.buttonBG}>
                            <Text style={styles.buttonText}>{ConstantsFR.TAKE_A_NEW_PHOTO}</Text>
                        </TouchableOpacity>
                        <View style={styles.divider}/>
                        <TouchableOpacity
                            onPress={
                                handleLibraryPress
                            }
                            style={styles.buttonBG}>
                            <Text style={styles.buttonText}>{ConstantsFR.OPEN_GALLERY}</Text>
                        </TouchableOpacity>
                        <View style={styles.divider}/>
                    </View>

                    <TouchableOpacity
                        style={[styles.buttonBGCancel, {
                            marginTop: 12,
                            marginBottom: 24
                        }]}
                        onPress={onClose}>
                        <Text
                            style={[styles.buttonText, {fontFamily: fontStyle.SFProTextBold}]}>{ConstantsFR.CANCEL}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    main: {
        width: '100%',
        paddingStart: 20,
        paddingEnd: 20,

    },
    buttonBG: {
        borderRadius: 20,
        // backgroundColor: 'rgba(241, 241, 241, 0.5)', // 30% transparency
        ...(Platform.OS === 'ios' ? {backgroundColor: 'transparent'} : {backgroundColor: colors.white_bg}),
    },
    buttonBGCancel: {
        borderRadius: 20,
        backgroundColor: colors.WHITE
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: fontDimen.font_14,
        color: colors.black,
        paddingTop: 18,
        paddingBottom: 18,
        fontFamily: fontStyle.SFProTextRegular,
    },
    divider: {
        borderBottomWidth: 0.5,
        borderBottomColor: colors.system,
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: 20,

    }
});
export default ProfileBottomSheet;
