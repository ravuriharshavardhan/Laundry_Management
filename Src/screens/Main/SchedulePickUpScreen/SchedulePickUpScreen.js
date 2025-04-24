import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MainBackGround from '../../../components/BackgroundCard/MainBackGround';
import CustomerInput from '../../../components/CustomInput/CustomInputA';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { setAddress, setPickupDate, setPickupTime } from '../../../Redux/Slice/AddClothSlice';
import ImageSlider from '../../../ImageSlider/ImageSlider';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../../Config/Config';

const SchedulePickUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cloths = useSelector(state => state.order.cloths);

  const [address, setAddressState] = useState('');
  const [pickupDate, setPickupDateState] = useState('');
  const [pickupTime, setPickupTimeState] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [coupon, setCoupon] = useState('');

  const handleAddCloths = useCallback(() => {
    navigation.navigate('AddCloths');
  }, [navigation]);

  const handlePlaceOrder = async () => {
    console.log('🚨 Attempting to place order...');
    console.log('🧺 Order data:', { address, pickupDate, pickupTime, cloths });

    if (!address || !pickupDate || !pickupTime || !cloths || cloths.length === 0) {
      Alert.alert('Missing Information', 'Please fill in all the required fields');
      return;
    }

    dispatch(setAddress(address));
    dispatch(setPickupDate(pickupDate));
    dispatch(setPickupTime(pickupTime));

    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('📦 Token:', token);

      if (!token) {
        Alert.alert('Authentication Error', 'Please log in again.');
        return;
      }

      const response = await axios.post(
        `${Config.API_BASE_URL}/api/orders/create-order`,
        {
          address,
          pickupDate,
          pickupTime,
          cloths,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        Alert.alert('Success', 'Order created successfully');
        console.log('✅ Order created:', response.data);

        // 📝 Save address to AsyncStorage
        const newAddress = {
          id: Date.now().toString(),
          fullName: 'N/A',
          phoneNumber: 'N/A',
          address: address,
          city: 'N/A',
          state: 'N/A',
          zipCode: 'N/A',
          country: 'N/A',
        };

        try {
          const existing = await AsyncStorage.getItem('userAddresses');
          const addressArray = existing ? JSON.parse(existing) : [];
          const updatedAddresses = [...addressArray, newAddress];
          await AsyncStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
          console.log('📦 Address saved to AsyncStorage');
        } catch (err) {
          console.error('❌ Failed to store address:', err);
        }

        // Optional: navigate to summary screen
        // navigation.navigate('OrderSummary', { order: response.data });
      } else {
        Alert.alert('Error', 'Failed to place the order. Please try again.');
        console.error('❌ API Error Response:', response.data);
      }
    } catch (error) {
      console.error('❌ API Request Failed:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  const handleConfirmDate = selectedDate => {
    if (selectedDate) {
      const formattedDate = selectedDate.toDateString();
      setPickupDateState(formattedDate);
    }
    setShowDatePicker(false);
  };

  const handleConfirmTime = selectedTime => {
    if (selectedTime) {
      const formattedTime = selectedTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setPickupTimeState(formattedTime);
    }
    setShowTimePicker(false);
  };

  return (
    <>
      <StatusBar hidden />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          enableOnAndroid
          extraScrollHeight={Platform.OS === 'ios' ? 60 : 120}
          keyboardShouldPersistTaps="handled"
        >
          <ImageSlider />

          <MainBackGround>
            <View style={styles.foregroundContent}>
              <Text style={styles.title}>Schedule Pick Up</Text>

              <View style={{ marginHorizontal: 30, rowGap: 15 }}>
                <CustomerInput
                  backgroundColor="#fff"
                  placeholder="Address"
                  width={320}
                  pointerEvents="none"
                  value={address}
                  onChangeText={setAddressState}
                />

                <Pressable onPress={() => setShowDatePicker(true)}>
                  <CustomerInput
                    backgroundColor="#fff"
                    placeholder="Choose a Day for Pickup"
                    iconName="caret-down-sharp"
                    width={320}
                    value={pickupDate}
                    disabled={true}
                    pointerEvents="none"
                  />
                </Pressable>

                <Pressable onPress={() => setShowTimePicker(true)}>
                  <CustomerInput
                    backgroundColor="#fff"
                    placeholder="Choose Preferred Time"
                    iconName="caret-down-sharp"
                    width={320}
                    value={pickupTime}
                    disabled={true}
                    pointerEvents="none"
                  />
                </Pressable>

                <CustomerInput
                  backgroundColor="#fff"
                  onPress={handleAddCloths}
                  placeholder="Add Cloths"
                  iconName="plus"
                  width={320}
                  value={`Cloths added: ${cloths.length}`}
                  disabled={true}
                  pointerEvents="none"
                  iconComponent={<Octicons name="plus" size={20} color="#5F6368" />}
                />

                <CustomerInput
                  backgroundColor="#fff"
                  placeholder="Coupon (If any)"
                  width={320}
                  value={coupon}
                  onChangeText={text => setCoupon(text)}
                />

                <View style={{ alignItems: 'center' }}>
                  <CustomButton
                    color="#fff"
                    backgroundColor="#F7A917"
                    height={50}
                    width={200}
                    title="Place Order"
                    onPress={handlePlaceOrder}
                  />
                </View>
              </View>
            </View>
          </MainBackGround>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>

      <DateTimePicker
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setShowDatePicker(false)}
      />

      <DateTimePicker
        isVisible={showTimePicker}
        mode="time"
        is24Hour={false}
        onConfirm={handleConfirmTime}
        onCancel={() => setShowTimePicker(false)}
      />
    </>
  );
};

export default SchedulePickUpScreen;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  foregroundContent: {
    zIndex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    marginTop: 220,
  },
  title: {
    fontFamily: 'Cinzel-SemiBold',
    fontSize: 21,
    textAlign: 'left',
    padding: 25,
    color: '#FFA717',
    right: 50,
  },
});
