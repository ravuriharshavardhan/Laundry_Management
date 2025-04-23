import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

import CustomerInputB from '../../../components/CustomInput/CustomInputB';
import CustomButton from '../../../components/CustomButton/CustomButton';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';
import fonts from '../../../utils/fonts';
import { F, H, W } from '../../../utils/Dimensions';
import { addCloth } from '../../../Redux/Slice/AddClothSlice';

const AddCloths = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [clothName, setClothName] = useState('');
  const [clothWeight, setClothWeight] = useState('');
  const [clothPrice, setClothPrice] = useState('');
  const [clothType, setClothType] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [numberOfPieces, setNumberOfPieces] = useState(null);

  const itemsData = [
    { name: 'Shirt', rate: 30, discount: 20 },
    { name: 'T-Shirt', rate: 50, discount: 30 },
    { name: 'Ladies Top', rate: 80, discount: 60 },
    { name: 'Trousers', rate: 100, discount: 80 },
    { name: 'Jeans', rate: 120, discount: 100 },
  ];

  const clothDropdownItems = [...new Set(itemsData.map(i => i.name))].map(name => ({
    label: name,
    value: name,
  }));

  const typeData = [
    { label: 'Wash & Steam Iron', value: 'Wash & Steam Iron' },
    { label: 'Wash & Fold', value: 'Wash & Fold' },
    { label: 'Shoe Cleaning', value: 'Shoe Cleaning' },
    { label: 'Home Cleaning', value: 'Home Cleaning' },
    { label: 'Piece', value: 'Piece' },
  ];

  const pieceCountData = Array.from({ length: 20 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }));

  const handleAddCloths = useCallback(() => {
    if (!clothName || !clothWeight || !clothType || !numberOfPieces) {
      alert('Please fill all the fields.');
      return;
    }
  
    // Find selected cloth details
    const selectedItem = itemsData.find(item => item.name === clothName);
    const rate = selectedItem?.rate || 0;
    const discount = selectedItem?.discount || 0;
  
    const pieces = parseInt(numberOfPieces);
    const finalUnitPrice = rate - discount;
    const totalPrice = finalUnitPrice * pieces;
  
    const newCloth = {
      id: Date.now(),
      name: clothName,
      weight: clothWeight,
      totalPrice: totalPrice, // calculated price
      type: clothType,
      coupon: couponCode || null,
      pieces: pieces,
    };
  
    dispatch(addCloth(newCloth));
  
    // axios.post('https://your-api-url.com/api/cloths', newCloth)
    //   .then(res => {
    //     console.log('Sent to server:', res.data);
    //   })
    //   .catch(err => {
    //     console.error('Axios error:', err);
    //   });
  
    Alert.alert('Cloth Added!', `You have added ${clothName} - ₹${totalPrice}`);
    navigation.goBack();
  }, [clothName, clothWeight, clothType, numberOfPieces, couponCode, dispatch, navigation]);
  

  return (
    <LinearGradient colors={['#fff', '#fff']} style={{ flex: 1 }}>
      <TypeBBackground>
        <ScrollView
          contentContainerStyle={{ paddingBottom: H(100) }}
          keyboardShouldPersistTaps="handled"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ marginHorizontal: W(30), marginTop: H(160) }}
          >
            <Text style={styles.headerText}>Cloth Information</Text>

            <View style={styles.formContainer}>
              {/* Cloth Name Dropdown */}
              <View style={styles.dropdownWrapper}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  containerStyle={styles.dropdownContainer}
                  data={clothDropdownItems}
                  maxHeight={H(200)}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Cloth Name"
                  value={clothName}
                  showsVerticalScrollIndicator
                  onChange={item => setClothName(item.value)}
                />
              </View>

              {/* Cloth Weight */}
              <CustomerInputB
                placeholder={'Kgs'}
                width={W(290)}
                keyboardType="numeric"
                value={clothWeight}
                onChangeText={setClothWeight}
              />

              {/* Price */}
              <CustomerInputB
                placeholder={'Enter Price Per Unit'}
                width={W(290)}
                keyboardType="numeric"
                value={clothPrice}
                onChangeText={setClothPrice}
              />

 
            

  
              <View style={styles.dropdownWrapper}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  containerStyle={styles.dropdownContainer}
                  data={pieceCountData}
                  maxHeight={H(200)}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Number of Pieces"
                  value={numberOfPieces}
                  showsVerticalScrollIndicator
                  onChange={item => setNumberOfPieces(item.value)}
                />
              </View>

              {/* Cloth Type Dropdown */}
              <View style={styles.dropdownWrapper}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  containerStyle={styles.dropdownContainer}
                  data={typeData}
                  maxHeight={H(200)}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Cloth Type"
                  value={clothType}
                  showsVerticalScrollIndicator
                  onChange={item => setClothType(item.value)}
                />
              </View>

              <CustomerInputB
                placeholder={'Enter Coupon (Optional)'}
                width={W(290)}
                value={couponCode}
                onChangeText={setCouponCode}
              />

              {/* Button */}
              <View style={{ marginTop: H(50) }}>
                <CustomButton
                  width={W(290)}
                  backgroundColor={'#F7A917'}
                  height={H(50)}
                  title={'Add Cloths'}
                  onPress={handleAddCloths}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </TypeBBackground>
    </LinearGradient>
  );
};

export default AddCloths;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Cinzel-SemiBold',
    fontSize: F(21),
    textAlign: 'left',
    padding: H(25),
    color: '#F7941E',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: -H(20),
    rowGap:H(10)
  },
  dropdownWrapper: {
    width: W(320),
    marginTop: H(10),
  },
  dropdown: {
    height: H(50),
    borderBottomWidth: 2,
    borderColor: '#F7A917',
    paddingHorizontal: W(8),
    width: W(290),
    left: W(11),
    justifyContent: 'center',
  },
  placeholderStyle: {
    fontSize: F(16),
    color: '#000',
    fontFamily: fonts.dropdownlabel,
  },
  selectedTextStyle: {
    fontSize: F(16),
    color: '#333',
    fontFamily: fonts.dropdownlabel,
  },
  dropdownContainer: {
    backgroundColor: '#F7941E',
    borderRadius: W(8),
    bottom: H(85),
  },
});