import React, {useEffect} from 'react';
import {
    Linking,
    Platform,
    SafeAreaView, ScrollView,
    StatusBar, StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import colors from "../styles/colors";
import fontStyle from "../styles/fontStyle";
import Constants, {ScreenName} from "../utils/Constants";
import fontDimen from "../styles/fontDimen";
import ConstantsFR from "../utils/ConstantsFR";

const TermConditionScreen = ({navigation}) => {

    const googleAdsPolicyURL = 'https://policies.google.com/technologies/ads?hl=en-US';
    const handleLinkPress = () => {
        Linking.openURL(googleAdsPolicyURL);
    };

    const renderTitle = () => {
        return (
            <View style={{
                flexDirection: 'row',
            }}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                        color: colors.WHITE,
                        fontSize: fontDimen.font_14,
                        fontFamily: fontStyle.SFProTextBold,
                        overflow: 'hidden',
                        textAlign: "center"
                    }}>{ConstantsFR.TERM_CONDITIONS}</Text>
            </View>
        );
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: colors.PRIMARY_COLOR,
                flex: 1
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerBackTitle: ConstantsFR.BACK,
            headerTintColor: colors.WHITE,
            color: colors.WHITE,
            headerTitle: () => renderTitle(),
        });
    }, []);

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.WHITE,
        }}>
            <SafeAreaView/>
            <StatusBar translucent backgroundColor={colors.PRIMARY_COLOR}/>
            <ScrollView style={[styles.container, {
                marginBottom: 10,
            }]}>
                <Text style={styles.heading}>{ConstantsFR.TERM_CONDITIONS}</Text>

                <Text style={styles.sectionHeading}>Personal Information</Text>
                <Text>Avis2passage does not require its customers to provide any personal information. The only
                    exception is your email address which is required only if you decide to create an Avis2passage
                    account with an email and password.</Text>

                <Text style={styles.sectionHeading}>Your Deliveries</Text>
                <Text>Any information that is related to your deliveries (e.g. tracking numbers, postcodes, tracking
                    history) is not shared with any 3rd parties.</Text>

                <Text style={styles.sectionHeading}>Anonymous Information</Text>
                <Text>Avis2passage collects anonymous data about your device that does not directly identify you, such
                    as: version of the app, version of the operating system you are running, system language, device
                    model, timezone, country code. This information is used solely for the purpose of improving our
                    services and is not shared with any 3rd parties.</Text>

                <Text style={styles.sectionHeading}>Account Deletion</Text>
                <Text>You can delete your Avis2passage account in the app settings.</Text>

                <Text style={styles.sectionHeading}>Advertisements</Text>
                <Text>If you are not a subscriber, you will see advertisements in the iOS version of the app. Those ads
                    are managed by Google’s AdMob system. This system was configured not to show personalized ads in
                    Avis2passage. Tracking and analytic capabilities were also disabled. You can read more about
                    Google’s Privacy policies <Text style={styles.link} onPress={handleLinkPress}>here</Text>.</Text>

                <Text style={styles.sectionHeading}>Privacy Policy Changes</Text>
                <Text>From time to time, this privacy policy might be updated with minor changes. Your continued use of
                    this app after any change in this Privacy Policy will constitute your acceptance of such
                    change.</Text>

                <Text style={styles.sectionHeading}>Indemnity</Text>
                <Text>You hereby indemnify us and undertake to keep us indemnified against any losses, damages, costs,
                    liabilities and expenses (including, without limitation, legal expenses and any amounts paid by us
                    to a third party in settlement of a claim or dispute on the advice of our legal advisers) incurred
                    or suffered by us arising out of the use of this app or any breach by you of any provision of these
                    terms of use, or arising out of any claim that you have breached any provision of these terms of
                    use.</Text>

                <Text style={[styles.sectionHeading, {}]}>Contact Us</Text>
                <Text style={{
                    marginBottom: Platform.OS === "ios" ? 20 : 0,
                }}>Please feel free to contact us in case you have any questions.</Text>
            </ScrollView>
            <SafeAreaView/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.BLACK
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: colors.BLACK
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});
export default TermConditionScreen;
