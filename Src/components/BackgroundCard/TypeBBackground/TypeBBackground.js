import { Image, StyleSheet, View, Platform } from 'react-native';
import React from 'react';
import { H, W } from '../../../utils/Dimensions';

const TypeBBackground = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Show background only on iOS */}
      {Platform.OS === 'ios' && (
        <>
          <Image
            resizeMode="stretch"
            source={require('../../../../assets/Images/TypeBBackground.png')}
            style={[
              styles.image,
              {
                width: W(200),
                height: H(872),
                right: W(175),
              },
            ]}
          />

          <Image
            resizeMode="stretch"
            source={require('../../../../assets/Images/TypeBBackground1.png')}
            style={[
              styles.image,
              {
                width: W(200),
                height: H(872),
                left: W(178),
                top: -10,
              },
            ]}
          />
        </>
      )}

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
    top: H(1),
  },
  contentWrapper: {
    flex: 1,
    zIndex: 1,
  },
});
