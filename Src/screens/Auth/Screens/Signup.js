import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CurvedCard from '../../../components/CurvedCard/CurvedCard';
import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';
import CustomerInput from '../../../components/CustomInput/CustomInputA';
import CheckBox from 'react-native-check-box';
import CustomGradientButton from '../../../components/CustomGradientButton/CustomGradientButton';
import CustomButton from '../../../components/CustomButton/CustomButton';
import InfoCard from '../../../components/InfoCard/InfoCard';
import TypeABackground from '../../../components/TypeABackground/TypeABackground';
import { signupUser } from '../../../Apis/signupUser';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Username, setUsername] = useState('');
  const [MobileNumber, setMobileNumber] = useState('');
  const [remember, setRemember] = useState(false);
  const [activeTab, setActiveTab] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Debounced console logging for each input
  const debouncedLogger = useMemo(
    () => debounce((label, value) => console.log(`${label}:`, value), 500),
    []
  );

  useEffect(() => {
    debouncedLogger('Username', Username);
  }, [Username]);

  useEffect(() => {
    debouncedLogger('MobileNumber', MobileNumber);
  }, [MobileNumber]);

  useEffect(() => {
    debouncedLogger('Email', email);
  }, [email]);

  useEffect(() => {
    debouncedLogger('Password', password);
  }, [password]);

  const handleRegister = useCallback(async () => {
    if (!Username || !MobileNumber || !email || !password) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        fullname: Username,
        email,
        password,
      };

      console.log('Sending signup payload:', payload);

      const result = await signupUser(payload);

      console.log('Signup success response:', result);
      Alert.alert('Success', result.msg);
      navigation.navigate('SignUp2');
      setActiveTab('register');
    } catch (error) {
      console.log('Signup error:', error);
      Alert.alert('Error', error.msg || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }, [Username, MobileNumber, email, password, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <TypeABackground>
        {loading && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#FFA717" />
          </View>
        )}

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

          <View style={{ marginVertical: 7, rowGap: 11 }}>
            <CustomerInput
              backgroundColor={'#fff'}
              placeholder="Username"
              value={Username}
              onChangeText={setUsername}
            />
            <CustomerInput
              backgroundColor={'#fff'}
              placeholder="Mobile Number"
              value={MobileNumber}
              onChangeText={setMobileNumber}
            />
            <CustomerInput
              backgroundColor={'#fff'}
              iconColor={'#FFA717'}
              placeholder="Email Address"
              iconName="mail-outline"
              value={email}
              onChangeText={setEmail}
            />
            <CustomerInput
              backgroundColor={'#fff'}
              iconColor={'#FFA717'}
              placeholder="Password"
              iconName="lock-closed-outline"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* <View style={styles.optionsRow}>
            <CheckBox
              style={styles.checkbox}
              value={remember}
              onClick={() => setRemember(!remember)}
              isChecked={remember}
              checkBoxColor="#fff"
              onValueChange={setRemember}
              tintColors={{ true: '#B4A8A8', false: '#B4A8A8' }}
            />
            <Text style={styles.rememberText}>Remember password</Text>
            <TouchableOpacity style={{ marginLeft: 'auto' }}>
              <Text style={styles.link}>Forgot password</Text>
            </TouchableOpacity>
          </View> */}

          <View style={styles.buttonRow}>
            <View style={{ flex: 1, marginLeft: 8 ,alignItems:"center"}}>
              <CustomGradientButton
              width={150}
                title="Register"
                active={activeTab === 'register'}
                onPress={handleRegister}
              />
            </View>
          </View>

          <Text style={styles.connectText}>or connect with</Text>

          <View style={styles.socialButtons}>
            <CustomButton
              backgroundColor={'#fff'}
              title="Login with Google"
              onPress={() => console.log('Pressed Google')}
              icon={require('../../../../assets/Images/GoogleLogo.png')}
            />
            <CustomButton
              backgroundColor={'#fff'}
              title="Login with Mail"
              onPress={() => console.log('Pressed Mail')}
              icon={require('../../../../assets/Images/GmailLogo.png')}
            />
          </View>
        </View>
      </TypeABackground>
    </ScrollView>
  );
};

export default SignUp;

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
  link: {
    color: colors.secondtext,
    fontSize: hp('1.75%'),
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('1.2%'),
  },
  rememberText: {
    fontSize: hp('1.75%'),
    color: colors.text,
    marginLeft: wp('2%'),
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
    fontFamily: fonts.secondary,
  },
  socialButtons: {
    marginVertical: wp('1%'),
    rowGap: wp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
