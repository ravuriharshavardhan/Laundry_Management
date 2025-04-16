import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomerInput = ({
  placeholder,
  value,
  onChangeText,
  iconName,
  iconComponent,
  secureTextEntry,
  width = '100%',
  height = 50,
  disabled = false,
  onPress = null, // New onPress prop
}) => {
  const Wrapper = disabled && onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      style={[
        styles.inputWrapper,
        { width, height },
        disabled && styles.disabledWrapper
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        style={[
          styles.input,
          disabled && styles.disabledInput
        ]}
        placeholderTextColor={disabled ? '#aaa' : '#C4C4C4'}
        pointerEvents={disabled ? 'none' : 'auto'}
      />
      {iconComponent
        ? iconComponent
        : iconName && (
            <Ionicons
              name={iconName}
              size={20}
              color={disabled ? '#aaa' : '#5F6368'}
              style={styles.icon}
            />
          )}
    </Wrapper>
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
    elevation: 10,
  },
  input: {
    flex: 1,
    color: '#333',
    left: 30,
    fontFamily: 'Trebuchet-MS-Italic',
  },
  icon: {
    marginLeft: 10,
  },
  disabledWrapper: {
    backgroundColor: '#fff',
  },
  disabledInput: {
    color: '#aaa',
  },
});
