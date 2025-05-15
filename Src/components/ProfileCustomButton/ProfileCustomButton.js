// components/CustomButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileCustomBottom = ({ label, onPress, iconName, arrowIcon = true, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Icon name={iconName} size={24} color="#F7941E" style={styles.icon} />
      <Text style={styles.text}>{label}</Text>
      {arrowIcon && <Icon name="chevron-right" size={24} color="#F7941E" style={styles.arrowIcon} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#F9F9FB',
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 20,
  },
  text: {
    fontSize: 16,
    flex: 1, // Ensures the label takes up the available space
  },
  arrowIcon: {
    marginLeft: 10,
  },
});

export default ProfileCustomBottom;
