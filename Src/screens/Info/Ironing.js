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

const CarpetCleaning = ({ navigation }) => {
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
      status: getTotal() > 50 ? 'Scheduled' : 'Rejected',
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
          const service = ironingPremiumServices[typeId]?.find(s => s.id === serviceId);
          if (service) {
            const serviceType = ironingTypes.find(type => type.id === typeId)?.name;
            usedServiceTypes.add(serviceType);
            summary.ironingPremiumServices.push({
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
          data={ironingTypes}
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

export default CarpetCleaning;

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