import React from 'react';
import { ImageBackground, StyleSheet, View, StatusBar } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HomeBackground = ({
  children,
  flexGrow = 1,
  width = '106.9%',
  height = '106%',
  bottom = '2.6%',
  right = '6.7%',
  top = '0%',
}) => {
  return (
    <View style={[styles.container, { flexGrow }]}>
      <StatusBar hidden={true} />

      <ImageBackground
        resizeMode="stretch"
        source={require('../../../../assets/Images/HomeBackground/HomeBackground.png')}
        style={[
          styles.backgroundImage,
          {
            width: wp(parseFloat(width)),
            height: hp(parseFloat(height)),
            bottom: hp(parseFloat(bottom)),
            right: wp(parseFloat(right)),
            top: hp(parseFloat(top)),
          },
        ]}
      >
        {children}
      </ImageBackground>
    </View>
  );
};

export default HomeBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
  },
});
