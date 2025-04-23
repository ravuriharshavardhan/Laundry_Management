import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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
  onPress = null,
  iconColor,
  backgroundColor,
}) => {
  const isTouchable = disabled && typeof onPress === 'function';
  const Wrapper = isTouchable ? TouchableOpacity : View;

  return (
    <Wrapper
      style={[
        styles.inputWrapper,
        { width, height, backgroundColor: backgroundColor || '#fff' },
        disabled && styles.disabledWrapper,
      ]}
      onPress={isTouchable ? onPress : undefined}
      activeOpacity={0.8}
    >
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        style={[styles.input, disabled && styles.disabledInput]}
        placeholderTextColor={disabled ? '#aaa' : '#C4C4C4'}
        pointerEvents={disabled ? 'none' : 'auto'}
      />

      {iconComponent ? (
        iconComponent
      ) : iconName ? (
        <Ionicons
          name={iconName}
          size={20}
          color={iconColor || (disabled ? '#5F6368' : '#C4C4C4')}
          style={styles.icon}
        />
      ) : null}
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
    elevation: 10,
    backgroundColor:"#fff"
  },
  input: {
    flex: 1,
    color: '#333',
    left: 30,
    fontFamily: 'trebuc',
  },
  icon: {
    marginLeft: 10,
  },
  disabledWrapper: {

  },
  disabledInput: {
    color: '#aaa',
  },
});
