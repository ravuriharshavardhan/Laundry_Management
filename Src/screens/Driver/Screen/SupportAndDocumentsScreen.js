import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import CustomInput from '../../../components/CustomInput/CustomInputA';
import CustomButton from '../../../components/CustomButton/CustomButton';

const SupportAndDocumentsScreen = () => {
  // State for Terms and Conditions acceptance
  const [termsAccepted, setTermsAccepted] = useState(false);

  // State for support contact info
  const [contactInfo, setContactInfo] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Terms & Conditions Acceptance */}
      <Text style={styles.header}>Terms & Conditions</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={termsAccepted}
          onValueChange={setTermsAccepted}
        />
        <Text style={styles.checkboxLabel}>I accept the Terms & Conditions</Text>
      </View>

      {/* Support Contact Info */}
      <Text style={styles.header}>Support Contact Info</Text>
      <CustomInput
        style={styles.input}
        placeholder="Enter Support Contact Info"
        value={contactInfo}
        onChangeText={setContactInfo}
      />

      {/* Training Material Access */}
      <Text style={styles.header}>Training Material Access</Text>
      <TouchableOpacity style={styles.button}>
   <CustomButton width={"100%"} height={"50"} backgroundColor={"#F49905"} title={"Access Training Materials"} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
   <CustomButton width={"100%"} height={"50"} backgroundColor={"#F49905"} title={"Save"} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {

    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SupportAndDocumentsScreen;
