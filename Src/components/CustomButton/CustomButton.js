import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

const CustomButton = ({ title, onPress, icon, backgroundColor, width = 247, height = 36, color = '#000' }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { width, height, backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && (
        <View style={styles.iconWrapper}>
          <Image source={icon} style={styles.icon} />
        </View>
      )}
      <Text style={[styles.text, { color }]}>{title}</Text>
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
    flexDirection: 'row',
    paddingHorizontal: 16,
    position: 'relative',
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
    fontSize: 14,
    fontFamily: 'trebuc',
    textAlign: 'center',
  },
});

export default CustomButton;
