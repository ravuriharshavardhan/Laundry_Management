import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';
import fonts from '../../../utils/fonts';
import Feather from 'react-native-vector-icons/Feather';
import CustomerInput from '../../../components/CustomInput/CustomInputA';
import axios from 'axios';

const ManageCloths = () => {
  const [clothsData, setClothsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch orders from API
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://192.168.1.6:3000/api/orders/orders');
        setClothsData(response.data); 
      } catch (error) {
        console.error("Error fetching orders:", error);
        Alert.alert('Error', 'Failed to fetch orders. Please try again later.');
      }
    };

    fetchOrders(); // Call the function to fetch orders
  }, []);

  const filteredCloths = clothsData
    .flatMap(order => order.cloths) // Flatten the cloths array from each order
    .filter(
      (cloth) =>
        cloth.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cloth.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <TypeBBackground>
      <View style={{ marginTop: 80, paddingTop: 50, paddingLeft: 30 }}>
        <Text style={styles.title}>Add/Manage Cloth</Text>

        <View style={styles.inputContainer}>
          <Feather name="search" size={18} color="#666" style={styles.icon} />
          <CustomerInput
            backgroundColor={"#E7E7E7"}
            height={40}
            style={styles.textInput}
            placeholder="Search cloths..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filteredCloths}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100, right: 20, marginVertical: 20 }}
          renderItem={({ item }) => (
            <View style={styles.clothCard}>
              <View style={styles.cardContent}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.clothName}>{item.name}</Text>
                  <Text style={styles.clothDetail}>Rs. {item.totalAmount || item.price}/piece</Text>
                  <Text style={styles.clothDetail}>Under: {item.type}</Text>
                </View>
                <TouchableOpacity onPress={() => handleEditCloth(item.id)} style={styles.iconContainer}>
                  <Image style={{ height: 28, width: 28 }} source={require('../../../../assets/Images/EditIcon.png')} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </TypeBBackground>
  );
};

export default ManageCloths;

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.HomeLabel,
    color: "#FFA717",
    width: 340,
    fontSize: 21,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    height: 40,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    right: 40,
  },
  icon: {
    marginRight: 8,
    left: 40,
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    padding: 0,
  },
  clothCard: {
    borderWidth: 1.5,
    borderColor: '#F7941E',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clothName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0077cc',
    marginBottom: 5,
    fontFamily: "VarelaRound-Regular",
  },
  clothDetail: {
    fontSize: 14,
    color: '#0077cc',
    fontFamily: "VarelaRound-Regular",
  },
  iconContainer: {
    backgroundColor: '#F7941E',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
