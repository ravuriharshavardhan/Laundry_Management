import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';
import fonts from '../../../utils/fonts';
import CustomSearch from '../../../components/CustomInput/CustomSearch';
import { H, W } from '../../../utils/Dimensions';

const itemsData = [
  { name: 'Shirt', rate: 30, discount: 20, type: 'Normal Press' },
  { name: 'T-Shirt', rate: 50, discount: 30, type: 'Steam Press' },
  { name: 'Ladies Top', rate: 80, discount: 60, type: 'Normal Press' },
  { name: 'Trousers', rate: 100, discount: 80, type: 'Steam Press' },
  { name: 'Jeans', rate: 120, discount: 100, type: 'After Clean' },
];

const RatelistInfo = () => {
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    return itemsData.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Type:</Text>
        <Text style={styles.cardValue}>{item.type}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Rate:</Text>
        <Text style={styles.cardValue}>₹{item.rate}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Discount:</Text>
        <Text style={styles.cardValue}>₹{item.discount}</Text>
      </View>
    </View>
  );

  const renderContent = () => (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header Image */}
      <Image
        source={require('../../../../assets/Icons/Ironbox.png')} // Replace with your image path
        style={styles.banner}
        resizeMode="cover"
      />

      {/* Search */}
      <CustomSearch
        width={W(340)}
        value={search}
        backgroundColor={'#E7E7E7'}
        onChangeText={setSearch}
      />

      {/* Section Headers */}
      <Text style={styles.sectionTitle}>Ironing Services</Text>

      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCard}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );

  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === 'ios' ? (
        <TypeBBackground>{renderContent()}</TypeBBackground>
      ) : (
        renderContent()
      )}
    </View>
  );
};

export default RatelistInfo;

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    paddingTop: H(20),
    paddingBottom: H(40),
  },
  banner: {
    width: W(350),
    height: H(180),
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFA717',
    marginBottom: 15,
    fontFamily: fonts.HomeLabel,
  },
  card: {
    width: W(320),
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardLabel: {
    fontSize: 14,
    color: '#555',
  },
  cardValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});
