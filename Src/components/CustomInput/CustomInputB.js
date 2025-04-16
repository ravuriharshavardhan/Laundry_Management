import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fonts from '../../utils/fonts';

const CustomerInputB = ({
  placeholder,
  value,
  onChangeText,
  iconName,
  iconComponent,
  secureTextEntry,
  width = '100%',
  height = 50,
  disabled = false,
  onPress = null,
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
        placeholderTextColor={disabled ? '#000' : '#000'}
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

export default CustomerInputB;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#F7941E',
    marginVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    color: '#000',
    fontFamily: fonts.inputblabel,
    paddingVertical: 5,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  disabledWrapper: {
    borderColor: '#eee',
  },
  disabledInput: {
    color: '#aaa',
  },
});
