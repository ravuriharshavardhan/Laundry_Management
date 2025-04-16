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

const SignUp= () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Username, setUsername] = useState('');
  const [MobileNumber, setMobileNumber] = useState('');
  const [remember, setRemember] = useState(false);
  const [activeTab, setActiveTab] = useState(false);
  const navigation = useNavigation()


  const handleRegister = useCallback(()=>{

    navigation.navigate("SignUp2")
    setActiveTab('register')

  },[navigation])

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
        <CurvedCard height={860}
  borderRadius={0}
  curve1={{ c1: 30, c2: 500 }}
  curve2={{ c1: 35, c2: -180 }}
  sideShadowColor="rgba(0, 0, 0, 0)"
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


<View style={{marginVertical:-17}}>

<CustomerInput
            placeholder="Username"
            value={Username}
            onChangeText={setUsername}
          />
          <CustomerInput
            placeholder="Mobile Number"
            value={MobileNumber}
            onChangeText={setMobileNumber}
          />
          <CustomerInput
            placeholder="Email Address"
            iconName="mail-outline"
            value={email}
            onChangeText={setEmail}
          />
          <CustomerInput
            placeholder="Password"
            iconName="lock-closed-outline"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
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
              tintColors={{ true: "#B4A8A8", false: "#B4A8A8" }}
            />
            <Text style={styles.rememberText}>Remember password</Text>
            <TouchableOpacity style={{ marginLeft: 'auto' }}>
              <Text style={styles.link}>Forgot password</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
      
            <View style={{ flex: 1, marginLeft: 8 }}>
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
              title="Login with Google"
              onPress={() => console.log('Pressed')}
              icon={require('../../../../assets/Images/GoogleLogo.png')}
            />
            <CustomButton
              title="Login with Mail"
              onPress={() => console.log('Pressed')}
              icon={require('../../../../assets/Images/GmailLogo.png')}
            />
          </View>
        </View>
      </CurvedCard>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#000',
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
   marginTop:16,
  },
  rememberText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
    marginVertical:20
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    alignContent: "center",
    justifyContent: "center"
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
