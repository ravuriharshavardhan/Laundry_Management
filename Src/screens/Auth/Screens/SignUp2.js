import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import CurvedCard from '../../../components/CurvedCard/CurvedCard';
import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';
import CustomerInput from '../../../components/CustomInput/CustomInputA';
import CheckBox from 'react-native-check-box';
import CustomGradientButton from '../../../components/CustomGradientButton/CustomGradientButton';
import CustomButton from '../../../components/CustomButton/CustomButton';
import InfoCard from '../../../components/InfoCard/InfoCard';
import { useNavigation } from '@react-navigation/native';
import BackgroundCard from '../../../components/BackgroundCard/MainBackGround';
import TypeABackground from '../../../components/TypeABackground/TypeABackground';

const SignUp2 = () => {
    const [Adresss, setAdresss] = useState('');
    const [City, setCity] = useState('');
    const [Locality, setLocality] = useState(false);
    const [activeTab, setActiveTab] = useState(false);
    const navigation = useNavigation()


    const handleRegister = useCallback(() => {

        navigation.navigate("MainTabs")
        setActiveTab('register')

    }, [navigation])

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <TypeABackground

            >
                <Image
                    source={require('../../../../assets/Images/LoginImage.png')}
                    resizeMode="contain"
                    style={styles.image}
                />

                <View style={styles.contentContainer}>

                    <InfoCard
                        label="SignUp"
                        subtitle="By signing in you are agreeing"
                        highlight="Terms and Privacy Policy"

                    />


                    <View style={{ marginVertical: 7,rowGap:10 }}>


                        <CustomerInput
                        backgroundColor={"#fff"}
                            placeholder="Adresss"
                            value={Adresss}
                            onChangeText={setAdresss}
                        />
                        <CustomerInput
                                         backgroundColor={"#fff"}
                            placeholder="City"
                            value={City}
                            onChangeText={setCity}
                        />
                        <CustomerInput
                                         backgroundColor={"#fff"}
                            placeholder="Locality"
                            value={Locality}
                            onChangeText={setLocality}
                        />


                    </View>


                    <View style={styles.buttonRow}>


                        <CustomGradientButton
                            width={200}

                            title="Register"
                            active={activeTab === 'register'}
                            onPress={handleRegister}
                        />

                    </View>


                    <Text style={styles.connectText}>or connect with</Text>

                    <View style={styles.socialButtons}>
                        <CustomButton
                            backgroundColor={"#fff"}
                            title="Login with Google"
                            onPress={() => console.log('Pressed')}
                            icon={require('../../../../assets/Images/GoogleLogo.png')}
                        />
                        <CustomButton
                            backgroundColor={"#fff"}
                            title="Login with Mail"
                            onPress={() => console.log('Pressed')}
                            icon={require('../../../../assets/Images/GmailLogo.png')}
                        />
                    </View>
                </View>
            </TypeABackground>
        </ScrollView>
    );
};

export default SignUp2;

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 163,
        alignSelf: 'center',
        marginVertical: 30

    },
    contentContainer: {
        paddingHorizontal: 20,
        marginHorizontal: 25
    },
    title: {
        fontSize: 22,
        color: colors.accent,
        fontFamily: "Trebuchet-MS-Italic",
    },
    subtitle: {
        fontSize: 14,
        color: colors.text,
        fontFamily: fonts.primary,
        lineHeight: 22,
        marginVertical: 15,

    },
    link: {
        color: colors.secondtext,
        fontSize: 14
    },
    optionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    rememberText: {
        fontSize: 14,
        color: colors.text,
        marginLeft: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 40,
        alignItems: 'center',
        alignContent: "center",
        justifyContent: "center",
    },
    loginButton: {
        backgroundColor: colors.accent,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
        flex: 1,
        marginRight: 8,
    },
    loginText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    registerButton: {
        borderColor: colors.accent,
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
        flex: 1,
        marginLeft: 8,
    },
    registerText: {
        color: colors.accent,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    connectText: {
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 10,
        color: "#747070",
        fontFamily: fonts.secondary,

    },
    socialButtons: {
        gap: 20,
        alignItems: 'center',
        justifyContent: "center",
        marginVertical: 20
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: "center",
        justifyContent: "center",
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,

    },
    socialText: {
        marginLeft: 10,
        color: colors.text,
    },
    checkbox: {
        // white background
        borderRadius: 4,
        padding: 5,
    }
});
