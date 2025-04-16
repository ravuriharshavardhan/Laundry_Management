import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CurvedCard from '../../../components/CurvedCard/CurvedCard';
import CustomerInput from '../../../components/CustomInput/CustomInputA';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import fonts from '../../../utils/fonts';

const RateList = () => {
  const navigation = useNavigation();
  const [clothType, setClothType] = useState(null);

  const renderServiceGroup = (title, services) => (
    <View style={styles.groupContainer}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupTitle}>{title}</Text>
        <Entypo name={"triangle-down"} size={20} color={"#5F6368"} />
      </View>
      {services.map((service, index) => (
        <CustomerInput
          key={index}
          placeholder={service}
          disabled
          iconComponent={<Entypo name="triangle-right" size={20} color="#5F6368" />}
          width={320}
        />
      ))}
    </View>
  );

  return (
    <LinearGradient
      colors={['#F7941E', '#F7941E']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    >
      <View style={{ height: 56 }} />

      <View style={styles.cardContainer}>
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
          <ScrollView
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={true}
          >
            <View style={{ marginHorizontal: 30 }}>
              <Text style={styles.title}>Rate List</Text>

              {renderServiceGroup("Dry Cleaning", [
                "Dry Clean",
                "Organic Dry Clean",
                "Jacket Shoe and Bag"
              ])}

              {renderServiceGroup("Washing Services ", [
                "Wash & Iron",
                "Wash & Fold",
                "Specialized"
              ])}


            </View>
          </ScrollView>
        </CurvedCard>
      </View>
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
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  title: {
    fontFamily: fonts.HomeLabel,
    fontSize: 21,
    textAlign: 'left',
    padding: 25,
    color: '#F7941E',
  },
  groupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  groupTitle: {
    fontFamily: 'Trebuchet-MS-Italic',
    fontSize: 18,
    marginRight: 10,
    color: '#000',
  },
});
