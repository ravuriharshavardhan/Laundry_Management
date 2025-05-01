import React, { useCallback, useState } from 'react';
import {
  View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CustomGradientButton from '../../../components/CustomGradientButton/CustomGradientButton';
import { setAddress, setPickupDate, setPickupTime, setStatus } from '../../../Redux/Slice/AddClothSlice';

const deliveryTypes = [
  {
    id: 'COD',
    label: 'Cash on Delivery',
    image: 'https://img.icons8.com/fluency/96/money.png',
  },
  {
    id: 'Prepaid',
    label: 'Prepaid',
    image: 'https://img.icons8.com/fluency/96/online-payment.png',
  },
];

const paymentMethods = [
  {
    id: 'Cash',
    label: 'Cash',
    image: 'https://img.icons8.com/fluency/96/cash-in-hand.png',
  },
  {
    id: 'UPI',
    label: 'UPI',
    image: 'https://img.icons8.com/fluency/96/upi.png',
  },
  {
    id: 'Card',
    label: 'Card',
    image: 'https://img.icons8.com/fluency/96/bank-card-back-side.png',
  },
];

const ScheduleScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);

  const [deliveryType, setDeliveryType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const getStoredAddress = async () => {
        try {
          const storedAddress = await AsyncStorage.getItem('userAddress');
          const addressArray = storedAddress ? JSON.parse(storedAddress) : [];

          if (addressArray.length > 0) {
            const latestAddress = addressArray[addressArray.length - 1];
            dispatch(setAddress(latestAddress));
          }
        } catch (e) {
          console.error('Failed to load address from storage:', e);
        }
      };

      getStoredAddress();
    }, [dispatch])
  );

  const handleDateConfirm = (date) => {
    dispatch(setPickupDate(date.toISOString()));
    setDatePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    dispatch(setPickupTime(time.toISOString()));
    setTimePickerVisible(false);
  };

  const handleSubmit = () => {
    const orderData = {
      address: order.address,
      pickupDate: order.pickupDate,
      pickupTime: order.pickupTime,
      deliveryType,
      paymentMethod,
      cloths: order.cloths,
      total: order.price,
    };

    dispatch(setStatus(order.price > 50 ? 'accepted' : 'rejected'));
    console.log('Full Order JSON:', JSON.stringify(orderData, null, 2));
    Alert.alert('Order Submitted', 'Your order has been submitted successfully!');
    navigation.navigate('OrderSummaryScreen', { order: orderData });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Schedule Your Dry Cleaning</Text>

      {/* Address Section */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AddAddressScreen')}>
        <Icon name="location-on" size={20} color="#555" />
        <View style={styles.addressCard}>
          <Text style={styles.addressTitle}>Pickup Address</Text>
          {order.address ? (
            <>
              <Text>{order.address.fullName}</Text>
              <Text>{order.address.phoneNumber}</Text>
              <Text>{order.address.streetAddress}</Text>
              <Text>{order.address.city}, {order.address.state} - {order.address.zipCode}</Text>
              <Text>{order.address.country}</Text>
            </>
          ) : (
            <Text>Tap to Add Address</Text>
          )}
        </View>
      </TouchableOpacity>

      {/* Pickup Date & Time */}
      <View style={styles.section}>
        <Text style={styles.label}>Pickup Date</Text>
        <TouchableOpacity style={styles.selectorButton} onPress={() => setDatePickerVisible(true)}>
          <Icon name="calendar-today" size={20} color="#555" />
          <Text style={styles.selectorText}>
            {order.pickupDate ? new Date(order.pickupDate).toLocaleDateString() : 'Select Date'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Pickup Time</Text>
        <TouchableOpacity style={styles.selectorButton} onPress={() => setTimePickerVisible(true)}>
          <Icon name="access-time" size={20} color="#555" />
          <Text style={styles.selectorText}>
            {order.pickupTime ? new Date(order.pickupTime).toLocaleTimeString() : 'Select Time'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Delivery Type */}
      <Text style={styles.label}>Delivery Type</Text>
      <View style={styles.optionRow}>
        {deliveryTypes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.imageOption,
              deliveryType === item.id && styles.imageOptionSelected
            ]}
            onPress={() => setDeliveryType(item.id)}
          >
            <Image source={{ uri: item.image }} style={styles.optionImage} />
            <Text style={styles.optionLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Payment Method */}
      <Text style={styles.label}>Payment Method</Text>
      <View style={styles.optionRow}>
        {paymentMethods.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.imageOption,
              paymentMethod === item.id && styles.imageOptionSelected
            ]}
            onPress={() => setPaymentMethod(item.id)}
          >
            <Image source={{ uri: item.image }} style={styles.optionImage} />
            <Text style={styles.optionLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit Button */}
      <CustomGradientButton title={'Submit Order'} onPress={handleSubmit} />

      {/* Date & Time Modals */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
  },
  addressCard: {
    marginLeft: 10,
    flex: 1,
  },
  addressTitle: {
    fontWeight: '600',
    marginBottom: 5,
    fontSize: 16,
  },
  section: {
    marginVertical: 10,
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    elevation: 1,
    marginVertical: 5,
  },
  selectorText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  imageOption: {
    width: 100,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    elevation: 1,
  },
  imageOptionSelected: {
    borderColor: '#28a745',
    borderWidth: 2,
    elevation: 3,
  },
  optionImage: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
});

export default ScheduleScreen;
