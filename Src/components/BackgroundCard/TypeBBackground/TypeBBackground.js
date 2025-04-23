import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { H, W } from '../../../utils/Dimensions';


const TypeBBackground = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Left Side Background */}
      <Image
        resizeMode="stretch"
        source={require('../../../../assets/Images/TypeBBackground.png')}
        style={[
          styles.image,
          {
            width: W(188.5),   // Half of 375 design width
            height: H(872),    // Full design height
            right: W(189),
          },
        ]}
      />
      
      <Image
        resizeMode="stretch"
        source={require('../../../../assets/Images/TypeBBackground1.png')}
        style={[
          styles.image,
          {
            width: W(188.5),
            height: H(872),
            left: W(187.5),
          },
        ]}
      />

      {/* Content over background */}
      <View style={styles.contentWrapper}>
        {children}
      </View>
    </View>
  );
};

export default TypeBBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  image: {
    position: 'absolute',
    top: 0,
  },
  contentWrapper: {
    flex: 1,
    zIndex: 1,
  },
});
