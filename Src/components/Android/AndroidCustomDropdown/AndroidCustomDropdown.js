import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native';
import { H } from '../../../utils/Dimensions';

const AndroidCustomDropdown = ({
  label,
  value,
  onChange,
  data,
  placeholder = "Select Number of Pieces",
  editable = true,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSelectItem = (item) => {
    // When an item is selected, call the onChange callback to update the value
    onChange(item.value);
    setIsDropdownVisible(false); // Close the dropdown
  };

  return (
    <View style={[styles.container, !editable && styles.disabledContainer]}>
      {/* Input with label as placeholder */}
      <TouchableOpacity
        style={[styles.inputContainer, !editable && styles.disabledText]}
        onPress={() => editable && setIsDropdownVisible(!isDropdownVisible)}
      >
        <TextInput
          style={styles.input}
          editable={false}  // The input is read-only since this is a dropdown
          value={value || ''}  // Display the selected value here
          placeholder={placeholder}
          placeholderTextColor="#999"
        />
        {!!label && <Text style={styles.label}>{label}</Text>} {/* Label inside the box */}
      </TouchableOpacity>

      {/* Dropdown options */}
      {isDropdownVisible && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelectItem(item)}  // Update the value when an item is clicked
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default AndroidCustomDropdown;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: '#dcdcdc',
    width: '100%',
    justifyContent: 'center',
  },
  disabledContainer: {
    opacity: 0.6,
  },
  inputContainer: {
    backgroundColor: '#F5F9FF',
    borderRadius: 10,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    height: H(60),
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 15,
    position: 'relative',
  },
  disabledText: {
    color: '#999',
  },
  input: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: '100%',
    top:10,
    backgroundColor: 'transparent', // Makes the background of the input transparent
  },
  label: {
    position: 'absolute',
    left: 15,
    top: 10,
    fontSize: 13,
    color: '#FFA717',
    backgroundColor: '#F5F9FF',
    paddingHorizontal: 5,
    zIndex: 1,
  },
  dropdownContainer: {
    backgroundColor: '#F7941E', // Set the dropdown container background color here
    borderRadius: 10,
    marginTop: 5,
    width: '100%',
    maxHeight: H(200), // Maximum height for the dropdown options
  },
  option: {
    padding: 15,
    borderBottomColor: '#dcdcdc',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});
