import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomerInput from '../../../components/CustomInput/CustomInputA';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import fonts from '../../../utils/fonts';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';
import ImageSlider from '../../../ImageSlider/ImageSlider';
import MainBackGround from '../../../components/BackgroundCard/MainBackGround';

const RatelistScreen = () => {
  const navigation = useNavigation();
  const [expandedGroups, setExpandedGroups] = useState({}); // Allow multiple groups

  const toggleGroup = (group) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group], // Toggle individual group
    }));
  };

  const handleServicePress = (serviceName) => {
    navigation.navigate('RateListDetail');
  };

  const renderServiceGroup = (title, services, groupKey) => (
    <View style={styles.groupContainer}>
      <View style={styles.groupHeader}>
        <TouchableOpacity onPress={() => toggleGroup(groupKey)}>
          <Text style={styles.groupTitle}>{title}</Text>
        </TouchableOpacity>
        <Entypo
          name={expandedGroups[groupKey] ? 'triangle-up' : 'triangle-down'}
          size={20}
          color={'#5F6368'}
        />
      </View>
      {expandedGroups[groupKey] &&
        services.map((service, index) => (
          <TouchableOpacity key={index} onPress={() => handleServicePress(service)}>
            <CustomerInput
              backgroundColor={'#fff'}
              placeholder={service}
              disabled
              iconComponent={<Entypo name="triangle-right" size={20} color="#5F6368" />}
              width={320}
            />
          </TouchableOpacity>
        ))}
    </View>
  );

  return (
    <LinearGradient colors={['#fff', '#fff']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={{ flex: 1 }}>
      <ImageSlider />

      {/* Conditionally render background based on platform */}
      {Platform.OS === 'ios' ? (
        <TypeBBackground>
          <View style={styles.cardContainer}>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={true}>
              <View style={{ marginHorizontal: 30 }}>
                <Text style={styles.title}>Rate List</Text>

                {renderServiceGroup(
                  'Dry Cleaning',
                  ['Dry Clean', 'Organic Dry Clean', 'Jacket Shoe and Bag'],
                  'DryCleaning'
                )}

                {renderServiceGroup(
                  'Washing Services',
                  ['Wash & Iron', 'Wash & Fold', 'Specialized'],
                  'WashingServices'
                )}
              </View>
            </ScrollView>
          </View>
        </TypeBBackground>
      ) : (
        <>
          <View style={styles.cardContainer}>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={true}>
              <View style={{ marginHorizontal: 30 }}>
                <Text style={styles.title}>Rate List</Text>

                {renderServiceGroup(
                  'Dry Cleaning',
                  ['Dry Clean', 'Organic Dry Clean', 'Jacket Shoe and Bag'],
                  'DryCleaning'
                )}

                {renderServiceGroup(
                  'Washing Services',
                  ['Wash & Iron', 'Wash & Fold', 'Specialized'],
                  'WashingServices'
                )}
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </LinearGradient>
  );
};

export default RatelistScreen;

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
    marginTop: 70,
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
    left: 20,
    marginVertical: 10,
  },
  groupTitle: {
    fontFamily: 'Trebuchet-MS-Italic',
    fontSize: 18,
    marginRight: 10,
    color: '#000',
  },
});
