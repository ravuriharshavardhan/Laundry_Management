import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import CustomInput from '../../../components/CustomInput/CustomInputA';
import CustomButton from '../../../components/CustomButton/CustomButton';

const PaymentDetailsScreen = () => {
  const [bankAccount, setBankAccount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [earningsAccess, setEarningsAccess] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Payment Details</Text>

      {/* Card-like form container */}
      <View style={styles.card}>
        {/* Bank Account */}
        <Text style={styles.label}>Bank Account Number</Text>
        <CustomInput
          placeholder="Enter your bank account number"
          value={bankAccount}
          onChangeText={setBankAccount}
          keyboardType="numeric"
        />

        {/* Payment Method */}
        <Text style={styles.label}>Select Payment Method</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={paymentMethod}
            onValueChange={(itemValue) => setPaymentMethod(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Bank" value="bank" />
            <Picker.Item label="PayPal" value="paypal" />
            <Picker.Item label="Cash" value="cash" />
          </Picker>
        </View>

        {/* Earnings Summary Access */}
        <View style={styles.checkboxRow}>
          <CheckBox
          
            value={earningsAccess}
            onValueChange={setEarningsAccess}
            tintColors={{ true: '#F7941E', false: '#aaa' }}
            boxType={Platform.OS === 'ios' ? 'square' : undefined}
            style={Platform.OS === 'ios' && styles.iosCheckbox}
          />
          <Text style={styles.checkboxLabel}>Allow earnings summary access</Text>
        </View>

        {/* Save Button */}
        <CustomButton
          label="Save Payment Details"
          onPress={() => console.log('Saving...')}
          iconName="content-save-outline"
          arrowIcon={false}
          backgroundColor="#F7941E"
        />
      </View>
    </ScrollView>
  );
};

export default PaymentDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FAFC',
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F7941E',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    color: '#333',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
  },
  iosCheckbox: {
    width: 20,
    height: 20,
  },
});
