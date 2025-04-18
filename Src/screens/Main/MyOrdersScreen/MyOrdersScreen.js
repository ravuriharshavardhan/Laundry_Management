import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CurvedCard from '../../../components/CurvedCard/CurvedCard';
import CustomerInputB from '../../../components/CustomInput/CustomInputB';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import fonts from '../../../utils/fonts';
import CustomCard from '../../../components/CustomCard/CustomCard';

import MainBackGround from '../../../components/BackgroundCard/MainBackGround';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';

const MyOrdersScreen = () => {
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
    <TypeBBackground>
       <Text
              style={{
                fontFamily: fonts.HomeLabel,

                fontSize: 21,
                textAlign: 'left',
                padding: 25,
                color: '#F7941E',
              }}
            >
              My Orders
            </Text>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: -25 }}>
              <CustomCard
                name="Shivi Jain"
                clothCount={10}
                address="71-A Surajnagar Ujjain"
                imageUri="https://i.pravatar.cc/150?img=47"
              />
              <CustomCard
                name="Shivi Jain"
                clothCount={10}
                address="71-A Surajnagar Ujjain"
                imageUri="https://i.pravatar.cc/150?img=47"
              />
              <CustomCard
                name="Shivi Jain"
                clothCount={10}
                address="71-A Surajnagar Ujjain"
                imageUri="https://i.pravatar.cc/150?img=47"
              />
              <CustomCard
                name="Shivi Jain"
                clothCount={10}
                address="71-A Surajnagar Ujjain"
                imageUri="https://i.pravatar.cc/150?img=47"
              />

            </View>


    </TypeBBackground>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderBottomWidth: 2,
    borderColor: '#F7A917',
    paddingHorizontal: 8,
    width: 290,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    left: 11

  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
    borderColor: "#fff"
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
    borderColor: "#fff"
  },
  dropdownContainer: {
    backgroundColor: '#F7941E', 
    borderRadius: 8,
  },
});
