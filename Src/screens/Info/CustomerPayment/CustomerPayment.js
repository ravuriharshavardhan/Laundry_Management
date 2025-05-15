import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'; // Modern dropdown picker
import CustomInput from '../../../components/CustomInput/CustomInputA';
import CustomButton from '../../../components/CustomButton/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomerPayment = () => {
  // State for bank account info
  const [bankAccount, setBankAccount] = useState('');

  // State for payment method selection
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [openPaymentDropdown, setOpenPaymentDropdown] = useState(false);

  // State for earnings summary access
  const [earningsAccess, setEarningsAccess] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Bank Account Information */}
      <Text style={styles.header}>Bank Account Information</Text>
      <CustomInput
        style={styles.input}
        placeholder="Enter your Bank Account Number"
        value={bankAccount}
        onChangeText={setBankAccount}
        keyboardType="numeric"
      />

      {/* Payment Method Selection */}
      <Text style={styles.header}>Payment Method</Text>
      <DropDownPicker
        open={openPaymentDropdown}
        value={paymentMethod}
        items={[
          { label: 'Bank', value: 'bank' },
          { label: 'PayPal', value: 'paypal' },
          { label: 'Cash', value: 'cash' },
        ]}
        setOpen={setOpenPaymentDropdown}
        setValue={setPaymentMethod}
        placeholder="Select Payment Method"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      {/* Earnings Summary Access */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[
            styles.checkbox,
            earningsAccess && styles.checkboxSelected,
          ]}
          onPress={() => setEarningsAccess(!earningsAccess)}
        >
          {earningsAccess && (
            <Icon name="check" size={18} color="#fff" />
          )}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Earnings Summary Access</Text>
      </View>

      {/* Save Button */}
      <View style={{ marginTop: 20 }}>
        <CustomButton 
          backgroundColor="#F49905" 
          title="Save Payment Details" 
          onPress={() => {
            // Handle save action here
            alert('Payment details saved successfully!');
          }} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FAFB',
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: '#F49905',
    borderColor: '#F49905',
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
});

export default CustomerPayment;