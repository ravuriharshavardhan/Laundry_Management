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
  StatusBar,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { addCloth, setPrice, setStatus } from '../../Redux/Slice/AddClothSlice';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomSearch from '../../components/CustomInput/CustomSearch';

const LaundryService = ({ navigation }) => {
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
      status: getTotal() > 0 ? 'Scheduled' : 'Empty Cart',
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
              serviceType: serviceType,
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
              serviceType: serviceType,
              price: service.price
            });
          }
        });
    });

    summary.serviceTypes = Array.from(usedServiceTypes);

    if (summary.total === 0) {
      Alert.alert('Empty Cart', 'Please add items to your order before scheduling.');
      return;
    }

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

    Alert.alert('Success!', 'Your laundry order has been scheduled.');
    navigation.navigate('ScheduleScreen');
  };

  const ServiceTypeCard = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.typeCard,
        selectedType?.id === item.id && styles.selectedCard
      ]}
      onPress={() => setSelectedType(item)}
    >
      <Image source={{ uri: item.image }} style={styles.icon} />
      <Text style={styles.typeText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const ClothingItem = ({ item }) => {
    const quantity = clothQuantitiesByType[selectedType.id]?.[item.id] || 0;
    
    return (
      <View style={styles.itemRow}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.price}>₹{item.price}</Text>
        </View>
        <View style={styles.qtyControl}>
          <TouchableOpacity
            style={[styles.qtyButton, quantity === 0 && styles.qtyButtonDisabled]}
            onPress={() => decrementQty(item.id, selectedType.id)}
            disabled={quantity === 0}
          >
            <Icon name="minus" size={16} color={quantity === 0 ? "#ccc" : "#fff"} />
          </TouchableOpacity>
          
          <Text style={styles.qtyText}>{quantity}</Text>
          
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => incrementQty(item.id, selectedType.id)}
          >
            <Icon name="plus" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const PremiumService = ({ item }) => {
    const quantity = premiumQuantitiesByType[selectedType.id]?.[item.id] || 0;
    
    return (
      <View style={styles.premiumCard}>
        <View style={styles.premiumInfo}>
          <Text style={styles.premiumTitle}>{item.title}</Text>
          <Text style={styles.premiumDesc}>{item.description}</Text>
          <Text style={styles.premiumPrice}>₹{item.price}</Text>
        </View>
        <View style={styles.qtyControl}>
          <TouchableOpacity
            style={[styles.qtyButton, quantity === 0 && styles.qtyButtonDisabled]}
            onPress={() => decrementQty(item.id, selectedType.id)}
            disabled={quantity === 0}
          >
            <Icon name="minus" size={16} color={quantity === 0 ? "#ccc" : "#fff"} />
          </TouchableOpacity>
          
          <Text style={styles.qtyText}>{quantity}</Text>
          
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => incrementQty(item.id, selectedType.id)}
          >
            <Icon name="plus" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F49905" barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Laundry Service</Text>
      </View>
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Select Service Type</Text>
        
        <FlatList
          horizontal
          data={homeCareTypes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ServiceTypeCard item={item} />}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={false}
          contentContainerStyle={styles.typeList}
        />
        
        <View style={styles.searchContainer}>
          <CustomSearch 
            backgroundColor="#F3F5FF" 
            placeholder="Search items..." 
            value={searchQuery} 
            onChangeText={setSearchQuery} 
          />
        </View>
        
        {selectedType && (
          <>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Clothing Items</Text>
              
              {filteredClothes.length > 0 ? (
                filteredClothes.map((item) => (
                  <ClothingItem key={item.id} item={item} />
                ))
              ) : (
                <Text style={styles.emptyText}>No clothing items found</Text>
              )}
            </View>
            
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Premium Add-ons</Text>
              
              {filteredPremium.length > 0 ? (
                filteredPremium.map((item) => (
                  <PremiumService key={item.id} item={item} />
                ))
              ) : (
                <Text style={styles.emptyText}>No premium services found</Text>
              )}
            </View>
          </>
        )}
        
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>₹{getTotal()}</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.scheduleButton, getTotal() === 0 && styles.disabledButton]} 
            onPress={handleSchedule}
            disabled={getTotal() === 0}
          >
            <Text style={styles.scheduleButtonText}>Schedule Pickup</Text>
            <Icon name="arrow-right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F49905',
  },
  header: {
    backgroundColor: '#F49905',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  heading: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  typeList: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  typeCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: 100,
    height: 100,
  },
  selectedCard: {
    backgroundColor: '#E4E9FF',
    borderColor: '#F49905',
    borderWidth: 2,
  },
  icon: {
    width: 36,
    height: 36,
    marginBottom: 8,
  },
  typeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    textAlign: 'center',
    color: '#444',
  },
  searchContainer: {
    marginHorizontal: 20,
    marginVertical: 16,
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 12,
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingVertical: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#F49905',
  },
  premiumCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  premiumInfo: {
    flex: 1,
  },
  premiumTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#333',
    marginBottom: 2,
  },
  premiumDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  premiumPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#F49905',
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F5FF',
    borderRadius: 8,
    padding: 4,
  },
  qtyButton: {
    backgroundColor: '#F49905',
    borderRadius: 6,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  qtyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333',
    width: 32,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginTop: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#666',
  },
  totalAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#333',
  },
  scheduleButton: {
    backgroundColor: '#F49905',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  disabledButton: {
    backgroundColor: '#B2B8DA',
  },
  scheduleButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default LaundryService;