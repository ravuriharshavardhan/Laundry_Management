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
import { submitOrder } from '../../../Apis/submitOrder';

const deliveryTypes = [
  { id: 'COD', label: 'Cash on Delivery', image: 'https://img.icons8.com/fluency/96/money.png' },
  { id: 'Prepaid', label: 'Prepaid', image: 'https://img.icons8.com/fluency/96/online-payment.png' },
];

const paymentMethods = [
  { id: 'Cash', label: 'Cash', image: 'https://img.icons8.com/fluency/96/cash-in-hand.png' },
  { id: 'UPI', label: 'UPI', image: 'https://img.icons8.com/fluency/96/upi.png' },
  { id: 'Card', label: 'Card', image: 'https://img.icons8.com/fluency/96/bank-card-back-side.png' },
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
            dispatch(setAddress(addressArray[addressArray.length - 1]));
          }
        } catch (e) {
          console.error('Address load error:', e);
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

  const handleSubmit = async () => {
    const orderData = {
      address: order.address,
      pickupDate: order.pickupDate,
      pickupTime: order.pickupTime,
      deliveryType,
      paymentMethod,
      cloths: order.cloths,
      total: order.price,
    };

    try {
      const response = await submitOrder(orderData);
      dispatch(setStatus(order.price > 50 ? 'accepted' : 'rejected'));
      Alert.alert('Success', 'Order placed successfully!');
      navigation.navigate('OrderSummaryScreen', { order: response.order });
    } catch (error) {
      Alert.alert('Submission Error', error.message || 'Something went wrong.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Schedule Pickup</Text>

      {/* Address */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AddAddressScreen')}>
        <Icon name="place" size={22} color="#555" />
        <View style={styles.cardContent}>
          <Text style={styles.cardLabel}>Pickup Address</Text>
          {order.address ? (
            <>
              <Text style={styles.cardText}>{order.address.fullName} | {order.address.phoneNumber}</Text>
              <Text style={styles.cardText}>{order.address.streetAddress}, {order.address.city}</Text>
              <Text style={styles.cardText}>{order.address.state}, {order.address.zipCode}</Text>
              <Text style={styles.cardText}>{order.address.country}</Text>
            </>
          ) : (
            <Text style={styles.cardHint}>Tap to add your address</Text>
          )}
        </View>
      </TouchableOpacity>

      {/* Date/Time */}
      <View style={styles.pickerRow}>
        <Text style={styles.sectionTitle}>Pickup Date</Text>
        <TouchableOpacity style={styles.inputBox} onPress={() => setDatePickerVisible(true)}>
          <Icon name="calendar-today" size={20} color="#888" />
          <Text style={styles.inputText}>
            {order.pickupDate ? new Date(order.pickupDate).toLocaleDateString() : 'Select Date'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Pickup Time</Text>
        <TouchableOpacity style={styles.inputBox} onPress={() => setTimePickerVisible(true)}>
          <Icon name="access-time" size={20} color="#888" />
          <Text style={styles.inputText}>
            {order.pickupTime ? new Date(order.pickupTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Time'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Delivery Type */}
      <Text style={styles.sectionTitle}>Delivery Type</Text>
      <View style={styles.options}>
        {deliveryTypes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.optionBox,
              deliveryType === item.id && styles.optionSelected,
            ]}
            onPress={() => setDeliveryType(item.id)}
          >
            <Image source={{ uri: item.image }} style={styles.optionImage} />
            <Text style={styles.optionLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Payment Method */}
      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View style={styles.options}>
        {paymentMethods.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.optionBox,
              paymentMethod === item.id && styles.optionSelected,
            ]}
            onPress={() => setPaymentMethod(item.id)}
          >
            <Image source={{ uri: item.image }} style={styles.optionImage} />
            <Text style={styles.optionLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit */}
      <View style={{ marginTop: 30 }}>
        <CustomGradientButton title="Submit Order" onPress={handleSubmit} />
      </View>

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
    paddingBottom: 40,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 20,
    color: '#222',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginTop: 20,
    color: '#444',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 2,
  },
  cardContent: {
    marginLeft: 12,
    flex: 1,
  },
  cardLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#222',
    marginBottom: 4,
  },
  cardText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#555',
  },
  cardHint: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#AAA',
  },
  pickerRow: {
    marginTop: 12,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginLeft: 10,
    color: '#333',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  optionBox: {
    backgroundColor: '#fff',
    width: '30%',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 2,
  },
  optionSelected: {
    borderColor: '#007BFF',
    borderWidth: 2,
    backgroundColor: '#E6F0FF',
  },
  optionImage: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  optionLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },
});

export default ScheduleScreen;