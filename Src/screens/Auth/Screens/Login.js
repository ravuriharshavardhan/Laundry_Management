import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackgroundCard from '../../../components/BackgroundCard/MainBackGround';
import TypeABackground from '../../../components/TypeABackground/TypeABackground';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [activeTab, setActiveTab] = useState(false);
  const navigation = useNavigation();

  const handleRegister = useCallback(() => {
    navigation.navigate('Signup');
    setActiveTab('register');
  }, [navigation]);

  return (
    <>
    <StatusBar hidden={true} />
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
            label="Login"
            subtitle="By signing in you are agreeing"
            highlight="Terms and Privacy Policy"
          />
<View style={{rowGap:20}} >
<CustomerInput
            iconColor={"#FFA717"}
            placeholder="Email Address"
            iconName="mail-outline"
            value={email}
            onChangeText={setEmail}
            backgroundColor={"#fff"}
          />
          <CustomerInput
            iconColor={"#FFA717"}
            placeholder="Password"
            iconName="lock-closed-outline"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            backgroundColor={"#fff"}
          />

</View>
          

          <View style={styles.optionsRow}>
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
          </View>

          <View style={styles.buttonRow}>
            <View style={{ flex: 1, marginRight: wp('2%') }}>
              <CustomGradientButton
                title="Login"
                active={activeTab === 'login'}
                onPress={() => setActiveTab('login')}
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
              onPress={() => console.log('Pressed')}
              icon={require('../../../../assets/Images/GoogleLogo.png')}
            />
            <CustomButton
              backgroundColor="#fff"
              title="Login with Mail"
              onPress={() => console.log('Pressed')}
              icon={require('../../../../assets/Images/GmailLogo.png')}
            />
          </View>
        </View>
      </TypeABackground>
    </ScrollView>
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
  title: {
    fontSize: hp('2.5%'),
    color: colors.accent,
    fontFamily: 'Trebuchet-MS-Italic',
    marginTop: hp('1%'),
  },
  subtitle: {
    fontSize: hp('1.75%'),
    color: colors.text,
    fontFamily: fonts.primary,
    lineHeight: hp('3%'),
    marginVertical: hp('2%'),
    top: hp('0.2%'),
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
    marginVertical:wp("1%"),
    rowGap:wp("7%"),
    alignItems: 'center',
    justifyContent: 'center',


  },
});
