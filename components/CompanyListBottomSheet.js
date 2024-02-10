import React, {useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, Platform, FlatList} from "react-native";
import Modal from 'react-native-modal';
import {BlurView} from '@react-native-community/blur';
import colors from "../styles/colors";
import fontDimen from "../styles/fontDimen";
import fontStyle from "../styles/fontStyle";
import Constants from "../utils/Constants";
import ConstantsFR from "../utils/ConstantsFR";

const CompanyListBottomSheet = ({onClose, companyList, disabled, onItemSelected}) => {


    const renderItem = ({item}) => (
        <View>
            <TouchableOpacity
                onPress={()=>onItemSelected(item)}
                style={{
                    borderRadius: 10,
                    ...(Platform.OS === 'ios' ? {backgroundColor: 'transparent'} : {backgroundColor: colors.white_bg}),
                }}>
                <Text style={{
                    marginStart:10,
                    fontSize: fontDimen.font_14,
                    color: colors.BLACK,
                    paddingTop: 10,
                    paddingBottom: 10,
                    fontFamily: fontStyle.SFProTextRegular,
                }}>{item.name}</Text>
            </TouchableOpacity>

            <View style={{
                borderBottomWidth: 0.5,
                borderBottomColor: colors.system,
            }}/>
        </View>

    );
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

            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
            }}>
                <View
                    style={{
                        width: '100%',
                        paddingStart: 20,
                        paddingEnd: 20,

                    }}>
                    <View
                        style={{
                            borderRadius: 20,
                            ...(Platform.OS === 'ios' ?
                                {backgroundColor: 'transparent'} : {backgroundColor: colors.white_bg}),
                        }}
                    >
                        {Platform.OS === 'ios' && (
                            <BlurView
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    borderRadius: 20,
                                }}
                                blurType="xlight"
                                blurAmount={0.1}
                                reducedTransparencyFallbackColor="white"
                            />
                        )}
                        <View style={{
                           flexDirection:'row',
                            alignItems:'center',
                            marginEnd:20,
                            marginTop:10,
                            marginBottom:10,
                        }}>
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: fontDimen.font_14,
                                color: colors.BLACK,
                                flex:1,
                                textAlign:'center',
                                // paddingTop: 10,
                                // paddingBottom: 10,
                                fontFamily: fontStyle.SFProTextBold,
                            }}>{ConstantsFR.COMPANY_LIST}</Text>
                            <TouchableOpacity
                                style={{
                                }}
                                onPress={() => {
                                    onClose()
                                }}
                            >
                                <Image
                                    source={
                                        require('../assets/images/ic_cross.png')
                                    }
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={companyList}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CompanyListBottomSheet;
