import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

const CustomButton = ({ title, onPress, icon }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        {/* Image on the left */}
        {icon && <Image source={icon} style={styles.icon} />}
        {/* Text in the center */}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 247,
    height: 36,
    borderRadius: 30,
    backgroundColor: '#fff', // Customize as needed
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4, // For Android shadow
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20, // Customize the size of the icon
    height: 20, // Customize the size of the icon
    marginRight: 10, // Add space between the image and the text
  },
  text: {
    color: '#747070', // Customize as needed
    fontSize: 14,
    fontFamily: "Coda-Regular", // Ensure font is applied
  },
});

export default CustomButton;
