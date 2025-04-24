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
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import CustomerInput from '../../../components/CustomInput/CustomInputA';
import CheckBox from 'react-native-check-box';
import CustomGradientButton from '../../../components/CustomGradientButton/CustomGradientButton';
import CustomButton from '../../../components/CustomButton/CustomButton';
import InfoCard from '../../../components/InfoCard/InfoCard';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TypeABackground from '../../../components/TypeABackground/TypeABackground';
import { loginUser } from '../../../Apis/loginUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../Redux/Slice/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [activeTab, setActiveTab] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  // Debounced loggers
  const logEmail = useCallback(debounce((val) => {
    console.log('Email input changed:', val);
  }, 300), []);

  const logPassword = useCallback(debounce((val) => {
    console.log('Password input changed:', val);
  }, 300), []);

  const handleLogin = useCallback(async () => {
    setLoading(true);
    try {
      const payload = { email, password };
      console.log('Attempting to login with credentials:', payload);

      const result = await loginUser(payload);
      console.log('Login result received:', result);

      if (result?.token) {
        console.log('Login successful, storing token:', result.token);
        await AsyncStorage.setItem('userToken', result.token);
        dispatch(loginSuccess({ token: result.token, user: result.user }));

        // Check specific credentials and navigate accordingly
        if (email === '99210041731@klu.ac.in' && password === 'Qazxcqazxc@01') {
          navigation.replace('UsersListScreen');  // Navigate to Delivery screen
          console.log('Navigating to Delivery screen');
        } else {
          navigation.replace('MainTabs');  // Default navigation
          console.log('Navigating to MainTabs screen');
        }
      } else {
        console.log('Login failed, no token received.');
      }
    } catch (error) {
      console.error('Login Error:', error);
    } finally {
      setLoading(false);
    }
  }, [email, password, dispatch, navigation]);


  const handleRegister = useCallback(() => {
    console.log('Navigating to Signup screen...');
    navigation.navigate('Signup');
    setActiveTab('register');
  }, [navigation]);

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
              label="Login"
              subtitle="By signing in you are agreeing"
              highlight="Terms and Privacy Policy"
            />

            <View style={{ rowGap: 20 }}>
              <CustomerInput
                iconColor={"#FFA717"}
                placeholder="Email Address"
                iconName="mail-outline"
                value={email}
                onChangeText={(val) => {
                  console.log('Email changed:', val);  // Log email input
                  setEmail(val);
                  logEmail(val);
                }}
                backgroundColor={"#fff"}
              />
              <CustomerInput
                iconColor={"#FFA717"}
                placeholder="Password"
                iconName="lock-closed-outline"
                value={password}
                onChangeText={(val) => {
                  console.log('Password changed:', val);  // Log password input
                  setPassword(val);
                  logPassword(val);
                }}
                secureTextEntry
                backgroundColor={"#fff"}
              />
            </View>

            <View style={styles.optionsRow}>
              <CheckBox
                style={styles.checkbox}
                onClick={() => {
                  console.log('Remember password toggled:', !remember);
                  setRemember(!remember);
                }}
                isChecked={remember}
                rightTextStyle={styles.rememberText}
                checkBoxColor="#D4C5C5" // Grey border and tick color
                unCheckedCheckBoxColor="#D4C5C5" // Unchecked border color
                checkedCheckBoxColor="#808080" // Checked border & tick color
                checkBoxBackgroundColor="#fff" // Custom prop – might not be supported
              />
              <Text style={styles.rememberText}>Remember password</Text>

              <TouchableOpacity style={{ marginLeft: 'auto' }}>
                <Text style={styles.link}>Forgot password</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
              <View style={{ flex: 1, marginRight: wp('2%') }}>
                <CustomGradientButton
                  title="Login"
                  active={activeTab === 'login'}
                  onPress={handleLogin}
                />
              </View>
              <View style={{ flex: 1, marginLeft: wp('2%') }}>
                <CustomGradientButton
                  title="Register"
                  active={activeTab === 'register'}
                  onPress={handleRegister}
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

      {/* ✅ Loading Modal Overlay */}
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
  link: {
    color: '#4D7EF9',
    fontSize: hp('1.75%'),
    fontFamily: "trebuc"
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
    fontFamily: "trebuc"
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
    left: 10
  },

});
