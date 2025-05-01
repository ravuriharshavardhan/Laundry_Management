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
import CustomGradientButton from '../../../components/CustomGradientButton/CustomGradientButton';
import CustomButton from '../../../components/CustomButton/CustomButton';
import InfoCard from '../../../components/InfoCard/InfoCard';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TypeABackground from '../../../components/TypeABackground/TypeABackground';
// import { sendPasswordResetEmail } from '../../../Apis/forgotPassword'; // hypothetical API

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const logEmail = useCallback(
    debounce((val) => console.log('Email input changed:', val), 300),
    []
  );

  const handleResetPassword = useCallback(async () => {
    if (!email) {
      Alert.alert('Missing Email', 'Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      // Example call to API
      // const response = await sendPasswordResetEmail({ email });

      console.log('Sending password reset email to:', email);
      // Simulate success:
      setTimeout(() => {
        Alert.alert(
          'Email Sent',
          'A password reset link has been sent to your email.'
        );
        navigation.goBack();
      }, 1500);
    } catch (error) {
      console.error('Password Reset Error:', error);
      Alert.alert('Error', 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [email, navigation]);

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
              label="Forgot Password"
              subtitle="Enter your email to reset your password"
              highlight="We'll send you a link"
            />

            <View style={{ rowGap: 20 }}>
              <CustomerInput
                iconColor={'#FFA717'}
                placeholder="Email Address"
                iconName="mail-outline"
                value={email}
                onChangeText={(val) => {
                  setEmail(val);
                  logEmail(val);
                }}
                backgroundColor={'#fff'}
              />
            </View>

            <View style={styles.buttonRow}>
              <CustomGradientButton
                title="Send Reset Link"
                onPress={handleResetPassword}
              />
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

export default ForgotPassword;

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
  buttonRow: {
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
});
