import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import CustomInput from '../../../components/CustomInput/CustomInputA';
import CustomButton from '../../../components/CustomButton/CustomButton';

const DeliveryPreferencesScreen = () => {
  const [preferredTime, setPreferredTime] = useState('');
  const [deliveryZone, setDeliveryZone] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [availableDays, setAvailableDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const handleSave = () => {
    console.log('Saved Delivery Preferences:', { preferredTime, deliveryZone, vehicleType, availableDays });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Delivery Preferences</Text>

      {/* Preferred Delivery Time */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Preferred Delivery Time</Text>
        <CustomInput
          style={styles.textInput}
          placeholder="Enter preferred delivery time"
          value={preferredTime}
          onChangeText={setPreferredTime}
        />
      </View>

      {/* Delivery Zone */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Delivery Zone / Area of Operation</Text>
        <CustomInput
          style={styles.textInput}
          placeholder="Enter delivery zone"
          value={deliveryZone}
          onChangeText={setDeliveryZone}
        />
      </View>

      {/* Vehicle Type */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Vehicle Type</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={vehicleType}
            onValueChange={(itemValue) => setVehicleType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select vehicle type..." value="" />
            <Picker.Item label="Bike" value="bike" />
            <Picker.Item label="Car" value="car" />
            <Picker.Item label="Van" value="van" />
          </Picker>
        </View>
      </View>

      {/* Available Days */}
      <Text style={styles.inputLabel}>Available Days</Text>
      <View style={styles.checkboxContainer}>
        {Object.keys(availableDays).map((day) => (
          <View key={day} style={styles.checkboxGroup}>
            <CheckBox
              value={availableDays[day]}
              onValueChange={() =>
                setAvailableDays((prev) => ({ ...prev, [day]: !prev[day] }))
              }
            />
            <Text style={styles.checkboxLabel}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
          </View>
        ))}
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <CustomButton width={"100%"} height={"50"} backgroundColor={"#F49905"} title={"Save Preferences"} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  button: {
    marginTop: 20,
  },
});

export default DeliveryPreferencesScreen;
