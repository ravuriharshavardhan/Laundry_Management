// Imports stay the same...
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import fonts from '../../../utils/fonts';
import CustomSearch from '../../../components/CustomInput/CustomSearch';
import OrderSummaryCard from '../../../components/OrderSummaryCard/OrderSummaryCard';
import LaundryRecommendationCard from '../../../components/LaundryRecommendationCard/LaundryRecommendationCard';
import RecommendedOffersCard from '../../../components/LaundryRecommendationCard/LaundryRecommendationCard';

const laundryTypes = [
  {
    id: 'dry_clean',
    name: 'Dry Clean',
    image: require('../../../../assets/Icons/DryCleaning.png'),
    screen: 'DryCleaning',
  },
  {
    id: 'Home_Care',
    name: 'Home Care',
    image: require('../../../../assets/Icons/HomeCare.png'),
    screen: 'HomeCare',
  },
  {
    id: 'ironing',
    name: 'Ironing',
    image: require('../../../../assets/Icons/Ironbox.png'),
    screen: 'ironing',
  },
];

const ImagesSliders = [
  {
    id: 1,
    ImageSource: require('../../../../assets/Images/Slider1.png'),
  },
  {
    id: 2,
    ImageSource: require('../../../../assets/Images/Slider1.png'),
  },
];

const recommendedOffers = [
  {
    title: 'Special Summer Discount',
    description: 'Get 40% off on all laundry services this summer.',
    discount: 40,
    validity: '2025-06-30',
    image: 'https://via.placeholder.com/100x100.png?text=Summer+Offer',
  },
  {
    title: 'Weekend Exclusive Deal',
    description: 'Flat 25% off on dry cleaning services this weekend.',
    discount: 25,
    validity: '2025-05-18',
    image: 'https://via.placeholder.com/100x100.png?text=Weekend+Deal',
  },
  {
    title: 'New User Welcome Offer',
    description: 'Enjoy 50% off on your first order with us.',
    discount: 50,
    validity: '2025-12-31',
    image: 'https://via.placeholder.com/100x100.png?text=Welcome+Offer',
  },
  {
    title: 'Loyalty Reward Program',
    description: 'Earn double points on all orders this month.',
    discount: 0,
    validity: '2025-05-31',
    image: 'https://via.placeholder.com/100x100.png?text=Loyalty+Rewards',
  },
  {
    title: 'Express Service Offer',
    description: 'Save 20% on all express laundry services.',
    discount: 20,
    validity: '2025-06-15',
    image: 'https://via.placeholder.com/100x100.png?text=Express+Service',
  },
];


const latestOrder = {
  status: 'Pending',
  pickupDate: '2025-05-13T10:00:00Z',
  deliveryType: 'Standard',
  total: 320,
};

const HomeScreen = () => {
  const [isActiveNotification, setisActiveNotification] = useState(false);
  const navigation = useNavigation();

  const handleNotification = () => {
    setisActiveNotification(prev => !prev);
  };

  return (
    <ScrollView style={styles.screen}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.locationRow}>
          <Image
            style={styles.avatar}
            source={require('../../../../assets/Images/Avator.jpg')}
          />
          <View style={styles.locationTextRow}>
            <FontAwesome5 name="map-marker-alt" size={14} color="#f49905" />
            <Text style={styles.locationText}>Indore, Madhya Pradesh</Text>
          </View>
        </View>
        <Pressable onPress={handleNotification}>
          <Fontisto
            name={isActiveNotification ? 'bell' : 'bell-alt'}
            size={20}
            color="#333"
          />
        </Pressable>
      </View>

      {/* Image Slider */}
      <FlatList
        data={ImagesSliders}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={styles.sliderList}
        renderItem={({ item }) => (
          <Image source={item.ImageSource} style={styles.sliderImage} />
        )}
      />

      {/* Services Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Services</Text>

          <Text onPress={()=>navigation.navigate('ServicesScreen')}  style={styles.sectionLink}>See all</Text>
        </View>

        <View style={{marginVertical:20}} > 
          <Pressable onPress={()=>navigation.navigate('SearchScreen')}>
          <CustomSearch  disabled placeholder="Search Services" />

          </Pressable>


        </View>



        <View style={styles.grid}>
          {laundryTypes.map(type => (
            <TouchableOpacity
              key={type.id}
              style={styles.serviceCard}
              onPress={() => navigation.navigate(type.screen)}
            >
              <Image source={type.image} style={styles.serviceImage} />
              <Text style={styles.serviceLabel}>{type.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Order Summary */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Last Order</Text>
          <Text
            style={styles.sectionLink}
            onPress={() => navigation.navigate('OrderSummaryScreen', { order: latestOrder })}
          >
            View
          </Text>
        </View>
        <OrderSummaryCard order={latestOrder} />
      </View>

      {/* Recommended Companies */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
        </View>

    <Pressable >
    <FlatList
      data={recommendedOffers}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <RecommendedOffersCard 
          offer={item} 
          onPress={() => console.log(`Offer Clicked: ${item.title}`)} 
        />
      )}

    />

    </Pressable>
       
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  locationTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: fonts.label,
    marginLeft: 6,
    fontSize: 14,
    color: '#333',
  },
  sliderList: {
    marginTop: 20,
    paddingLeft: 20,
  },
  sliderImage: {
    width: Dimensions.get('window').width * 0.9,
    height: 150,
    borderRadius: 12,
    marginRight: 16,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.primary,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionLink: {
    fontSize: 14,
    fontFamily: fonts.primary,
    color: '#F49905',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  serviceCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#f8f9fb',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  serviceImage: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  serviceLabel: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    textAlign: 'center',
  },
});
