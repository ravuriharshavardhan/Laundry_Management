import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../../Redux/Slice/favoritesSlice';

// Define service categories and their sub-services
const serviceCategories = {
  Laundry: ['Washing', 'Ironing', 'Folding', 'Dry Cleaning'],
  Cleaning: ['General Cleaning', 'Deep Cleaning', 'Window Cleaning'],
  Kitchen: ['Dish Washing', 'Kitchen Cleaning', 'Cooking Assistance'],
  PetCare: ['Pet Grooming', 'Pet Sitting', 'Pet Walking'],
  Others: ['Errands', 'Gardening', 'Home Repairs'],
};

// Sample data with service categories and sub-services
const dummyData = 
[
  {
    id: 1,
    name: 'Ironing',

    time: '5',
    image: 'https://soji.us/wp-content/uploads/2022/12/Professional-Laundry-Services.jpg',
    priceRange: 'Rs.3.0 - Rs.16.0',
    category: 'Laundry',
    subCategory: 'Washing',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Deep Cleaning',

    time: '10',
    image: 'https://soji.us/wp-content/uploads/2022/12/Professional-Laundry-Services.jpg',
    priceRange: 'Rs.3.0 - Rs.12.0',
    category: 'Cleaning',
    subCategory: 'Deep Cleaning',
    rating: 4.0,
  },
  {
    id: 3,
    name: 'Dish Washing',

    time: '15',
    image: 'https://soji.us/wp-content/uploads/2022/12/Professional-Laundry-Services.jpg',
    priceRange: 'Rs.5.0 - Rs.20.0',
    category: 'PetCare',
    subCategory: 'Pet Grooming',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Folding',

    time: '20',
    image: 'https://soji.us/wp-content/uploads/2022/12/Professional-Laundry-Services.jpg',
    priceRange: 'Rs.5.0 - Rs.25.0',
    category: 'Kitchen',
    subCategory: 'Dish Washing',
    rating: 4.3,
  },
];

const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const [recent, setRecent] = useState([]);
  const [recentViews, setRecentViews] = useState([]);
  const [filteredData, setFilteredData] = useState(dummyData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredData(dummyData);
    } else {
      const filtered = dummyData.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (!selectedCategory || item.category === selectedCategory) &&
        (!selectedSubCategory || item.subCategory === selectedSubCategory)
      );
      setFilteredData(filtered);
    }
  }, [search, selectedCategory, selectedSubCategory]);

  useEffect(() => {
    let isMounted = true;
    const loadRecentData = async () => {
      const rs = await AsyncStorage.getItem('recentSearchs');
      const rv = await AsyncStorage.getItem('recentView');
      if (isMounted) {
        setRecent(JSON.parse(rs) || []);
        setRecentViews(JSON.parse(rv) || []);
      }
    };
    loadRecentData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearch = async () => {
    if (!search.trim()) return;
    const updated = [search, ...recent.filter(item => item !== search)];
    setRecent(updated);
    await AsyncStorage.setItem('recentSearchs', JSON.stringify(updated));

    const filtered = dummyData.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (!selectedCategory || item.category === selectedCategory) &&
      (!selectedSubCategory || item.subCategory === selectedSubCategory)
    );
    setFilteredData(filtered);
    setSearch('');
  };

  const handleViewStore = async (item) => {
    const updated = [item, ...recentViews.filter(v => v.id !== item.id)];
    setRecentViews(updated);
    await AsyncStorage.setItem('recentView', JSON.stringify(updated));
  };

  const isFavorite = (id) => favorites.some(f => f.id === id);

  const renderStoreCard = (item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleViewStore(item)}
      style={styles.card}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        {/* <Text style={styles.meta}>
          <Icon name="location-on" size={14} /> {item.distance} km
        </Text> */}
        <Text style={styles.meta}>
          <Icon name="access-time" size={14} /> {item.time} mins
        </Text>
        <Text style={styles.price}>{item.priceRange}</Text>
        <Text style={styles.rating}>Rating: {item.rating} ★</Text>
      </View>
      <TouchableOpacity onPress={() => dispatch(toggleFavorite(item))}>
        <Icon
          name={isFavorite(item.id) ? 'bookmark' : 'bookmark-border'}
          size={24}
          color="#4C63E7"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderCategoryFilter = (category) => (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={styles.categoryText}>{category}</Text>
    </TouchableOpacity>
  );

  const renderSubCategoryFilter = (category, subCategory) => (
    <TouchableOpacity
      style={styles.subCategoryButton}
      onPress={() => setSelectedSubCategory(subCategory)}
    >
      <Text style={styles.subCategoryText}>{subCategory}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchRow}>
        <Icon name="arrow-back" size={24} />
        <TextInput 
        placeholderTextColor={"#000"}
          value={search}
          onChangeText={setSearch}
          placeholder="Search services..."
          onSubmitEditing={handleSearch}
          style={styles.input}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Icon name="close" size={20} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        {Object.keys(serviceCategories).map(category =>
          renderCategoryFilter(category)
        )}
      </View>

      {/* Sub-Category Filter based on selected Category */}
      {selectedCategory && (
        <View style={styles.subCategoryContainer}>
          {serviceCategories[selectedCategory].map(subCategory =>
            renderSubCategoryFilter(selectedCategory, subCategory)
          )}
        </View>
      )}

      {/* Search Results */}
      <Text style={styles.heading}>Search Results</Text>
      {filteredData.length === 0 ? (
        <Text style={styles.noResult}>No results found</Text>
      ) : (
        <FlatList
          data={filteredData}
          removeClippedSubviews={false}
          renderItem={({ item }) => renderStoreCard(item)}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {/* Recent Searches */}
      <Text style={styles.heading}>Recent Searches</Text>
      {recent.map((item, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.recentText}>{item}</Text>
          <TouchableOpacity
            onPress={async () => {
              const filtered = recent.filter(r => r !== item);
              setRecent(filtered);
              await AsyncStorage.setItem('recentSearch', JSON.stringify(filtered));
            }}
          >
            <Icon name="close" size={18} />
          </TouchableOpacity>
        </View>
      ))}

      {/* Recently Viewed */}
      <Text style={styles.heading}>Recently Viewed</Text>
      {recentViews.map(item => renderStoreCard(item))}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontFamily: 'Poppins-Regular',
  },
  heading: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    marginBottom: 8,
  },
  noResult: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#E4E4E4',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  subCategoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  subCategoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#E4E4E4',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  subCategoryText: {
    fontSize: 14,
    color: '#333',
  },
  recentText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 1,
    shadowColor: '#ccc',
    alignItems: 'center',
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333',
  },
  meta: {
    fontSize: 12,
    color: '#777',
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
  },
  price: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#4C63E7',
    marginTop: 4,
  },
  rating: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFD700',
    marginTop: 4,
  },
});
