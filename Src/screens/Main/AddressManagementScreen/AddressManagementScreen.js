import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fonts from '../../../utils/fonts';
import CustomGradientButton from '../../../components/CustomGradientButton/CustomGradientButton';

const AddressManagementScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState([]);

  // Fetch the current user's address from local storage
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const storedAddresses = await AsyncStorage.getItem('userAddresses');
        if (storedAddresses) {
          setAddresses(JSON.parse(storedAddresses));
        }
      } catch (error) {
        console.error('Error retrieving addresses:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchAddresses); // Refresh on return

    return unsubscribe;
  }, [navigation]);

  const handleDeleteAddress = (id) => {
    Alert.alert('Delete Address', 'Are you sure you want to delete this address?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: () => {
          const updatedAddresses = addresses.filter((address) => address.id !== id);
          setAddresses(updatedAddresses);
          AsyncStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.addressContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.nameText}>{item.fullName}</Text>
        <Text style={styles.phoneText}>{item.phoneNumber}</Text>
        <Text style={styles.addressText}>
          {item.streetAddress}, {item.city}, {item.state} {item.zipCode}, {item.country}
        </Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => handleDeleteAddress(item.id)}
          style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
        <View style={{marginTop:20}} >
        <Text style={styles.headerText}>Manage Addresses</Text>

<CustomGradientButton
  title="Add New Address"
  onPress={() => navigation.navigate('AddAddressScreen')}
/>

<FlatList
  data={addresses}
  keyExtractor={(item) => item.id}
  renderItem={renderItem}
  contentContainerStyle={styles.addressList}
/>

        </View>
     
    </View>
  );
};

export default AddressManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontFamily: fonts.HomeLabel,
    fontSize: 22,
    color: '#F7941E',
    textAlign: 'center',
    marginBottom: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  phoneText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
  },
  buttonWrapper: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#F7941E',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  addressList: {
    marginTop: 20,
  },
});
