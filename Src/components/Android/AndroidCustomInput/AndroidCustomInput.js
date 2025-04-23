import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { H } from '../../../utils/Dimensions';

const AndroidCustomInput = ({
  label,
  value,
  onChangeText,
  editable = true,
  placeholder
}) => {
  return (
    <View style={[styles.container, !editable && styles.disabledContainer]}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={value ? '' : placeholder} // hide placeholder when value exists
        style={[styles.input, !editable && styles.disabledText]}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        placeholderTextColor="#888"
      />
    </View>
  );
};

export default AndroidCustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F9FF',
    borderRadius: 10,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    width: '100%',
    height: H(60), // slightly increased height
    justifyContent: 'center',
  },
  disabledContainer: {
    opacity: 0.6,
  },
  label: {
    color: '#FFA717',
    fontSize: 13,
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    padding: 0,
    margin: 0,
  },
  disabledText: {
    color: '#999',
  },
});
