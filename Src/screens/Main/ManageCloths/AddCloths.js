import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CurvedCard from '../../../components/CurvedCard/CurvedCard';
import CustomerInputB from '../../../components/CustomInput/CustomInputB';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import fonts from '../../../utils/fonts';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';
import { F, H, W } from '../../../utils/Dimensions';


const AddCloths = () => {
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
      colors={['#fff', '#fff']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    >
      <TypeBBackground>
        <View style={{ marginHorizontal: W(30), marginTop: H(160) }}>
          <Text
            style={{
              fontFamily: 'Cinzel-SemiBold',
              fontSize: F(21),
              textAlign: 'left',
              padding: H(25),
              color: '#F7941E',
            }}
          >
            Cloth Information
          </Text>

          <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: -H(25) }}>
            <CustomerInputB placeholder={'Enter Cloth Name'} width={W(290)} />
            <CustomerInputB placeholder={'Kgs'} width={W(290)} />
            <CustomerInputB placeholder={'Enter Price Per Unit'} width={W(290)} />

            {/* Dropdown */}
            <View style={{ width: W(320), marginTop: H(10) }}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                containerStyle={styles.dropdownContainer}
                data={data}
                maxHeight={H(200)}
                labelField="label"
                valueField="value"
                placeholder="Select Cloth Type"
                value={clothType}
                showsVerticalScrollIndicator={true}
                onChange={item => setClothType(item.value)}
              />
            </View>

            <View style={{ marginTop: H(70) }}>
              <CustomButton
                width={W(290)}
                backgroundColor={'#F7A917'}
                height={H(50)}
                title={'Add Cloths'}
              />
            </View>
          </View>
        </View>
      </TypeBBackground>
    </LinearGradient>
  );
};

export default AddCloths;

const styles = StyleSheet.create({
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
    bottom:H(45)
  },
});
