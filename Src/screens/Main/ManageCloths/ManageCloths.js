import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';
import fonts from '../../../utils/fonts';
import Feather from 'react-native-vector-icons/Feather';
import CustomerInput from '../../../components/CustomInput/CustomInputA';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../../Config/Config';


const ManageCloths = ({navigation}) => {
  const [clothsData, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); 
  const [refreshing, setRefreshing] = useState(false);  // Loading state

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(`${Config.API_BASE_URL}/api/orders/delivery/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching delivery orders:', error);
      Alert.alert('Error', 'Failed to fetch delivery orders.');
    } finally {
      setLoading(false);
      setRefreshing(false); // also reset on manual refresh
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const filteredCloths = clothsData
    .flatMap(order => order.cloths)
    .filter(
      (cloth) =>
        cloth.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cloth.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleEditCloth = (id) => {
    // Placeholder for navigation/edit logic
    console.log("Edit cloth with ID:", id);
  };

  const handleAddCloth = () => {
    // Placeholder for adding new cloth
navigation.navigate("Home")
  };

  return (
    <TypeBBackground>
      <View style={{ paddingTop: 50, paddingLeft: 30 }}>
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

        {loading ? (
          <ActivityIndicator size="large" color="#F7941E" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={filteredCloths}
            keyExtractor={(item) => item.id.toString()}
            refreshing={refreshing}           // <-- pulls in refresh state
            onRefresh={handleRefresh} 
            contentContainerStyle={{ paddingBottom: 100, right: 20, marginVertical: 20 }}
            renderItem={({ item }) => (
              <View style={styles.clothCard}>
                <View style={styles.cardContent}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.clothName}>{item.name}</Text>
                    <Text style={styles.clothDetail}>Rs. {item.totalAmount || item.totalPrice}/piece</Text>
                    <Text style={styles.clothDetail}>Under: {item.type}</Text>
                  </View>

                  {/* Separator Line + Edit Icon */}
                  <View style={styles.editSection}>
                    <View style={styles.separator} />
                    <TouchableOpacity onPress={() => handleEditCloth(item.id)} style={styles.iconContainer}>
                      <Image
                        style={{ height: 28, width: 28 }}
                        source={require('../../../../assets/Images/EditIcon.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>

      {/* FAB Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddCloth} // Call the function to add a cloth
      >
       <Image source={require('../../../../assets/Images/FABIcon.png')}/>
      </TouchableOpacity>
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
  editSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    width: 3,
    height: 60,
    backgroundColor: '#F7941E',
    marginRight: 10,
  },
  iconContainer: {
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // FAB Styles
  fab: {
    position: 'absolute',
    bottom: 160,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 1000, // Ensure it's above other components
  },
});
