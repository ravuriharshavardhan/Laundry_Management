import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomGradientButton = ({ title, onPress, active = true, width }) => {
  const buttonStyle = width ? { width } : {};

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      {active ? (
        <LinearGradient
          colors={['#E89F16', '#FFAF18']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradientBtn, buttonStyle]}
        >
          <View style={styles.innerShadowTopLeft} />
          <View style={styles.innerShadowBottomRight} />
          <Text style={styles.gradientText}>{title}</Text>
        </LinearGradient>
      ) : (
        <View style={[styles.outlineBtn, { borderColor: '#FF8551' }, buttonStyle]}>
          <Text style={[styles.outlineText, { color: '#FF8551' }]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradientBtn: {
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    position: 'relative',
  },
  gradientText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  outlineBtn: {
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  outlineText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  innerShadowTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: '50%',
    bottom: '50%',
    backgroundColor: '#6E4B0A80',
    opacity: 0.2,
    borderRadius: 30,
    zIndex: -1,
  },
  innerShadowBottomRight: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFF244D',
    opacity: 0.4,
    borderRadius: 30,
    zIndex: -1,
  },
});

export default CustomGradientButton;
