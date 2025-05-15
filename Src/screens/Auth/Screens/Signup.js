// SignUp.js
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
import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';
import CustomerInput from '../../../components/CustomInput/CustomInputA';
import CheckBox from 'react-native-check-box';
import CustomGradientButton from '../../../components/CustomGradientButton/CustomGradientButton';
import CustomButton from '../../../components/CustomButton/CustomButton';
import InfoCard from '../../../components/InfoCard/InfoCard';
import TypeABackground from '../../../components/TypeABackground/TypeABackground';
import {signupUser} from '../../../Apis/signupUser';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [remember, setRemember] = useState(false);
  const [role, setRole] = useState('Customer');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleRegister = useCallback(async () => {
    if (!fullName || !mobileNumber || !email || !password) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }
    const payload = {
      fullName,
      email,
      password,
      role,
    };
  
    console.log('Signup payload:', payload);
  
    try {
      setLoading(true);
      const result = await signupUser(payload);
      console.log('Signup success:', result);
  
      await AsyncStorage.setItem('userInfo', JSON.stringify(result.user || payload));
      if (result.token) {
        await AsyncStorage.setItem('userToken', result.token);
      }
  
      Alert.alert('Success', result.msg || 'Signup successful');
      navigation.navigate('SignUp2', { email });  
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Signup Error', error?.msg || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [fullName, mobileNumber, email, password, role, navigation]);
  

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

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, role === 'Customer' && styles.activeTab]}
              onPress={() => setRole('Customer')}>
              <Text
                style={[
                  styles.tabText,
                  role === 'Customer' && styles.activeTabText,
                ]}>
                Customer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, role === 'Delivery' && styles.activeTab]}
              onPress={() => setRole('Delivery')}>
              <Text
                style={[
                  styles.tabText,
                  role === 'Delivery' && styles.activeTabText,
                ]}>
                Driver
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{rowGap: 10}}>
            <CustomerInput
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              backgroundColor="#fff"
            />
            <CustomerInput
              placeholder="Mobile Number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              backgroundColor="#fff"
            />
            <CustomerInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              backgroundColor="#fff"
            />
            <CustomerInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              backgroundColor="#fff"
            />
          </View>

          <View style={styles.optionsRow}>
            <CheckBox
              style={styles.checkbox}
              isChecked={remember}
              onClick={() => setRemember(!remember)}
              checkBoxColor="#FFA717"
            />
            <Text style={styles.rememberText}>Remember password</Text>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center', top: 10}}>
            <CustomGradientButton
              title="Register"
              onPress={handleRegister}
              width={150}
            />
          </View>

          <Text style={styles.connectText}>or connect with</Text>

          <View style={styles.socialButtons}>
            <CustomButton
              backgroundColor={'#fff'}
              title="Login with Google"
              icon={require('../../../../assets/Images/GoogleLogo.png')}
            />
            <CustomButton
              backgroundColor={'#fff'}
              title="Login with Mail"
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
  scrollView: {flexGrow: 1, backgroundColor: '#fff'},
  image: {width: '100%', height: 163, alignSelf: 'center', marginVertical: 30},
  contentContainer: {paddingHorizontal: 20, marginHorizontal: 25},
  optionsRow: {flexDirection: 'row', alignItems: 'center', marginTop: 16},
  rememberText: {fontSize: 14, color: colors.text, marginLeft: 15},
  checkbox: {width: 20, height: 20},
  connectText: {
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 10,
    color: '#747070',
    fontFamily: fonts.secondary,
  },
  socialButtons: {gap: 20, alignItems: 'center', marginVertical: 20},
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  activeTab: {backgroundColor: '#FFA717'},
  tabText: {fontSize: 16, color: '#333'},
  activeTabText: {color: '#fff', fontWeight: 'bold'},
});
