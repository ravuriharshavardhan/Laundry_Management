import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  FlatList,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { addCloth, setPrice, setStatus } from '../../Redux/Slice/AddClothSlice';
import { useDispatch } from 'react-redux';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomSearch from '../../components/CustomInput/CustomSearch';

const HomeCare = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [clothQuantitiesByType, setClothQuantitiesByType] = useState({
    '1': {}, '2': {}, '3': {}, '4': {}
  });
  const [premiumQuantitiesByType, setPremiumQuantitiesByType] = useState({
    '1': {}, '2': {}, '3': {}, '4': {}
  });
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredClothes, setFilteredClothes] = useState([]);
  const [filteredPremium, setFilteredPremium] = useState([]);

  const dispatch = useDispatch();

  const homeCareTypes = [
    {
      id: '1',
      name: 'General Home Cleaning',
      image: 'https://img.icons8.com/color/96/cleaning.png',
      description: 'Basic home cleaning services for regular maintenance.',
    },
    {
      id: '2',
      name: 'Deep Cleaning',
      image: 'https://img.icons8.com/color/96/deep-cleaning.png',
      description: 'Thorough cleaning for areas that need extra attention.',
    },
    {
      id: '3',
      name: 'Carpet & Upholstery Care',
      image: 'https://img.icons8.com/color/96/upholstery.png',
      description: 'Cleaning of carpets, rugs, and upholstery with specialized techniques.',
    },
    {
      id: '4',
      name: 'Window & Glass Cleaning',
      image: 'https://img.icons8.com/color/96/window.png',
      description: 'Cleaning of windows, glass surfaces, and mirrors.',
    },
    {
      id: '5',
      name: 'Kitchen Sanitization',
      image: 'https://img.icons8.com/color/96/kitchen.png',
      description: 'Deep cleaning and sanitizing of kitchen surfaces and appliances.',
    },
    {
      id: '6',
      name: 'Bathroom Deep Clean',
      image: 'https://img.icons8.com/color/96/bathroom.png',
      description: 'Focuses on sanitizing and deodorizing bathrooms.',
    },
    {
      id: '7',
      name: 'Move-In/Move-Out Cleaning',
      image: 'https://img.icons8.com/color/96/move.png',
      description: 'Ideal for homes before or after moving in or out.',
    },
    {
      id: '8',
      name: 'Pet Care Cleaning',
      image: 'https://img.icons8.com/color/96/pet-care.png',
      description: 'Specialized cleaning for homes with pets, including odor removal.',
    },
    {
      id: '9',
      name: 'Eco-Friendly Cleaning',
      image: 'https://img.icons8.com/color/96/recycle.png',
      description: 'Uses green cleaning products and methods for a safe, eco-conscious service.',
    },
    {
      id: '10',
      name: 'Disinfection Services',
      image: 'https://img.icons8.com/color/96/disinfection.png',
      description: 'Disinfection and sanitization services for a germ-free home.',
    },
  ];
  

  const homeCareItems = {
    '1': [
      { id: 'dusting', name: 'Dusting of Surfaces', price: 10 },
      { id: 'vacuum', name: 'Vacuuming', price: 15 },
      { id: 'mopping', name: 'Mopping Floors', price: 12 },
      { id: 'sweeping', name: 'Sweeping', price: 8 },
      { id: 'organizing', name: 'Room Organizing', price: 20 },
    ],
    '2': [
      { id: 'deep-clean', name: 'Deep Cleaning of Kitchen', price: 50 },
      { id: 'bathroom-deep', name: 'Bathroom Deep Clean', price: 40 },
      { id: 'carpet-cleaning', name: 'Carpet Shampooing', price: 30 },
      { id: 'window-clean', name: 'Window & Glass Deep Clean', price: 25 },
      { id: 'upholstery', name: 'Upholstery Deep Clean', price: 35 },
    ],
    '3': [
      { id: 'carpet', name: 'Rug Cleaning', price: 25 },
      { id: 'sofa', name: 'Sofa Upholstery Cleaning', price: 40 },
      { id: 'chair', name: 'Chair Cleaning', price: 15 },
      { id: 'mattress', name: 'Mattress Cleaning', price: 30 },
      { id: 'curtain', name: 'Curtain Steam Cleaning', price: 20 },
    ],
    '4': [
      { id: 'window', name: 'Window Cleaning', price: 20 },
      { id: 'glass', name: 'Glass Door Cleaning', price: 18 },
      { id: 'mirror', name: 'Mirror Cleaning', price: 10 },
      { id: 'glass-tables', name: 'Glass Table Cleaning', price: 15 },
    ],
    '5': [
      { id: 'fridge', name: 'Fridge Cleaning', price: 25 },
      { id: 'oven', name: 'Oven Cleaning', price: 30 },
      { id: 'microwave', name: 'Microwave Cleaning', price: 10 },
      { id: 'sink', name: 'Sink Sanitization', price: 8 },
    ],
    '6': [
      { id: 'bath-clean', name: 'Bathtub Cleaning', price: 18 },
      { id: 'shower', name: 'Shower Cleaning', price: 15 },
      { id: 'toilet', name: 'Toilet Scrubbing', price: 10 },
      { id: 'sink', name: 'Bathroom Sink Cleaning', price: 12 },
    ],
    '7': [
      { id: 'move-in', name: 'Move-In Cleaning', price: 80 },
      { id: 'move-out', name: 'Move-Out Cleaning', price: 90 },
    ],
    '8': [
      { id: 'pet-odor', name: 'Pet Odor Removal', price: 25 },
      { id: 'pet-hair', name: 'Pet Hair Removal', price: 20 },
      { id: 'pet-clean', name: 'Pet Area Cleaning', price: 30 },
    ],
    '9': [
      { id: 'green-clean', name: 'Green Cleaning Service', price: 40 },
      { id: 'eco-mop', name: 'Eco-friendly Mop & Sweep', price: 18 },
      { id: 'eco-sanitizer', name: 'Eco Sanitization', price: 35 },
    ],
    '10': [
      { id: 'disinfect-kitchen', name: 'Kitchen Disinfection', price: 50 },
      { id: 'disinfect-bathroom', name: 'Bathroom Disinfection', price: 45 },
      { id: 'disinfect-living', name: 'Living Area Disinfection', price: 40 },
    ],
  };
  
  const homeCarePremiumServices = {
    '1': [
      { id: 'p1', title: 'Pet Hair Removal', price: 15, description: 'Specialized cleaning for pet owners.' },
      { id: 'p2', title: 'Allergy-Free Cleaning', price: 20, description: 'Minimizes allergens during cleaning.' },
      { id: 'p3', title: 'Steam Cleaning', price: 25, description: 'Deep steam clean for floors and surfaces.' },
      { id: 'p4', title: 'Eco-Friendly Cleaning', price: 30, description: 'Only green-certified cleaning products used.' },
      { id: 'p5', title: 'Deodorizing Service', price: 10, description: 'Leaves your home smelling fresh and clean.' },
    ],
    '2': [
      { id: 'p6', title: 'Tile & Grout Cleaning', price: 35, description: 'Deep clean and restore tile surfaces.' },
      { id: 'p7', title: 'Carpet Shampooing', price: 30, description: 'Deep cleaning of carpets using advanced shampooing.' },
      { id: 'p8', title: 'Power Washing', price: 50, description: 'High-pressure washing for outdoor areas.' },
      { id: 'p9', title: 'Wall Spot Cleaning', price: 15, description: 'Removes stains and spots from walls.' },
      { id: 'p10', title: 'Furniture Polish', price: 18, description: 'Polishes and restores shine to wooden furniture.' },
    ],
    '3': [
      { id: 'p11', title: 'Fabric Protection', price: 20, description: 'Protects upholstery from stains and dirt.' },
      { id: 'p12', title: 'Luxury Carpet Care', price: 50, description: 'Premium care for high-end carpets and rugs.' },
      { id: 'p13', title: 'Upholstery Protection', price: 22, description: 'Protective treatment for upholstery.' },
      { id: 'p14', title: 'Scented Finish', price: 12, description: 'Adds a pleasant scent to cleaned areas.' },
      { id: 'p15', title: 'Wood Restoration', price: 40, description: 'Restores wooden furniture and flooring.' },
    ],
    '4': [
      { id: 'p16', title: 'Custom Cleaning Plan', price: 60, description: 'Personalized cleaning plan tailored to your needs.' },
      { id: 'p17', title: 'Luxury Touch-Up', price: 25, description: 'Detailed touch-up of specific areas for a polished look.' },
      { id: 'p18', title: 'Full Home Disinfection', price: 70, description: 'Comprehensive disinfection of all home areas.' },
      { id: 'p19', title: 'Deep Upholstery Cleaning', price: 40, description: 'Specialized deep clean for sofas and chairs.' },
      { id: 'p20', title: 'Luxury Home Cleaning', price: 100, description: 'Complete luxury service, including all areas.' },
    ],
  };
  useEffect(() => {
    const defaultType = homeCareTypes.find((type) => type.id === '1');
    setSelectedType(defaultType);
  }, []);

  useEffect(() => {

    if (selectedType) {
      const clothes = homeCareItems[selectedType.id]?.filter(cloth =>
        cloth.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];
      const premium = homeCarePremiumServices[selectedType.id]?.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];

      setFilteredClothes(clothes);
      setFilteredPremium(premium);
    }
  }, [searchQuery, selectedType]);

  const incrementQty = (id, typeId) => {
    if (typeId === selectedType.id) {
      if (homeCareItems[typeId]?.some(item => item.id === id)) {
        setClothQuantitiesByType(prev => ({
          ...prev,
          [typeId]: {
            ...prev[typeId],
            [id]: (prev[typeId][id] || 0) + 1
          }
        }));
      } else if (homeCarePremiumServices[typeId]?.some(item => item.id === id)) {
        setPremiumQuantitiesByType(prev => ({
          ...prev,
          [typeId]: {
            ...prev[typeId],
            [id]: (prev[typeId][id] || 0) + 1
          }
        }));
      }
    }
  };

  const decrementQty = (id, typeId) => {
    if (typeId === selectedType.id) {
      if (homeCareItems[typeId]?.some(item => item.id === id)) {
        if ((clothQuantitiesByType[typeId]?.[id] || 0) > 0) {
          setClothQuantitiesByType(prev => ({
            ...prev,
            [typeId]: {
              ...prev[typeId],
              [id]: prev[typeId][id] - 1
            }
          }));
        }
      } else if (homeCarePremiumServices[typeId]?.some(item => item.id === id)) {
        if ((premiumQuantitiesByType[typeId]?.[id] || 0) > 0) {
          setPremiumQuantitiesByType(prev => ({
            ...prev,
            [typeId]: {
              ...prev[typeId],
              [id]: prev[typeId][id] - 1
            }
          }));
        }
      }
    }
  };

  const getTotal = () => {
    let total = 0;

    Object.keys(clothQuantitiesByType).forEach(typeId => {
      const clothItems = homeCareItems[typeId] || [];
      clothItems.forEach(item => {
        const qty = clothQuantitiesByType[typeId]?.[item.id] || 0;
        total += qty * item.price;
      });
    });

    Object.keys(premiumQuantitiesByType).forEach(typeId => {
      const premiumItems = homeCarePremiumServices[typeId] || [];
      premiumItems.forEach(item => {
        const qty = premiumQuantitiesByType[typeId]?.[item.id] || 0;
        total += qty * item.price;
      });
    });

    return total;
  };

  const handleSchedule = async () => {
    const summary = {
      orderId: uuid.v4(),
      serviceTypes: [],
      cloths: [],
      homeCarePremiumServices: [],
      total: getTotal(),
      status: getTotal() > 50 ? 'Scheduled' : 'Rejected',
      createdAt: new Date().toISOString(),
    };

    const usedServiceTypes = new Set();

    Object.entries(clothQuantitiesByType).forEach(([typeId, typeQuantities]) => {
      Object.entries(typeQuantities)
        .filter(([, qty]) => qty > 0)
        .forEach(([clothId, qty]) => {
          const cloth = homeCareItems[typeId]?.find(c => c.id === clothId);
          if (cloth) {
            const serviceType = homeCareTypes.find(type => type.id === typeId)?.name;
            usedServiceTypes.add(serviceType);
            summary.cloths.push({
              id: clothId,
              name: cloth.name,
              quantity: qty,
              CleaningType: serviceType,
              price: cloth.price,
            });
          }
        });
    });

    Object.entries(premiumQuantitiesByType).forEach(([typeId, typeQuantities]) => {
      Object.entries(typeQuantities)
        .filter(([, qty]) => qty > 0)
        .forEach(([serviceId, qty]) => {
          const service = homeCarePremiumServices[typeId]?.find(s => s.id === serviceId);
          if (service) {
            const serviceType = homeCareTypes.find(type => type.id === typeId)?.name;
            usedServiceTypes.add(serviceType);
            summary.homeCarePremiumServices.push({
              id: serviceId,
              title: service.title,
              quantity: qty,
              CleaningType: serviceType,
              price: service.price
            });
          }
        });
    });

    summary.serviceTypes = Array.from(usedServiceTypes);

    try {
      const existing = await AsyncStorage.getItem('orders');
      const orders = existing ? JSON.parse(existing) : [];
      await AsyncStorage.setItem('orders', JSON.stringify([summary, ...orders]));
    } catch (err) {
      console.error('Failed to save order', err);
    }

    summary.cloths.forEach(cloth => dispatch(addCloth(cloth)));
    dispatch(setStatus(summary.status));
    dispatch(setPrice(summary.total));

    Alert.alert('Scheduled!', 'Your order has been placed.');
    navigation.navigate('ScheduleScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Choose Cleaning Type</Text>

      <View style={styles.typeRow}>
        <FlatList
          horizontal
          data={homeCareTypes}
          removeClippedSubviews={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.typeCard,
                selectedType?.id === item.id && styles.selectedCard,
              ]}
              onPress={() => setSelectedType(item)}
            >
              <Image source={{ uri: item.image }} style={styles.icon} />
              <Text style={styles.typeText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{marginVertical:20}}>
      <CustomSearch  backgroundColor={"#fff"}         placeholder="Search items..."       value={searchQuery}        onChangeText={setSearchQuery} />

      </View>

    

      {selectedType && (
        <>
          <Text style={styles.subheading}>Clothing Items</Text>
          {(filteredClothes || []).map((cloth) => (
            <View key={cloth.id} style={styles.itemRow}>
              <Text style={styles.itemName}>{cloth.name}</Text>
              <Text style={styles.price}>₹{cloth.price}</Text>
              <View style={styles.qtyBox}>
                <TouchableOpacity
                  onPress={() => decrementQty(cloth.id, selectedType.id)}
                >
                  <Icon name="minus-circle-outline" size={26} color="#FFA717" />
                </TouchableOpacity>
                <Text style={styles.qtyText}>
                  {clothQuantitiesByType[selectedType.id]?.[cloth.id] || 0}
                </Text>
                <TouchableOpacity
                  onPress={() => incrementQty(cloth.id, selectedType.id)}
                >
                  <Icon name="plus-circle-outline" size={26} color="#FFA717" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <Text style={styles.subheading}>Premium Add-ons</Text>
          {(filteredPremium || []).map((item) => (
            <View key={item.id} style={styles.premiumCard}>
              <View>
                <Text style={styles.premiumTitle}>{item.title}</Text>
                <Text style={styles.premiumDesc} ellipsizeMode='tail'>{item.description}</Text>
              </View>
              <View style={styles.premiumRight}>
                <Text style={styles.price}>₹{item.price}</Text>
                <View style={styles.qtyBox}>
                  <TouchableOpacity
                    onPress={() => decrementQty(item.id, selectedType.id)}
                  >
                    <Icon name="minus-circle-outline" size={26} color="#FFA717" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>
                    {premiumQuantitiesByType[selectedType.id]?.[item.id] || 0}
                  </Text>
                  <TouchableOpacity
                    onPress={() => incrementQty(item.id, selectedType.id)}
                  >
                    <Icon name="plus-circle-outline" size={26} color="#FFA717" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          <Text style={styles.total}>Total: ₹{getTotal()}</Text>

          <TouchableOpacity style={styles.button} onPress={handleSchedule}>
            <Text style={styles.buttonText}>Confirm & Schedule</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default HomeCare;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 16,
  },
  subheading: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    marginBottom: 10,
    color: '#FFA717',
  },
  typeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  typeCard: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 12,
  },
  selectedCard: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FFA717',
  },
  icon: {
    width: 40,
    height: 40,
  },
  typeText: {
    marginTop: 6,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    textAlign: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemName: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    color: '#FFA717',
    marginRight: 10,
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    width: 20,
    textAlign: 'center',
  },
  premiumCard: {
    backgroundColor: '#FAF5EF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  premiumTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#333',
  },
  premiumDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#777',
    width: 250
  },
  premiumRight: {
    alignItems: 'flex-end',
  },
  total: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginTop: 20,
    color: '#000',
    textAlign: 'right',
  },
  searchInput: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FFA717',
    paddingVertical: 14,
    marginTop: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 16,
  },
});