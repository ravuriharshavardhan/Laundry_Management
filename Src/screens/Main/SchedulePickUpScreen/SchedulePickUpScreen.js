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

const SchedulePickUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cloths = useSelector(state => state.order.cloths); 

  const [address, setAddressState] = useState('');
  const [pickupDate, setPickupDateState] = useState('');
  const [pickupTime, setPickupTimeState] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [coupon, setCoupon] = useState("");

  


  const handleAddCloths = useCallback(() => {
    navigation.navigate('AddCloths');
  }, [navigation]);

  const handlePlaceOrder = async () => {
    const orderData = {
      address,
      pickupDate,
      pickupTime,
      cloths,
      coupon
    };
  
    // Validate inputs before making the request
    if (!address || !pickupDate || !pickupTime || !cloths || cloths.length === 0) {
      Alert.alert('Missing Information', 'Please fill in all the required fields');
      return;
    }
  
    // Dispatching order details to Redux
    dispatch(setAddress(address));
    dispatch(setPickupDate(pickupDate));
    dispatch(setPickupTime(pickupTime));
  
    console.log('🧺 Order Summary:', orderData);
  
    try {
      // Making the API request to create the order
      const response = await axios.post('http://192.168.1.6:3000/api/orders/create-order', orderData);
  
      if (response.status === 201) {
        // If the order is created successfully, navigate to 'OrderSummary'
        console.log('Order created successfully:', response.data);
        navigation.navigate('OrderSummary', { order: response.data });
      } else {
        // Handle unsuccessful response
        console.error('Failed to create order:', response.data);
        Alert.alert('Error', 'Failed to place the order. Please try again.');
      }
    } catch (error) {
      // Handle network errors or API errors
      console.error('Error occurred while placing the order:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  
  

  const handleConfirmDate = (selectedDate) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toDateString();
      setPickupDateState(formattedDate);
    }
    setShowDatePicker(false);
  };

  const handleConfirmTime = (selectedTime) => {
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
                  value={address}
                  onChangeText={setAddressState}
                />

                <Pressable onPress={() => setShowDatePicker(true)}>
                  <CustomerInput
                    backgroundColor="#fff"
                    placeholder="Choose a Day for Pickup"
                    iconName="calendar-outline"
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
                    iconName="time-outline"
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
                  onChangeText={(text)=>setCoupon(text)}

                />

                <View style={{ alignItems: 'center' }}>
                  <CustomButton
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

      {/* Date Picker */}
      <DateTimePicker
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setShowDatePicker(false)}
      />

      {/* Time Picker */}
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
