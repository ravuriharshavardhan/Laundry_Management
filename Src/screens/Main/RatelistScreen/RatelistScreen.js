import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useCallback, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CurvedCard from '../../../components/CurvedCard/CurvedCard';
import CustomerInput from '../../../components/CustomInput/CustomInputA';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import fonts from '../../../utils/fonts';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';
import ImageSlider from '../../../ImageSlider/ImageSlider';
import MainBackGround from '../../../components/BackgroundCard/MainBackGround';

const RateList = () => {
  const navigation = useNavigation();
  const [clothType, setClothType] = useState(null);

  const renderServiceGroup = (title, services) => (
    <View style={styles.groupContainer}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupTitle}>{title}</Text>
        <Entypo name={'triangle-down'} size={20} color={'#5F6368'} />
      </View>
      {services.map((service, index) => (
        <CustomerInput
          backgroundColor={'#fff'}
          key={index}
          placeholder={service}
          disabled
          iconComponent={
            <Entypo name="triangle-right" size={20} color="#5F6368" />
          }
          width={320}
        />
      ))}
    </View>
  );

  return (
    <LinearGradient
      colors={['#fff', '#fff']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}
      style={{flex: 1}}>
      <View />

      <ImageSlider />

      <MainBackGround>

      <View style={styles.cardContainer}>

          <ScrollView
            contentContainerStyle={{paddingBottom: 40}}
            showsVerticalScrollIndicator={true}>
            <View style={{marginHorizontal: 30}}>
              <Text style={styles.title}>Rate List</Text>

              {renderServiceGroup('Dry Cleaning', [
                'Dry Clean',
                'Organic Dry Clean',
                'Jacket Shoe and Bag',
              ])}

              {renderServiceGroup('Washing Services ', [
                'Wash & Iron',
                'Wash & Fold',
                'Specialized',
              ])}
            </View>
          </ScrollView>

      </View>
      </MainBackGround>
    </LinearGradient>
  );
};

export default RateList;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 200,
    flex: 1,
    elevation: 28,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  title: {
    fontFamily: fonts.HomeLabel,
    fontSize: 21,
    textAlign: 'left',
    padding: 25,
    color: '#F7941E',
    marginTop:70,

  },
  groupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 6,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    left:20,
    marginVertical:10
   
  },
  groupTitle: {
    fontFamily: 'Trebuchet-MS-Italic',
    fontSize: 18,
    marginRight: 10,
    color: '#000',
  },
});
