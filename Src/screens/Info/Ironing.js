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

  const ironingTypes =  [
    {
      id: '1',
      name: 'Standard Ironing',
      image: 'https://img.icons8.com/color/96/iron.png',
      description: 'Regular ironing for everyday clothing items.',
    },
    {
      id: '2',
      name: 'Delicate Ironing',
      image: 'https://img.icons8.com/color/96/fabric.png',
      description: 'Gentle ironing for delicate and fine fabrics.',
    },
    {
      id: '3',
      name: 'Express Ironing',
      image: 'https://img.icons8.com/color/96/fast-cart.png',
      description: 'Fast-track ironing for urgent needs.',
    },
    {
      id: '4',
      name: 'Eco Ironing',
      image: 'https://img.icons8.com/color/96/recycle.png',
      description: 'Ironing with energy-efficient and eco-friendly methods.',
    },
    {
      id: '5',
      name: 'Luxury Finish',
      image: 'https://img.icons8.com/color/96/diamond.png',
      description: 'Polished and crisp ironing for premium garments.',
    },
  ];

  const ironedClothesWithPrices = {
    '1': [
      { id: 'shirt', name: 'Shirt', price: 2 },
      { id: 'pants', name: 'Pants', price: 2.5 },
      { id: 'tshirt', name: 'T-Shirt', price: 1.5 },
      { id: 'jeans', name: 'Jeans', price: 2.5 },
      { id: 'skirt', name: 'Skirt', price: 2 },
      { id: 'blouse', name: 'Blouse', price: 2.5 },
      { id: 'saree', name: 'Saree', price: 3 },
      { id: 'jacket', name: 'Jacket', price: 3 },
      { id: 'kurta', name: 'Kurta', price: 2 },
    ],
    '2': [
      { id: 'silk-blouse', name: 'Silk Blouse', price: 3 },
      { id: 'lace-dress', name: 'Lace Dress', price: 3.5 },
      { id: 'chiffon-top', name: 'Chiffon Top', price: 3 },
      { id: 'velvet-jacket', name: 'Velvet Jacket', price: 4 },
      { id: 'satin-dress', name: 'Satin Dress', price: 4 },
    ],
    '3': [
      { id: 'shirt-express', name: 'Shirt (Express)', price: 3 },
      { id: 'trousers-express', name: 'Trousers (Express)', price: 3.5 },
      { id: 'kurta-express', name: 'Kurta (Express)', price: 3 },
      { id: 'coat-express', name: 'Blazer (Express)', price: 5 },
    ],
    '4': [
      { id: 'eco-shirt', name: 'Eco Shirt', price: 2 },
      { id: 'eco-pants', name: 'Eco Pants', price: 2.5 },
      { id: 'eco-scarf', name: 'Eco Scarf', price: 1.5 },
    ],
    '5': [
      { id: 'lux-blazer', name: 'Luxury Blazer', price: 6 },
      { id: 'lux-suit', name: 'Luxury Suit', price: 7 },
      { id: 'lux-coat', name: 'Luxury Coat', price: 6 },
      { id: 'lux-dress', name: 'Luxury Dress', price: 6.5 },
    ],
  };
  
  const ironingPremiumServices = {
    '1': [
      { id: 'ip1', title: 'Starch Finish', price: 1.5, description: 'Adds crispness and structure to garments.' },
      { id: 'ip2', title: 'Crease Line Pressing', price: 1, description: 'Sharp crease lines for formal wear.' },
    ],
    '2': [
      { id: 'ip3', title: 'Steam Iron Only', price: 2, description: 'Uses gentle steam for delicate fabrics.' },
      { id: 'ip4', title: 'Low-Heat Ironing', price: 1.5, description: 'For heat-sensitive fabrics like chiffon and silk.' },
    ],
    '3': [
      { id: 'ip5', title: 'Priority Handling', price: 2, description: 'Jump the queue for express processing.' },
      { id: 'ip6', title: 'On-Demand Pickup & Drop', price: 3, description: 'Instant pickup and delivery with express.' },
    ],
    '4': [
      { id: 'ip7', title: 'Solar-Iron Finish', price: 2, description: 'Powered by renewable solar energy.' },
      { id: 'ip8', title: 'Natural Scent Finish', price: 1.5, description: 'Infused with essential oil freshness.' },
    ],
    '5': [
      { id: 'ip9', title: 'Luxury Steam Treatment', price: 3, description: 'Deep steaming for wrinkle-free perfection.' },
      { id: 'ip10', title: 'Signature Packaging', price: 4, description: 'Folded and packed in premium branded covers.' },
    ],
  };

  useEffect(() => {
    const defaultType = ironingTypes.find((type) => type.id === '1');
    setSelectedType(defaultType);
  }, []);

  useEffect(() => {
    if (selectedType) {
      const clothes = ironedClothesWithPrices[selectedType.id]?.filter(cloth =>
        cloth.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];
      const premium = ironingPremiumServices[selectedType.id]?.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];
      setFilteredClothes(clothes);
      setFilteredPremium(premium);
    }
  }, [searchQuery, selectedType]);

  const incrementQty = (id, typeId) => {
    if (typeId === selectedType.id) {
      if (ironedClothesWithPrices[typeId]?.some(item => item.id === id)) {
        setClothQuantitiesByType(prev => ({
          ...prev,
          [typeId]: {
            ...prev[typeId],
            [id]: (prev[typeId][id] || 0) + 1
          }
        }));
      } else if (ironingPremiumServices[typeId]?.some(item => item.id === id)) {
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
      if (ironedClothesWithPrices[typeId]?.some(item => item.id === id)) {
        if ((clothQuantitiesByType[typeId]?.[id] || 0) > 0) {
          setClothQuantitiesByType(prev => ({
            ...prev,
            [typeId]: {
              ...prev[typeId],
              [id]: prev[typeId][id] - 1
            }
          }));
        }
      } else if (ironingPremiumServices[typeId]?.some(item => item.id === id)) {
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
      const clothItems = ironedClothesWithPrices[typeId] || [];
      clothItems.forEach(item => {
        const qty = clothQuantitiesByType[typeId]?.[item.id] || 0;
        total += qty * item.price;
      });
    });
    Object.keys(premiumQuantitiesByType).forEach(typeId => {
      const premiumItems = ironingPremiumServices[typeId] || [];
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
      ironingPremiumServices: [],
      total: getTotal(),
      status: getTotal() > 0 ? 'Scheduled' : 'Empty Cart',
      createdAt: new Date().toISOString(),
    };

    const usedServiceTypes = new Set();

    Object.entries(clothQuantitiesByType).forEach(([typeId, typeQuantities]) => {
      Object.entries(typeQuantities)
        .filter(([, qty]) => qty > 0)
        .forEach(([clothId, qty]) => {
          const cloth = ironedClothesWithPrices[typeId]?.find(c => c.id === clothId);
          if (cloth) {
            const serviceType = ironingTypes.find(type => type.id === typeId)?.name;
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
          const service = ironingPremiumServices[typeId]?.find(s => s.id === serviceId);
          if (service) {
            const serviceType = ironingTypes.find(type => type.id === typeId)?.name;
            usedServiceTypes.add(serviceType);
            summary.ironingPremiumServices.push({
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
          data={ironingTypes}
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