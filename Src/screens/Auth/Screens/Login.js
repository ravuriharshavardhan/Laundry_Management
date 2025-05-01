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
import React, { useCallback, useState } from 'react';
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
  const [activeTab, setActiveTab] = useState('Customer');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logEmail = useCallback(debounce((val) => {
    console.log('Email input changed:', val);
  }, 300), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logPassword = useCallback(debounce((val) => {
    console.log('Password input changed:', val);
  }, 300), []);


    // if (email || password) {
    //   Alert.alert("Missing Fields", "Please fill in both email and password.");
    //   return;
    // }
    // setLoading(true);
    // try {
    //   const payload = { email, password, role: activeTab };
    //   console.log('Attempting to login with credentials:', payload);
    //   const result = await loginUser(payload);
    //   console.log('Login result received:', result);
    //   if (result?.token) {
    //     await AsyncStorage.setItem('userToken', result.token);
    //     dispatch(loginSuccess({ token: result.token, user: result.user }));
    //     if (activeTab === 'Driver') {
    //       navigation.replace('DriverDashboard');
    //     } else {
          navigation.replace('MainTabs');
        // }
  //     } else {
  //       Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Login Error:', error);
  //     Alert.alert('Error', 'Something went wrong during login.');
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [email, password, activeTab, dispatch, navigation]);

  const handleRegister = useCallback(() => {
    navigation.navigate('Signup');
  }, [navigation]);

  const handleForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassword');
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

            {/* Tab Selector */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === 'Customer' && styles.activeTab,
                ]}
                onPress={() => setActiveTab('Customer')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'Customer' && styles.activeTabText,
                  ]}
                >
                  Customer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === 'Driver' && styles.activeTab,
                ]}
                onPress={() => setActiveTab('Driver')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'Driver' && styles.activeTabText,
                  ]}
                >
                  Driver
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ rowGap: 20 }}>
              <CustomerInput
                iconColor="#FFA717"
                placeholder="Email Address"
                iconName="mail-outline"
                value={email}
                onChangeText={(val) => {
                  setEmail(val);
                  logEmail(val);
                }}
                backgroundColor="#fff"
              />
              <CustomerInput
                iconColor="#FFA717"
                placeholder="Password"
                iconName="lock-closed-outline"
                value={password}
                onChangeText={(val) => {
                  setPassword(val);
                  logPassword(val);
                }}
                secureTextEntry
                backgroundColor="#fff"
              />
            </View>

            <View style={styles.optionsRow}>
              <CheckBox
                style={styles.checkbox}
                onClick={() => setRemember(!remember)}
                isChecked={remember}
                rightTextStyle={styles.rememberText}
                checkBoxColor="#D4C5C5"
                unCheckedCheckBoxColor="#D4C5C5"
                checkedCheckBoxColor="#808080"
              />
              <Text style={styles.rememberText}>Remember password</Text>
              <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={handleForgotPassword}>
                <Text style={styles.link}>Forgot password</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
              <View style={{ flex: 1, marginRight: wp('2%') }}>
                <CustomGradientButton
                  title="Login"
                  active={true}
                  onPress={    ()=>      navigation.replace('MainTabs')}
                />
              </View>
              <View style={{ flex: 1, marginLeft: wp('2%') }}>
                <CustomGradientButton
                  title="Register"
                  active={false}
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
