import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { Sizes } from '../../../constants/responsive';

const Login = () => {
  return (
    <LinearGradient
      colors={colors.primaryGradientColors}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={[
        styles.gradientContainer,
        {borderColor: '#F49905', borderWidth: 5},
      ]}>
        <View style={styles.MainContainer}>
        <View style={styles.firstContainer}></View>
        <View style={styles.SecondContainer}></View>

        </View>

    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  firstContainer: {
    backgroundColor: '#fff',
    width:400,

    height:450
  },
  SecondContainer: {
    backgroundColor: '#fff',
    width:400,
    height:450
  },
  MainContainer:{
    alignItems:"center",
    flexDirection:"column",
    flex:1,
    
  }

});
