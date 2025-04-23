import { StyleSheet, Text, View, FlatList, TextInput, Platform } from 'react-native';
import React, { useState, useMemo } from 'react';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';
import fonts from '../../../utils/fonts';
import CustomSearch from '../../../components/CustomInput/CustomSearch';
import { H, W } from '../../../utils/Dimensions';

const itemsData = [
  { name: 'Shirt', rate: 30, discount: 20 },
  { name: 'T-Shirt', rate: 50, discount: 30 },
  { name: 'Ladies Top', rate: 80, discount: 60 },
  { name: 'Trousers', rate: 100, discount: 80 },
  { name: 'Jeans', rate: 120, discount: 100 },
  { name: 'Shirt', rate: 30, discount: 20 },
  { name: 'T-Shirt', rate: 50, discount: 30 },
  { name: 'Ladies Top', rate: 80, discount: 60 },
  { name: 'Trousers', rate: 100, discount: 80 },
  { name: 'Jeans', rate: 120, discount: 100 },
  { name: 'Trousers', rate: 100, discount: 80 },
  { name: 'Jeans', rate: 120, discount: 100 },
  { name: 'Trousers', rate: 100, discount: 80 },
  { name: 'Jeans', rate: 120, discount: 100 },
  { name: 'Trousers', rate: 100, discount: 80 },
  { name: 'Jeans', rate: 120, discount: 100 },
];

const RatelistInfo = () => {
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    return itemsData.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>₹{item.rate}</Text>
      <Text style={styles.itemText}>₹{item.discount}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === 'ios' ? (
        <TypeBBackground>
          <View style={{ marginTop: H(90), alignItems: 'center' }}>
            <CustomSearch
              width={W(340)}
              value={search}
              backgroundColor={"#E7E7E7"}
              onChangeText={setSearch}
            />

            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>Item</Text>
              <Text style={styles.headerText}>Rate</Text>
              <Text style={styles.headerText}>Discount</Text>
            </View>

            <Text style={styles.header}>Daily wear</Text>

            <FlatList
              data={filteredItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 50 }}
              removeClippedSubviews={false}
            />
          </View>
        </TypeBBackground>
      ) : (
        <View style={{ marginTop: H(90), alignItems: 'center' }}>
          <CustomSearch
            width={W(340)}
            value={search}
            backgroundColor={"#E7E7E7"}
            onChangeText={setSearch}
          />

          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Item</Text>
            <Text style={styles.headerText}>Rate</Text>
            <Text style={styles.headerText}>Discount</Text>
          </View>

          <Text style={styles.header}>Daily wear</Text>

          <FlatList
            data={filteredItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 50 }}
            removeClippedSubviews={false}
          />
        </View>
      )}
    </View>
  );
};

export default RatelistInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    color: '#FFA717',
    marginBottom: 20,
    fontFamily: fonts.HomeLabel,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    columnGap: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#FFA717',
    marginVertical: 20,
    width: W(300),
  },
  headerText: {
    fontSize: 16,
    color: '#333',
    width: '33%',
    fontFamily: "trebuc",
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 8,
    borderRadius: 6,
  },
  itemText: {
    width: '33%',
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
});
