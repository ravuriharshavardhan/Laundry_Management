import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
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
import AndroidCustomInput from '../../../components/Android/AndroidCustomInput/AndroidCustomInput';
import AndroidCustomDropdown from '../../../components/Android/AndroidCustomDropdown/AndroidCustomDropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';  // For FAB icon

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
  
  // Extract unique cloth names
  const clothDropdownItems = [
    ...new Map(itemsData.map(i => [i.name, i])).values(),
  ].map(item => ({
    label: item.name,
    value: item.name,
  }));
  
  console.log(clothDropdownItems);
  

  const typeData = [
    { label: 'Wash & Steam Iron', value: 'Wash & Steam Iron' },
    { label: 'Wash & Fold', value: 'Wash & Fold' },
    { label: 'Shoe Cleaning', value: 'Shoe Cleaning' },
    { label: 'Home Cleaning', value: 'Home Cleaning' },
  ];

  const pieceCountData = Array.from({ length: 20 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }));

  const handleAddCloths = useCallback(() => {
    if (!clothName || !clothWeight || !clothType || !numberOfPieces) {
      Alert.alert('Validation Error', 'Please fill all the fields.');
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
      totalPrice: totalPrice, 
      type: clothType,
      pieces: pieces,
    };
  
    console.log('🧺 New Cloth Added:', newCloth); // Debug log
  
    dispatch(addCloth(newCloth));
  
    // Uncomment if you want to send it to the server
    /*
    axios.post('http://192.168.1.6:3000/api/orders/create-order', newCloth)
      .then(res => {
        console.log('📤 Sent to server:', res.data);
      })
      .catch(err => {
        console.error('❌ Axios error:', err);
      });
    */
  
    Alert.alert('Cloth Added!', `You have added ${clothName} - ₹${totalPrice}`);
    navigation.goBack();
  }, [clothName, clothWeight, clothType, numberOfPieces, dispatch, navigation]);
  

  return (
    <LinearGradient colors={['#fff', '#fff']} style={{ flex: 1 }}>
      <TypeBBackground>
        <ScrollView
          contentContainerStyle={{ paddingBottom: H(100) }}
          keyboardShouldPersistTaps="handled"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ marginHorizontal: W(30), marginVertical:H(35) }}
          >
            <Text style={styles.headerText}>Cloth Information</Text>

            <View style={styles.formContainer}>
              {/* Cloth Name Dropdown */}
              <View style={styles.dropdownWrapper}>
                {
                  Platform.OS === 'ios' ? (
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
                  ) : (
                    <AndroidCustomDropdown
                      label="Select Cloth Name"
                      value={clothName}
                      onChange={setClothName}  // Ensure the value is updated in the parent component
                      data={clothDropdownItems}
                      placeholder="Select Cloth"
                      editable={true}
                    />
                  )
                }
              </View>

              {/* Weight Input */}
              {
                Platform.OS === 'ios' ? (
                  <CustomerInputB
                    placeholder={'Kgs'}
                    width={W(290)}
                    keyboardType="numeric"
                    value={clothWeight}
                    onChangeText={setClothWeight}
                  />
                ) : (
                  <AndroidCustomInput
                    label="Weight of the cloth"
                    placeholder={'Kgs'}
                    keyboardType="numeric"
                    value={clothWeight}
                    onChangeText={setClothWeight}
                  />
                )
              }

              {/* Piece Count Dropdown */}
              <View style={styles.dropdownWrapper}>
                {
                  Platform.OS === "ios" ? (
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
                  ) : (
                    <AndroidCustomDropdown
                      label="Select Number of Pieces"
                      value={numberOfPieces}
                      onChange={setNumberOfPieces}
                      data={pieceCountData}
                      placeholder="Select Number of Pieces"
                      editable={true}
                    />
                  )
                }
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

              {/* Add Cloth Button */}
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
        
        {/* FAB Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => Alert.alert('FAB Pressed!')}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>

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
    rowGap: H(10),
    marginVertical: H(10),
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
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: '#F7941E',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 200, // Ensure it's above other components
  },
});

