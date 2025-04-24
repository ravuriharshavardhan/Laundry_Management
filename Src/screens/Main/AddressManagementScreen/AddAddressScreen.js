import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomGradientButton from '../../../components/CustomGradientButton/CustomGradientButton';
import CustomInput from '../../../components/CustomInput/CustomInputA';

const AddAddressScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');

  // Function to validate the address fields
  const validateFields = () => {
    if (!fullName || !phoneNumber || !streetAddress || !city || !state || !zipCode || !country) {
      Alert.alert('Error', 'Please fill all the fields.');
      return false;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return false;
    }

    if (!/^\d{5}$/.test(zipCode)) {
      Alert.alert('Error', 'Please enter a valid ZIP/Postal code.');
      return false;
    }

    return true;
  };

  const handleAddAddress = async () => {
    if (validateFields()) {
      const newAddress = {
        id: new Date().toISOString(),
        fullName,
        phoneNumber,
        streetAddress,
        city,
        state,
        zipCode,
        country,
      };

      try {
        // Get the existing addresses from AsyncStorage
        const storedAddresses = await AsyncStorage.getItem('userAddresses');
        const addresses = storedAddresses ? JSON.parse(storedAddresses) : [];

        // Add the new address to the addresses list
        addresses.push(newAddress);

        // Save the updated addresses to AsyncStorage
        await AsyncStorage.setItem('userAddresses', JSON.stringify(addresses));

        // Navigate back to the AddressManagementScreen
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', 'Failed to save the address.');
        console.error('Error saving address:', error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
   

      <View style={{rowGap:20,marginTop:20}} >
      <Text style={styles.headerText}>Add New Address</Text>
      <CustomInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
        style={[styles.input, styles.inputSpacing]}
      />

      <CustomInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        style={[styles.input, styles.inputSpacing]}
      />

      <CustomInput
        value={streetAddress}
        onChangeText={setStreetAddress}
        placeholder="Street Address"
        style={[styles.input, styles.inputSpacing]}
      />

      <CustomInput
        value={city}
        onChangeText={setCity}
        placeholder="City"
        style={[styles.input, styles.inputSpacing]}
      />

      <CustomInput
        value={state}
        onChangeText={setState}
        placeholder="State/Province"
        style={[styles.input, styles.inputSpacing]}
      />

      <CustomInput
        value={zipCode}
        onChangeText={setZipCode}
        placeholder="ZIP/Postal Code"
        keyboardType="numeric"
        style={[styles.input, styles.inputSpacing]}
      />

      <CustomInput
        value={country}
        onChangeText={setCountry}
        placeholder="Country"
        style={[styles.input, styles.inputSpacing]}
      />

<CustomGradientButton title="Save Address" onPress={handleAddAddress} style={styles.buttonSpacing} />
      </View>

     


    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',

  },
  headerText: {
    fontSize: 22,
    color: '#F7941E',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  inputSpacing: {
    marginBottom: 20, // Added margin-bottom for spacing between inputs
  },
  buttonSpacing: {
    marginTop: 20, // Added margin-top for spacing above the button
  },
});
