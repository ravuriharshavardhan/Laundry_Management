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
import CustomerInput from '../../../components/CustomInput/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from 'react-native-check-box';
import CustomGradientButton from '../../../components/CustomGradientButton/CustomGradientButton';
import CustomButton from '../../../components/CustomButton/CustomButton';
import InfoCard from '../../../components/InfoCard/InfoCard';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [activeTab, setActiveTab] = useState(false);
  const navigation = useNavigation()


  const handleRegister = useCallback(()=>{

    navigation.navigate("Signup")
    setActiveTab('register')

  },[navigation])

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <CurvedCard>
        <Image
          source={require('../../../assets/Images/LoginImage.png')}
          resizeMode="contain"
          style={styles.image}
        />

        <View style={styles.contentContainer}>
          <InfoCard
            label="Login"
            subtitle="By signing in you are agreeing"
            highlight="Terms and Privacy Policy"

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

          <View style={styles.optionsRow}>
            <CheckBox
              value={remember}
              onClick={() => setRemember(!remember)}
              isChecked={remember}
              onValueChange={setRemember}
              tintColors={{ true: colors.accent, false: colors.border }}
            />
            <Text style={styles.rememberText}>Remember password</Text>
            <TouchableOpacity style={{ marginLeft: 'auto' }}>
              <Text style={styles.link}>Forgot password</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <CustomGradientButton
                title="Login"
                active={activeTab === 'login'}
                onPress={() => setActiveTab('login')}
              />
            </View>
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
              icon={require('../../../assets/Images/GoogleLogo.png')}
            />
            <CustomButton
              title="Login with Mail"
              onPress={() => console.log('Pressed')}
              icon={require('../../../assets/Images/GmailLogo.png')}
            />
          </View>
        </View>
      </CurvedCard>
    </ScrollView>
  );
};

export default Login;

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
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text,
    fontFamily: fonts.primary,
    lineHeight: 22,
    marginVertical: 15,
    top: 1
  },
  link: {
    color: colors.secondtext,
    fontSize: 14
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
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
});
