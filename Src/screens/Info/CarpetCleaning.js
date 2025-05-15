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

  const carpetCleaningTypes = [
    {
      id: '1',
      name: 'Standard Carpet Cleaning',
      image: 'https://img.icons8.com/ios-filled/50/carpet.png',
      description: 'Basic carpet cleaning to remove dirt and stains.',
    },
    {
      id: '2',
      name: 'Deep Carpet Cleaning',
      image: 'https://img.icons8.com/ios-filled/50/cleaning.png',
      description: 'Thorough cleaning for deeply embedded dirt and stains.',
    },
    {
      id: '3',
      name: 'Stain Removal Treatment',
      image: 'https://img.icons8.com/ios-filled/50/stain-removal.png',
      description: 'Special treatment for stubborn stains and spills.',
    },
    {
      id: '4',
      name: 'Pet Odor Removal',
      image: 'https://img.icons8.com/ios-filled/50/pet-care.png',
      description: 'Eliminates odors caused by pets using special cleaning agents.',
    },
    {
      id: '5',
      name: 'Carpet Deodorizing',
      image: 'https://img.icons8.com/ios-filled/50/odor.png',
      description: 'Leaves your carpet smelling fresh and clean with a deodorizing treatment.',
    },
    {
      id: '6',
      name: 'Carpet Steam Cleaning',
      image: 'https://img.icons8.com/ios-filled/50/steam.png',
      description: 'Uses steam to clean and sanitize your carpets.',
    },
    {
      id: '7',
      name: 'Eco-Friendly Carpet Cleaning',
      image: 'https://img.icons8.com/ios-filled/50/recycle.png',
      description: 'Uses eco-friendly cleaning products that are safe for the environment.',
    },
    {
      id: '8',
      name: 'Area Rug Cleaning',
      image: 'https://img.icons8.com/ios-filled/50/rug.png',
      description: 'Cleaning services for area rugs, tailored to fabric type.',
    },
    {
      id: '9',
      name: 'Carpet Protection',
      image: 'https://img.icons8.com/ios-filled/50/umbrella.png',
      description: 'Adds a protective layer to your carpet to prevent stains and dirt.',
    },
    {
      id: '10',
      name: 'Carpet Repair',
      image: 'https://img.icons8.com/ios-filled/50/repair.png',
      description: 'Fixes tears, holes, and other damage to your carpet.',
    },
  ];

  const carpetItemsWithPrices = {
    '1': [ // Standard Carpet Cleaning
      { id: 'carpet-small', name: 'Small Carpet (3x5 ft)', price: 10 },
      { id: 'carpet-medium', name: 'Medium Carpet (5x8 ft)', price: 18 },
      { id: 'carpet-large', name: 'Large Carpet (8x10 ft)', price: 25 },
      { id: 'carpet-xl', name: 'Extra Large Carpet (10x12 ft)', price: 35 },
    ],
    '2': [ // Deep Carpet Cleaning
      { id: 'deep-small', name: 'Small Carpet (Deep Clean)', price: 15 },
      { id: 'deep-medium', name: 'Medium Carpet (Deep Clean)', price: 25 },
      { id: 'deep-large', name: 'Large Carpet (Deep Clean)', price: 35 },
      { id: 'deep-xl', name: 'Extra Large Carpet (Deep Clean)', price: 45 },
    ],
    '3': [ // Stain Removal Treatment
      { id: 'stain-spot', name: 'Single Spot Stain Removal', price: 5 },
      { id: 'stain-multi', name: 'Multiple Stains (per area)', price: 12 },
    ],
    '4': [ // Pet Odor Removal
      { id: 'pet-odor-small', name: 'Small Carpet (Pet Odor)', price: 12 },
      { id: 'pet-odor-large', name: 'Large Carpet (Pet Odor)', price: 20 },
    ],
    '5': [ // Carpet Deodorizing
      { id: 'deodorize-small', name: 'Deodorizing Small Carpet', price: 5 },
      { id: 'deodorize-large', name: 'Deodorizing Large Carpet', price: 10 },
    ],
    '6': [ // Steam Cleaning
      { id: 'steam-small', name: 'Small Carpet (Steam)', price: 20 },
      { id: 'steam-medium', name: 'Medium Carpet (Steam)', price: 30 },
      { id: 'steam-large', name: 'Large Carpet (Steam)', price: 40 },
    ],
    '7': [ // Eco-Friendly Cleaning
      { id: 'eco-small', name: 'Eco-Friendly Small Carpet', price: 15 },
      { id: 'eco-large', name: 'Eco-Friendly Large Carpet', price: 28 },
    ],
    '8': [ // Area Rug Cleaning
      { id: 'rug-small', name: 'Small Area Rug', price: 12 },
      { id: 'rug-large', name: 'Large Area Rug', price: 20 },
    ],
    '9': [ // Carpet Protection
      { id: 'protect-small', name: 'Protection - Small Carpet', price: 10 },
      { id: 'protect-large', name: 'Protection - Large Carpet', price: 18 },
    ],
    '10': [ // Carpet Repair
      { id: 'repair-tear', name: 'Tear Repair (per area)', price: 15 },
      { id: 'repair-burn', name: 'Burn Mark Repair', price: 20 },
    ],
  };

  const carpetPremiumServices = {
    '1': [ // Standard Carpet Cleaning
      { id: 'cp1', title: 'Quick Drying', price: 8, description: 'Accelerated drying process to reduce wait time.' },
      { id: 'cp2', title: 'Fragrance Finish', price: 5, description: 'Leaves your carpet with a long-lasting fresh scent.' },
      { id: 'cp3', title: 'Allergy Relief Treatment', price: 10, description: 'Removes allergens like pollen and dust mites.' },
    ],
    '2': [ // Deep Carpet Cleaning
      { id: 'cp4', title: 'Deep Stain Guard', price: 12, description: 'Protects against future stains and spills.' },
      { id: 'cp5', title: 'Color Brightening', price: 7, description: 'Revives and brightens carpet colors.' },
      { id: 'cp6', title: 'Enzyme Boost', price: 6, description: 'Breaks down organic matter in deep fibers.' },
    ],
    '3': [ // Stain Removal Treatment
      { id: 'cp7', title: 'Pet Stain Enzyme Treatment', price: 9, description: 'Breaks down pet-based stains and residues.' },
      { id: 'cp8', title: 'Grease Spot Treatment', price: 7, description: 'Special solution for oil and grease stains.' },
    ],
    '4': [ // Pet Odor Removal
      { id: 'cp9', title: 'Double Enzyme Treatment', price: 10, description: 'Twice the power for heavy pet odor and stains.' },
      { id: 'cp10', title: 'Odor Lock Technology', price: 8, description: 'Neutralizes and seals away odors.' },
    ],
    '5': [ // Carpet Deodorizing
      { id: 'cp11', title: 'Essential Oil Fragrance', price: 6, description: 'Lavender or citrus essential oil finish.' },
      { id: 'cp12', title: 'Long-Lasting Freshness', price: 5, description: 'Keeps your carpet smelling fresh for weeks.' },
    ],
    '6': [ // Carpet Steam Cleaning
      { id: 'cp13', title: 'Anti-Bacterial Steam Boost', price: 12, description: 'Steam cleaning with added sanitization agents.' },
      { id: 'cp14', title: 'Steam Finish Protection', price: 10, description: 'Adds a light protective coating after steaming.' },
    ],
    '7': [ // Eco-Friendly Carpet Cleaning
      { id: 'cp15', title: 'Organic Scented Finish', price: 7, description: 'All-natural scents from essential oils.' },
      { id: 'cp16', title: 'Biodegradable Protective Layer', price: 9, description: 'Eco-safe fiber protection application.' },
    ],
    '8': [ // Area Rug Cleaning
      { id: 'cp17', title: 'Gentle Fiber Conditioning', price: 8, description: 'Maintains softness and texture of rugs.' },
      { id: 'cp18', title: 'Non-Slip Backing Spray', price: 6, description: 'Helps prevent rugs from slipping.' },
    ],
    '9': [ // Carpet Protection
      { id: 'cp19', title: 'Scotchgard Application', price: 10, description: 'Industry-standard stain & spill guard.' },
      { id: 'cp20', title: 'UV Protection', price: 9, description: 'Prevents fading from sun exposure.' },
    ],
    '10': [ // Carpet Repair
      { id: 'cp21', title: 'Seam Fixing', price: 12, description: 'Repairs damaged carpet seams.' },
      { id: 'cp22', title: 'Color Patch Matching', price: 15, description: 'Matches and patches discolored areas.' },
    ],
  };
  useEffect(() => {
    const defaultType = carpetCleaningTypes.find((type) => type.id === '1');
    setSelectedType(defaultType);
  }, []);

  useEffect(() => {

    if (selectedType) {
      const clothes = carpetItemsWithPrices[selectedType.id]?.filter(cloth =>
        cloth.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];
      const premium = carpetPremiumServices[selectedType.id]?.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];

      setFilteredClothes(clothes);
      setFilteredPremium(premium);
    }
  }, [searchQuery, selectedType]);

  const incrementQty = (id, typeId) => {
    if (typeId === selectedType.id) {
      if (carpetItemsWithPrices[typeId]?.some(item => item.id === id)) {
        setClothQuantitiesByType(prev => ({
          ...prev,
          [typeId]: {
            ...prev[typeId],
            [id]: (prev[typeId][id] || 0) + 1
          }
        }));
      } else if (carpetPremiumServices[typeId]?.some(item => item.id === id)) {
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
      if (carpetItemsWithPrices[typeId]?.some(item => item.id === id)) {
        if ((clothQuantitiesByType[typeId]?.[id] || 0) > 0) {
          setClothQuantitiesByType(prev => ({
            ...prev,
            [typeId]: {
              ...prev[typeId],
              [id]: prev[typeId][id] - 1
            }
          }));
        }
      } else if (carpetPremiumServices[typeId]?.some(item => item.id === id)) {
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
      const clothItems = carpetItemsWithPrices[typeId] || [];
      clothItems.forEach(item => {
        const qty = clothQuantitiesByType[typeId]?.[item.id] || 0;
        total += qty * item.price;
      });
    });

    Object.keys(premiumQuantitiesByType).forEach(typeId => {
      const premiumItems = carpetPremiumServices[typeId] || [];
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
      carpetPremiumServices: [],
      total: getTotal(),
      status: getTotal() > 50 ? 'Scheduled' : 'Rejected',
      createdAt: new Date().toISOString(),
    };

    const usedServiceTypes = new Set();

    Object.entries(clothQuantitiesByType).forEach(([typeId, typeQuantities]) => {
      Object.entries(typeQuantities)
        .filter(([, qty]) => qty > 0)
        .forEach(([clothId, qty]) => {
          const cloth = carpetItemsWithPrices[typeId]?.find(c => c.id === clothId);
          if (cloth) {
            const serviceType = carpetCleaningTypes.find(type => type.id === typeId)?.name;
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
          const service = carpetPremiumServices[typeId]?.find(s => s.id === serviceId);
          if (service) {
            const serviceType = carpetCleaningTypes.find(type => type.id === typeId)?.name;
            usedServiceTypes.add(serviceType);
            summary.carpetPremiumServices.push({
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
          data={carpetCleaningTypes}
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

      <View style={{ marginVertical: 20 }}>
        <CustomSearch backgroundColor={"#fff"} placeholder="Search items..." value={searchQuery} onChangeText={setSearchQuery} />

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