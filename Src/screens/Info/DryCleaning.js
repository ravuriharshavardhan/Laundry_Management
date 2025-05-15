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

  const laundryServiceTypes = [
    {
      id: '1',
      name: 'Regular Wash',
      image: 'https://img.icons8.com/color/96/washing-machine.png',
      description: 'Standard washing for everyday clothes',
    },
    {
      id: '2',
      name: 'Dry Clean',
      image: 'https://img.icons8.com/color/96/laundry.png',
      description: 'For delicate fabrics and formal wear',
    },
    {
      id: '3',
      name: 'Premium Care',
      image: 'https://img.icons8.com/color/96/clothes.png',
      description: 'For luxury and designer clothing',
    },
    {
      id: '4',
      name: 'Specialty',
      image: 'https://img.icons8.com/color/96/indian-sari.png',
      description: 'For special garments and ethnic wear',
    },
  ];

  const clothesWithPrices = {
    '1': [
      { id: 'shirt', name: 'T-Shirt', price: 4 },
      { id: 'pants', name: 'Casual Pants', price: 6 },
      { id: 'jeans', name: 'Jeans', price: 5 },
      { id: 'shorts', name: 'Shorts', price: 3 },
      { id: 'socks', name: 'Socks (Pair)', price: 2 },
      { id: 'pajamas', name: 'Pajama Set', price: 7 },
      { id: 'bedsheet', name: 'Bed Sheet', price: 10 },
      { id: 'pillowcase', name: 'Pillow Cover', price: 3 },
    ],
    '2': [
      { id: 'dshirt', name: 'Formal Shirt', price: 8 },
      { id: 'dpants', name: 'Formal Pants', price: 9 },
      { id: 'blazer', name: 'Blazer', price: 15 },
      { id: 'suit', name: 'Suit (2pc)', price: 20 },
      { id: 'sweater', name: 'Sweater', price: 12 },
      { id: 'jacket', name: 'Light Jacket', price: 14 },
      { id: 'tie', name: 'Tie', price: 5 },
    ],
    '3': [
      { id: 'pshirt', name: 'Designer Shirt', price: 12 },
      { id: 'pdress', name: 'Luxury Dress', price: 18 },
      { id: 'pcoat', name: 'Luxury Coat', price: 25 },
      { id: 'pleather', name: 'Leather Jacket', price: 30 },
      { id: 'pcashmere', name: 'Cashmere Sweater', price: 22 },
      { id: 'psilk', name: 'Silk Garment', price: 20 },
      { id: 'pscarf', name: 'Designer Scarf', price: 15 },
    ],
    '4': [
      { id: 'sari', name: 'Saree', price: 20 },
      { id: 'lehenga', name: 'Lehenga', price: 25 },
      { id: 'sherwani', name: 'Sherwani', price: 30 },
      { id: 'kurta', name: 'Kurta', price: 12 },
      { id: 'dupatta', name: 'Dupatta', price: 8 },
      { id: 'curtains', name: 'Curtains (per piece)', price: 18 },
      { id: 'carpet', name: 'Carpet (per sqm)', price: 25 },
      { id: 'quilt', name: 'Heavy Quilt', price: 22 },
    ],
  };

  const premiumServices = {
    '1': [
      { id: 'p1', title: 'Stain Treatment', price: 5, description: 'Special treatment for tough stains' },
      { id: 'p2', title: 'Fabric Softener', price: 3, description: 'Extra softness for your clothes' },
      { id: 'p3', title: 'Extra Rinse', price: 4, description: 'Additional rinse cycle for sensitive skin' },
    ],
    '2': [
      { id: 'p4', title: 'Eco-friendly Clean', price: 7, description: 'Using organic solvents' },
      { id: 'p5', title: 'Express Service', price: 8, description: 'Same-day turnaround' },
      { id: 'p6', title: 'Wrinkle Shield', price: 5, description: 'Anti-wrinkle treatment' },
    ],
    '3': [
      { id: 'p7', title: 'Premium Packaging', price: 6, description: 'Luxury garment bag and hanger' },
      { id: 'p8', title: 'Fabric Restoration', price: 12, description: 'Revitalizes fabric color and texture' },
      { id: 'p9', title: 'Button Replacement', price: 5, description: 'Replace missing buttons' },
    ],
    '4': [
      { id: 'p10', title: 'Embellishment Care', price: 12, description: 'Special care for beads and sequins' },
      { id: 'p11', title: 'Handwash Service', price: 15, description: 'Gentle handwashing for delicate items' },
      { id: 'p12', title: 'Steam Press', price: 8, description: 'Professional steam pressing' },
    ],
  };

  useEffect(() => {
    const defaultType = laundryServiceTypes.find((type) => type.id === '1');
    setSelectedType(defaultType);
  }, []);

  useEffect(() => {
    if (selectedType) {
      const clothes = clothesWithPrices[selectedType.id]?.filter(cloth =>
        cloth.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];
      const premium = premiumServices[selectedType.id]?.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];
      setFilteredClothes(clothes);
      setFilteredPremium(premium);
    }
  }, [searchQuery, selectedType]);

  const incrementQty = (id, typeId) => {
    if (typeId === selectedType.id) {
      if (clothesWithPrices[typeId]?.some(item => item.id === id)) {
        setClothQuantitiesByType(prev => ({
          ...prev,
          [typeId]: {
            ...prev[typeId],
            [id]: (prev[typeId][id] || 0) + 1
          }
        }));
      } else if (premiumServices[typeId]?.some(item => item.id === id)) {
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
      if (clothesWithPrices[typeId]?.some(item => item.id === id)) {
        if ((clothQuantitiesByType[typeId]?.[id] || 0) > 0) {
          setClothQuantitiesByType(prev => ({
            ...prev,
            [typeId]: {
              ...prev[typeId],
              [id]: prev[typeId][id] - 1
            }
          }));
        }
      } else if (premiumServices[typeId]?.some(item => item.id === id)) {
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
      const clothItems = clothesWithPrices[typeId] || [];
      clothItems.forEach(item => {
        const qty = clothQuantitiesByType[typeId]?.[item.id] || 0;
        total += qty * item.price;
      });
    });
    Object.keys(premiumQuantitiesByType).forEach(typeId => {
      const premiumItems = premiumServices[typeId] || [];
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
      premiumServices: [],
      total: getTotal(),
      status: getTotal() > 0 ? 'Scheduled' : 'Empty Cart',
      createdAt: new Date().toISOString(),
    };

    const usedServiceTypes = new Set();

    Object.entries(clothQuantitiesByType).forEach(([typeId, typeQuantities]) => {
      Object.entries(typeQuantities)
        .filter(([, qty]) => qty > 0)
        .forEach(([clothId, qty]) => {
          const cloth = clothesWithPrices[typeId]?.find(c => c.id === clothId);
          if (cloth) {
            const serviceType = laundryServiceTypes.find(type => type.id === typeId)?.name;
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
          const service = premiumServices[typeId]?.find(s => s.id === serviceId);
          if (service) {
            const serviceType = laundryServiceTypes.find(type => type.id === typeId)?.name;
            usedServiceTypes.add(serviceType);
            summary.premiumServices.push({
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
          data={laundryServiceTypes}
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