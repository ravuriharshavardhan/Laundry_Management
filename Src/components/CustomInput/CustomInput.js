import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomerInput = ({ placeholder, value, onChangeText, iconName, secureTextEntry }) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        placeholderTextColor="#C4C4C4"
        
      />
      <Icon name={iconName} size={20} color="#FFA717" style={styles.icon} />
    </View>
  );
};

export default CustomerInput;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    elevation:10,

  },
  input: {
    flex: 1,
    color: '#333',
    left:30
  },
  icon: {
    marginLeft: 10,
  },
});
