import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import CustomInput from '../../../components/CustomInput/CustomInputA';


const IdentificationVerificationScreen = () => {
  // State for driver's license/image
  const [licenseImage, setLicenseImage] = useState(null);

  // State for background check status
  const [backgroundCheckStatus, setBackgroundCheckStatus] = useState('Pending'); // Can be "Pending", "Completed", etc.

  // State for insurance information
  const [insuranceInfo, setInsuranceInfo] = useState('');

  // Function to handle image selection for license or ID
  const handleChooseLicenseImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel || response.errorCode) return;
      setLicenseImage(response.assets[0].uri);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Driver's License or ID Upload */}
      <Text style={styles.header}>Driver's License or ID Upload</Text>

      <TouchableOpacity style={styles.photoContainer} onPress={handleChooseLicenseImage}>
        {licenseImage ? (
          <Image source={{ uri: licenseImage }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Upload License Image</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Background Check Status */}
      <Text style={styles.header}>Background Check Status</Text>
      <Text style={styles.statusText}>Current Status: {backgroundCheckStatus}</Text>

      {/* Insurance Information */}
      <Text style={styles.header}>Insurance Information</Text>
      <CustomInput 
        style={styles.input}
        placeholder="Enter your Insurance Information"
        value={insuranceInfo}
        onChangeText={setInsuranceInfo}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ensure all your information is correct before submission.</Text>
      </View>
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
  photoContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  placeholder: {
    width: 200,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#888',
  },
  statusText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
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
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

export default IdentificationVerificationScreen;
