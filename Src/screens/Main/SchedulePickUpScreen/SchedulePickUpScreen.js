import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Image,
  Text,
  Pressable,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

import MainBackGround from '../../../components/BackgroundCard/MainBackGround';
import CustomerInput from '../../../components/CustomInput/CustomInputA';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { setAddress, setPickupDate, setPickupTime } from '../../../Redux/Slice/AddClothSlice';
import ImageSlider from '../../../ImageSlider/ImageSlider';

const SchedulePickUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [address, setAddressState] = useState('');
  const [pickupDate, setPickupDateState] = useState('');
  const [pickupTime, setPickupTimeState] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [addCloths,SetaddCloth]=useState([])

  const handleAddCloths = useCallback(() => {
    navigation.navigate('AddCloths');
  }, [navigation]);

  const handlePlaceOrder = () => {
    dispatch(setAddress(address));
    dispatch(setPickupDate(pickupDate));
    dispatch(setPickupTime(pickupTime));
    navigation.navigate('OrderSummary'); // Replace with actual screen
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toDateString();
      setPickupDateState(formattedDate);
    }
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const formattedTime = selectedTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setPickupTimeState(formattedTime);
    }
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
          <ImageSlider
          />

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
                    iconName="time-outline"
                    width={320}
                    value={addCloths}
                    disabled={true}
                    pointerEvents="none"
        
       
                  iconComponent={<Octicons name="plus" size={20} color="#5F6368" />}
         
                />

                <CustomerInput
                  backgroundColor="#fff"
                  placeholder="Coupon (If any)"
                  width={320}
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
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onChangeTime}
        />
      )}
    </>
  );
};

export default SchedulePickUpScreen;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: 270,
    resizeMode: 'cover',
    zIndex: 0,
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
