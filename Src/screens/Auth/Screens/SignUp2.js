import {
    ActivityIndicator,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Alert,
} from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import CustomGradientButton from '../../../components/CustomGradientButton/CustomGradientButton';
import CustomButton from '../../../components/CustomButton/CustomButton';
import InfoCard from '../../../components/InfoCard/InfoCard';
import { useNavigation } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TypeABackground from '../../../components/TypeABackground/TypeABackground';
import { useDispatch } from 'react-redux';


import { OtpInput } from 'react-native-otp-entry';
import { verifyOTP } from '../../../Apis/verifyOTP';

const Login = ({ route }) => {

    const navigation = useNavigation();
    const { email } = route.params; // Retrieve email from params
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    console.log(email);


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const logEmail = useCallback(
        debounce(val => {
            console.log('Email input changed:', val);
        }, 300),
        [],
    );


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const logPassword = useCallback(
        debounce(val => {
            console.log('Password input changed:', val);
        }, 300),
        [],
    );

    // Handle login logic asynchronously
    const handleVerifyOTP = async () => {
        if (!otp) {
            Alert.alert('OTP Error', 'Please enter the OTP.');
            return;
        }

        try {
            setLoading(true);

            const response = await verifyOTP({ email, otp });



            console.log(JSON.stringify(response));

            Alert.alert('Success', response.msg);
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert(
                'OTP Verification Failed',
                error.msg || 'Invalid OTP or expired.',
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <StatusBar hidden={true} />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <TypeABackground>
                    <Image
                        source={require('../../../../assets/Images/LoginImage.png')}
                        resizeMode="contain"
                        style={styles.image}
                    />
                    <View style={styles.contentContainer}>
                        <InfoCard
                            label="Otp Verification"
                            subtitle="By signing in you are agreeing"
                            highlight="Terms and Privacy Policy"
                        />

                        <View style={{ rowGap: 20 }}>
                            <OtpInput
                                numberOfDigits={6}
                                focusColor="green"
                                autoFocus={false}
                                hideStick={true}
                                placeholder="******"
                                blurOnFilled={true}
                                disabled={false}
                                type="numeric"
                                secureTextEntry={false}
                                focusStickBlinkingDuration={500}
                                onFocus={() => console.log('Focused')}
                                onBlur={() => console.log('Blurred')}
                                onTextChange={setOtp}
                                onFilled={text => console.log(`OTP is ${text}`)}
                                textInputProps={{
                                    accessibilityLabel: 'One-Time Password',
                                }}
                                textProps={{
                                    accessibilityRole: 'text',
                                    accessibilityLabel: 'OTP digit',
                                    allowFontScaling: false,
                                }}
                                theme={{
                                    containerStyle: styles.container,
                                    pinCodeContainerStyle: styles.pinCodeContainer,
                                    pinCodeTextStyle: styles.pinCodeText,
                                    focusStickStyle: styles.focusStick,
                                    focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                                    placeholderTextStyle: styles.placeholderText,
                                    filledPinCodeContainerStyle: styles.filledPinCodeContainer,
                                    disabledPinCodeContainerStyle:
                                        styles.disabledPinCodeContainer,
                                }}
                            />
                        </View>

                        <View style={styles.buttonRow}>
                            <View style={{ flex: 1, marginLeft: wp('2%') }}>
                                <CustomGradientButton
                                    title="Register"
                                    active={false}
                                    onPress={handleVerifyOTP}
                                />
                            </View>
                        </View>

                        <Text style={styles.connectText}>or connect with</Text>

                        <View style={styles.socialButtons}>
                            <CustomButton
                                backgroundColor="#fff"
                                title="Login with Google"
                                onPress={() => console.log('Google Login button pressed')}
                                icon={require('../../../../assets/Images/GoogleLogo.png')}
                            />
                            <CustomButton
                                backgroundColor="#fff"
                                title="Login with Mail"
                                onPress={() => console.log('Mail Login button pressed')}
                                icon={require('../../../../assets/Images/GmailLogo.png')}
                            />
                        </View>
                    </View>
                </TypeABackground>
            </ScrollView>
            <Modal transparent={true} visible={loading}>
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#FFA717" />
                </View>
            </Modal>
        </>
    );
};

export default Login;

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: hp('20%'),
        alignSelf: 'center',
        marginVertical: hp('3%'),
    },
    contentContainer: {
        paddingHorizontal: wp('5%'),
        marginHorizontal: wp('6%'),
    },
    tabContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: hp('2%'),
    },
    tab: {
        flex: 1,
        paddingVertical: hp('1.2%'),
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#FFA717',
    },
    tabText: {
        fontSize: hp('1.8%'),
        color: '#333',
        fontFamily: 'trebuc',
    },
    activeTabText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    link: {
        color: '#4D7EF9',
        fontSize: hp('1.75%'),
        fontFamily: 'trebuc',
    },
    optionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp('1.2%'),
    },
    rememberText: {
        fontSize: hp('1.75%'),
        color: '#555',
        marginLeft: wp('2%'),
        fontFamily: 'trebuc',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp('2.5%'),
    },
    connectText: {
        textAlign: 'center',
        marginTop: hp('3%'),
        marginBottom: hp('1.5%'),
        color: '#747070',
    },
    socialButtons: {
        marginVertical: wp('1%'),
        rowGap: wp('7%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 8,
        borderRadius: 4,
        left: 10,
    },
});
