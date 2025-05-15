import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import ServiceCard from '../../../components/ServiceCard/ServiceCard';
import CustomSearch from '../../../components/CustomInput/CustomSearch';

const servicesData = [
  {
    title: 'Wash',
    description: 'For everyday bedsheets, laundry, and towels.',
    buttons: ['WASH', 'TUMBLE-DRY', 'IN A BAG'],
    price: '1.95',
    backgroundColor: '#FFEFB3',
    image: require('../../../../assets/Icons/DryCleaning.png'),
    screen: 'IronServicesScreen',
  },
  {
    title: 'Ironing',
    description: 'For items that are already clean.',
    buttons: ['IRONING', 'ON HANGERS', 'IN A BAG'],
    price: '1.95',
    backgroundColor: '#F5F5F5',
    image: require('../../../../assets/Icons/Ironbox.png'),
    screen: 'IronServicesScreen',
  },
  {
    title: 'Dry Clean',
    description: 'Delicate fabrics and formalwear care.',
    buttons: ['DRY CLEAN', 'NO STARCH', 'INDIVIDUAL'],
    price: '3.50',
    backgroundColor: '#E0F7FA',
    image: require('../../../../assets/Icons/DryCleaning.png'),
    screen: 'IronServicesScreen',
  },
  {
    title: 'Shoe Cleaning',
    description: 'Deep cleaning for all types of shoes.',
    buttons: ['WASH', 'POLISH', 'DEODORIZE'],
    price: '4.00',
    backgroundColor: '#F0E4FF',
    image: require('../../../../assets/Icons/shoes.png'),
    screen: 'IronServicesScreen',
  },
];

const getAllTags = (data) => {
  const tagSet = new Set();
  data.forEach(item => item.buttons.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet);
};

const ServiceListScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  const tags = useMemo(() => getAllTags(servicesData), []);

  const handleServicePress = (service) => {
    if (service.screen) {
      navigation.navigate(service.screen);
    } else {
      alert(`No screen defined for ${service.title}`);
    }
  };

  const filteredServices = useMemo(() => {
    return servicesData.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(search.toLowerCase());
      const matchesTag = selectedTag ? service.buttons.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [search, selectedTag]);

  const renderTagFilters = () => (
    <View style={styles.tagsContainer}>
      {tags.map((tag, idx) => (
        <TouchableOpacity
          key={idx}
          style={[styles.tagButton, selectedTag === tag && styles.activeTagButton]}
          onPress={() => setSelectedTag(tag === selectedTag ? null : tag)}
        >
          <Text style={[styles.tagText, selectedTag === tag && styles.activeTagText]}>
            {tag}
          </Text>
        </TouchableOpacity>
      ))}
      {selectedTag && (
        <TouchableOpacity
          style={[styles.tagButton, styles.clearTag]}
          onPress={() => setSelectedTag(null)}
        >
          <Text style={styles.clearTagText}>Clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filteredServices}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View>
            <View style={styles.searchWrapper}>
              <CustomSearch
                width={'95%'}
                backgroundColor="#fff"
                placeholder="Search services..."
                placeholderTextColor="#999"
                value={search}
                onChangeText={setSearch}
              />
            </View>
            {renderTagFilters()}
          </View>
        }
        renderItem={({ item }) => (
          <ServiceCard {...item} onPress={() => handleServicePress(item)} />
        )}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ServiceListScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 50,
  },
  searchWrapper: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tagButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ddd',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  activeTagButton: {
    backgroundColor: '#FFA717',
  },
  tagText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#333',
  },
  activeTagText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  clearTag: {
    backgroundColor: '#ff4d4d',
  },
  clearTagText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
});
