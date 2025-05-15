import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AccountSettingsScreen = () => {
  // State for language preference
  const [language, setLanguage] = useState('English');

  // State for notification settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // State for availability toggle
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Language Preference */}
      <Text style={styles.header}>Language Preference</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={language} onValueChange={(itemValue) => setLanguage(itemValue)}>
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Spanish" value="Spanish" />
          <Picker.Item label="French" value="French" />
          <Picker.Item label="German" value="German" />
        </Picker>
      </View>

      {/* Notification Settings */}
      <Text style={styles.header}>Notification Settings</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      {/* Availability Toggle (Active/Inactive) */}
      <Text style={styles.header}>Availability Status</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>{isAvailable ? 'Available' : 'Unavailable'}</Text>
        <Switch
          value={isAvailable}
          onValueChange={setIsAvailable}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Account Settings</Text>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AccountSettingsScreen;
