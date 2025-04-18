import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

const CustomButton = ({ title, onPress, icon, backgroundColor, width = 247, height = 36 }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { width, height, backgroundColor }]}
      onPress={onPress}
    >
      {/* Absolute icon container on the left */}
      {icon && (
        <View style={styles.iconWrapper}>
          <Image source={icon} style={styles.icon} />
        </View>
      )}

      {/* Centered text */}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
  },
  iconWrapper: {
    position: 'absolute',
    left: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontFamily: "trebuc",
  },
});

export default CustomButton;
