import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CurvedCard from '../../../components/CurvedCard/CurvedCard';
import CustomerInputB from '../../../components/CustomInput/CustomInputB';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import fonts from '../../../utils/fonts';

const ManageCloths = () => {
  const navigation = useNavigation();

  const [clothType, setClothType] = useState(null);

  const handleAddCloths = useCallback(() => {
    navigation.navigate("ManageCloths");
  }, [navigation]);

  const data = [
    { label: 'Wash & Steam Iron', value: 'Wash & Steam Iron' },
    { label: 'Wash & Fold', value: 'Wash & Fold' },
    { label: 'Shoe Cleaning', value: 'Shoe Cleaning' },
    { label: 'Home Cleaning', value: 'Home Cleaning' },
  ];

  return (
    <LinearGradient
      colors={['#F7941E', '#F7941E']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    >
      <View style={{ height: 56 }} />

      <View
        style={{
          marginTop: 200,
          flex: 1,
          elevation: 28,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
      
        }}
      >
        <CurvedCard
          height={780}
          borderRadius={40}
          curve1={{ c1: 40, c2: 400 }}
          curve2={{ c1: 50, c2: -1600 }}
          anchor1={-20}
          anchor2={1}
          viewBoxY={30}
          viewBoxX={-15}
          curveStrokeWidth={6}
        >

            <View style={{marginHorizontal:30}}>
            <Text
            style={{
              fontFamily: 'Cinzel-SemiBold',
              fontSize: 21,
              textAlign: 'left',
              padding: 25,
              color: '#F7941E',
            }}
          >
            Cloth Information
          </Text>

          <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: -25 }}>
            <CustomerInputB placeholder={'Enter Cloth Name'} width={290} />
            <CustomerInputB placeholder={'Kgs'} width={290} />
            <CustomerInputB placeholder={'Enter Price Per Unit'} width={290} />

            {/* Dropdown */}
            <View style={{ width: 320, marginTop: 10 }}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                containerStyle={styles.dropdownContainer} 
                data={data}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder="Select Cloth Type"
                value={clothType}
                showsVerticalScrollIndicator={true}
   
                onChange={item => setClothType(item.value)}
              />
            </View>

            <View style={{ marginTop: 70 , }}>
              <CustomButton width={290} backgroundColor={'#F7A917'} height={50} title={'Add Cloths'} />
            </View>
          </View>
                
            </View>
       

       
        </CurvedCard>
      </View>
    </LinearGradient>
  );
};

export default ManageCloths;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderBottomWidth: 2,
    borderColor: '#F7A917',
    paddingHorizontal: 8,
    width:290,
    alignItems:"center",
    justifyContent:"center",
    alignContent:"center",
    left:11

  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
        borderColor:"#fff",
        fontFamily:fonts.dropdownlabel
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
    borderColor:"#fff",
    fontFamily:fonts.dropdownlabel
  },
  dropdownContainer: {
    backgroundColor: '#F7941E', // 💚 dropdown list sheet
    borderRadius: 8,
  },
});
