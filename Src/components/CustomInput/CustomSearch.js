import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomSearch = ({
  placeholder,
  value,
  onChangeText,
  iconName = 'search',  // Defaulting to the 'search' icon
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
        { width, height, backgroundColor: backgroundColor || '#E7E7E7' },
        disabled && styles.disabledWrapper,
      ]}
      onPress={isTouchable ? onPress : undefined}
      activeOpacity={0.8}
    >
      {/* Icon inside the TextInput */}
      {iconComponent ? (
        iconComponent
      ) : iconName ? (
        <Ionicons
          name={iconName}
          size={20}
          color={iconColor || (disabled ? '#aaa' : '#000')}
          style={styles.icon}
        />
      ) : null}

      {/* TextInput */}
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
    </Wrapper>
  );
};

export default CustomSearch;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    elevation: 10,
    backgroundColor: "#fff",
    justifyContent:"center"

  },
  input: {
    flex: 1,
    color: '#333',
    fontFamily: 'trebuc',
  },
  icon: {
    marginRight: 10,  // Space between the icon and the text
  },
  disabledWrapper: {
    backgroundColor: '#f0f0f0',
  },
  disabledInput: {
    color: '#aaa',
  },
});
