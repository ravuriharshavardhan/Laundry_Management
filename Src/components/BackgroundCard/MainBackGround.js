import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { heightPercent, widthPercent } from '../../utils/Dimensions';

const ResizableImage = ({
  source,
  size = 100,
  style,
  resizeMode = 'contain', // ✅ Set default
}) => {
  return (
    <Image
      source={source}
      style={[{ width: size, height: size }, style]}
      resizeMode={resizeMode} // ✅ Correctly used here
    />
  );
};

const MainBackGround = ({
  children,
  liftsidesize = widthPercent('-57.5%'),
  topsidesize = heightPercent('27%'),
  rightslide2size = widthPercent('-59%'),
  topslide2size = heightPercent('26%'),
  slide1 = widthPercent('170'),
  slide2 = widthPercent('170'),
  resizeMode = 'contain', // ✅ Add comma here
}) => {
  return (
    <View style={styles.container}>
      {/* Background Layer */}
      <View style={StyleSheet.absoluteFill}>
        {/* Left Image */}
        <View style={[styles.imageWrapper, { left: liftsidesize, top: topsidesize }]}>
          <ResizableImage
            source={require('../../../assets/Images/Slice1.png')}
            size={slide1}
            resizeMode={resizeMode}
          />
        </View>

        {/* Right Image */}
        <View style={[styles.imageWrapper, { right: rightslide2size, top: topslide2size }]}>
          <ResizableImage
            source={require('../../../assets/Images/Slice2.png')}
            size={slide2}
            resizeMode={resizeMode}
          />
        </View>
      </View>

      {/* Foreground Content */}
      <View style={styles.contentWrapper}>
        {children}
      </View>
    </View>
  );
};

export default MainBackGround;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  imageWrapper: {
    position: 'absolute',
  },
  contentWrapper: {
    flex: 1,

  },
});
