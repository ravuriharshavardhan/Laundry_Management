import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/Dimensions';
 // adjust the path if needed

const TypeABackground = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Left Background Image */}
      <Image
        resizeMode="stretch"
        source={require('../../../assets/Images/TypeABackground.png')}
        style={[
          styles.image,
          {
            width: SCREEN_WIDTH * 0.7,
            height: SCREEN_HEIGHT * 1.05,
            left: 0,
            bottom:SCREEN_HEIGHT * 0.0001
          },
        ]}
      />

      {/* Right Background Image */}
      <Image
        resizeMode="stretch"
        source={require('../../../assets/Images/TypeA1Background.png')}
        style={[
          styles.image,
          {
            width: SCREEN_WIDTH * 0.6,
            height: SCREEN_HEIGHT * 1.05,
            left: SCREEN_WIDTH * 0.40,
            bottom:SCREEN_HEIGHT * 0.0001
          },
        ]}
      />

      {/* Foreground Content */}
      <View style={styles.contentWrapper}>
        {children}
      </View>
    </View>
  );
};

export default TypeABackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
  },
  image: {
    position: 'absolute',
  },
  contentWrapper: {
    flex: 1,
    zIndex: 1,
    width: '100%',
  },
});
