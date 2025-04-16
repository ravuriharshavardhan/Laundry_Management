import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

const CustomButton = ({ title, onPress, icon,backgroundColor, width = 247, height = 36 }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { width, height },{backgroundColor:backgroundColor}]}
      onPress={onPress}
    >
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
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10, // More appropriate than using `right`
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontFamily: "Coda-Regular",
  },
});

export default CustomButton;
