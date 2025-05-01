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

  const dryCleaningTypes = [
    {
      id: '1',
      name: 'Standard Clean',
      image: 'https://img.icons8.com/color/96/laundry.png',
      description: 'Basic dry cleaning for everyday wear.',
    },
    {
      id: '2',
      name: 'Delicate Care',
      image: 'https://img.icons8.com/color/96/washing-machine.png',
      description: 'For fabrics like silk, chiffon, or lace.',
    },
    {
      id: '3',
      name: 'Luxury Garments',
      image: 'https://img.icons8.com/color/96/clothes.png',
      description: 'Tailored for designer and branded clothing.',
    },
    {
      id: '4',
      name: 'Wedding & Ethnic',
      image: 'https://img.icons8.com/color/96/indian-sari.png',
      description: 'For bridal wear, sherwanis, and ethnic dresses.',
    },
    {
      id: '5',
      name: 'Express Service',
      image: 'https://img.icons8.com/color/96/fast-cart.png',
      description: 'Quick turnaround with same-day or next-day delivery.',
    },
    {
      id: '6',
      name: 'Eco-Friendly',
      image: 'https://img.icons8.com/color/96/recycle.png',
      description: 'Uses organic solvents & minimal water for cleaning.',
    },
    {
      id: '7',
      name: 'Curtain Cleaning',
      image: 'https://img.icons8.com/color/96/curtain.png',
      description: 'Special cleaning and deodorizing of curtains.',
    },
    {
      id: '8',
      name: 'Leather Care',
      image: 'https://img.icons8.com/color/96/leather-jacket.png',
      description: 'Restores and softens leather garments.',
    },
    {
      id: '9',
      name: 'Fur Care',
      image: 'https://img.icons8.com/color/96/fur-coat.png',
      description: 'Special treatment for fur and shearling garments.',
    },
    {
      id: '10',
      name: 'Luxury Care',
      image: 'https://img.icons8.com/color/96/diamond.png',
      description: 'Tailored care for high-end designer garments.',
    },
  ];
  

  const clothesWithPrices = {
    '1': [
      { id: 'shirt', name: 'Cotton Shirt', price: 5 },
      { id: 'pants', name: 'Formal Pants', price: 7 },
      { id: 'tshirt', name: 'T-Shirt', price: 4 },
      { id: 'jeans', name: 'Jeans', price: 6 },
      { id: 'blouse', name: 'Silk Blouse', price: 8 },
      { id: 'suit', name: 'Business Suit', price: 15 },
      { id: 'skirt', name: 'A-Line Skirt', price: 6 },
      { id: 'jacket', name: 'Winter Jacket', price: 20 },
      { id: 'hoodie', name: 'Hoodie', price: 9 },
      { id: 'shorts', name: 'Denim Shorts', price: 5 },
    ],
    '2': [
      { id: 'silk', name: 'Silk Dress', price: 12 },
      { id: 'lace', name: 'Lace Top', price: 10 },
      { id: 'chiffon', name: 'Chiffon Blouse', price: 11 },
      { id: 'silk-scarf', name: 'Silk Scarf', price: 8 },
      { id: 'blouse', name: 'Chiffon Blouse', price: 9 },
      { id: 'dress', name: 'Satin Dress', price: 15 },
      { id: 'top', name: 'Cotton Top', price: 7 },
      { id: 'kimono', name: 'Silk Kimono', price: 18 },
      { id: 'lingerie', name: 'Lace Lingerie', price: 5 },
      { id: 'nightgown', name: 'Silk Nightgown', price: 12 },
    ],
    '3': [
      { id: 'suit', name: 'Designer Suit', price: 20 },
      { id: 'coat', name: 'Luxury Coat', price: 18 },
      { id: 'wool', name: 'Wool Sweater', price: 14 },
      { id: 'blazer', name: 'Formal Blazer', price: 16 },
      { id: 'vest', name: 'V-neck Vest', price: 8 },
      { id: 'pashmina', name: 'Pashmina Shawl', price: 10 },
      { id: 'scarf', name: 'Cashmere Scarf', price: 7 },
      { id: 'overcoat', name: 'Trench Coat', price: 25 },
      { id: 'jacket', name: 'Leather Jacket', price: 30 },
      { id: 'sweater', name: 'Cashmere Sweater', price: 22 },
    ],
    '4': [
      { id: 'lehenga', name: 'Lehenga', price: 25 },
      { id: 'sari', name: 'Sari', price: 20 },
      { id: 'sherwani', name: 'Sherwani', price: 30 },
      { id: 'kurta', name: 'Kurta', price: 18 },
      { id: 'dupattas', name: 'Dupatta', price: 8 },
      { id: 'churidar', name: 'Churidar', price: 15 },
      { id: 'anarkali', name: 'Anarkali', price: 28 },
      { id: 'pajama', name: 'Ethnic Pajama', price: 12 },
      { id: 'suit', name: 'Sherwani Set', price: 35 },
      { id: 'choli', name: 'Choli', price: 18 },
    ],
  };
  
  const premiumServices = {
    '1': [
      { id: 'p1', title: 'Stain Removal', price: 5, description: 'Advanced enzyme treatment.' },
      { id: 'p2', title: 'Fragrance Finish', price: 3, description: 'Mild and lasting scent added post-clean.' },
      { id: 'p3', title: 'Extra Softening', price: 7, description: 'Ultra-soft finish for delicate fabrics.' },
      { id: 'p4', title: 'Gentle Wash', price: 6, description: 'Hand-wash with gentle detergents.' },
      { id: 'p5', title: 'Waterproofing', price: 10, description: 'Adds waterproof coating to fabrics.' },
      { id: 'p6', title: 'Color Restoration', price: 8, description: 'Restores faded color to garments.' },
      { id: 'p7', title: 'Mildew Treatment', price: 4, description: 'Removes mildew and odors.' },
      { id: 'p8', title: 'Fur Care', price: 15, description: 'Special cleaning for fur items.' },
      { id: 'p9', title: 'Anti-Wrinkle', price: 5, description: 'Reduces wrinkles and creases in garments.' },
      { id: 'p10', title: 'Re-waterproofing', price: 12, description: 'Adds protective waterproofing layer.' },
    ],
    '2': [
      { id: 'p11', title: 'Soft Finish', price: 6, description: 'Extra softener for delicate fabrics.' },
      { id: 'p12', title: 'Hand Wash', price: 8, description: 'Gentle hand wash by textile experts.' },
      { id: 'p13', title: 'Fabric Softening', price: 5, description: 'Makes fabrics extra soft and fresh.' },
      { id: 'p14', title: 'Anti-Pilling Treatment', price: 7, description: 'Prevents fabric pilling and fuzzing.' },
      { id: 'p15', title: 'Thread Repair', price: 4, description: 'Repairs minor tears and loose threads.' },
      { id: 'p16', title: 'Water Stain Removal', price: 6, description: 'Removes all water-based stains.' },
      { id: 'p17', title: 'Premium Hand Ironing', price: 7, description: 'Delicate hand ironing for sensitive fabrics.' },
      { id: 'p18', title: 'Scented Finish', price: 5, description: 'Adds a premium, long-lasting scent.' },
      { id: 'p19', title: 'UV Protection', price: 12, description: 'Adds UV protection to your garments.' },
      { id: 'p20', title: 'Embroidery Protection', price: 8, description: 'Prevents damage to embroidered items.' },
    ],
    '3': [
      { id: 'p21', title: 'Fabric Protection', price: 10, description: 'Adds a protective layer to prevent wear.' },
      { id: 'p22', title: 'Luxury Ironing', price: 5, description: 'Precision steaming and wrinkle guard.' },
      { id: 'p23', title: 'Leather Conditioning', price: 15, description: 'Restores shine and softness to leather.' },
      { id: 'p24', title: 'Anti-Bacterial Treatment', price: 7, description: 'Removes bacteria and allergens.' },
      { id: 'p25', title: 'Luxury Wrapping', price: 20, description: 'Special packaging for luxury garments.' },
      { id: 'p26', title: 'Deep Cleaning', price: 12, description: 'Thorough deep cleaning of items.' },
      { id: 'p27', title: 'Bead & Crystal Care', price: 18, description: 'Specialized care for beaded & sequined garments.' },
      { id: 'p28', title: 'Moth Repellent', price: 6, description: 'Protects fabrics from moth damage.' },
      { id: 'p29', title: 'Odor Removal', price: 5, description: 'Eliminates stubborn odors from fabric.' },
      { id: 'p30', title: 'Premium Stain Treatment', price: 8, description: 'Advanced stain removal for tough stains.' },
    ],
    '4': [
      { id: 'p31', title: 'Ornament Handling', price: 12, description: 'Careful handling of embroidery & stones.' },
      { id: 'p32', title: 'Scented Packing', price: 6, description: 'Wrapped in premium scented paper.' },
      { id: 'p33', title: 'Luxury Touch-Up', price: 9, description: 'Perfect touch-up for your wedding attire.' },
      { id: 'p34', title: 'Custom Fit', price: 15, description: 'Custom tailoring for your garments.' },
      { id: 'p35', title: 'Ethnic Wear Care', price: 10, description: 'Special care for ethnic fabrics and stitching.' },
      { id: 'p36', title: 'Bead Repair', price: 6, description: 'Repairing damaged beads or embellishments.' },
      { id: 'p37', title: 'Full Protection', price: 25, description: 'Full coverage and protection of luxury garments.' },
      { id: 'p38', title: 'Luxury Drying', price: 14, description: 'Drying at controlled temperatures.' },
      { id: 'p39', title: 'Stitching Service', price: 5, description: 'Stitch repairs for minor tears.' },
      { id: 'p40', title: 'Crystal Embellishment Care', price: 10, description: 'Gentle handling of decorative pieces.' },
    ],
  };

  useEffect(() => {
    const defaultType = dryCleaningTypes.find((type) => type.id === '1');
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
      status: getTotal() > 50 ? 'Scheduled' : 'Rejected',
      createdAt: new Date().toISOString(),
    };

    const usedServiceTypes = new Set();

    Object.entries(clothQuantitiesByType).forEach(([typeId, typeQuantities]) => {
      Object.entries(typeQuantities)
        .filter(([, qty]) => qty > 0)
        .forEach(([clothId, qty]) => {
          const cloth = clothesWithPrices[typeId]?.find(c => c.id === clothId);
          if (cloth) {
            const serviceType = dryCleaningTypes.find(type => type.id === typeId)?.name;
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
          const service = premiumServices[typeId]?.find(s => s.id === serviceId);
          if (service) {
            const serviceType = dryCleaningTypes.find(type => type.id === typeId)?.name;
            usedServiceTypes.add(serviceType);
            summary.premiumServices.push({
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
          data={dryCleaningTypes}
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