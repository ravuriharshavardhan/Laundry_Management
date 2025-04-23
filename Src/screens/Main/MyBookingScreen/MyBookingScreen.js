import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomCard from '../../../components/CustomCard/CustomCard';
import fonts from '../../../utils/fonts';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';
import Config from '../../../Config/Config';

const MyBookingScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState(''); // Store fullName from AsyncStorage

  const address = useSelector(state => state.order.address);
  const pickupDate = useSelector(state => state.order.pickupDate);
  const pickupTime = useSelector(state => state.order.pickupTime);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem('UserInfo');
        if (storedUserInfo) {
          // Check if storedUserInfo is JSON or plain string
          const parsedUserInfo = storedUserInfo.startsWith('{') ? JSON.parse(storedUserInfo) : storedUserInfo;
          setFullName(parsedUserInfo.fullName || parsedUserInfo); // Handle both JSON and plain string
        }
      } catch (error) {
        console.error('❌ Error retrieving fullName from AsyncStorage:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${Config.API_BASE_URL}/api/orders/orders`);
        console.log('✅ Orders fetched from API:', JSON.stringify(response.data, null, 2));
        setOrders(response.data);
      } catch (error) {
        console.error('❌ Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F7941E" />
      </View>
    );
  }

  const renderItem = ({ item, index }) => (
    <CustomCard
      key={item._id} // Stable key
      name={fullName || item.names || 'Laundry Order'}
      clothCount={item.clothCount || item.cloths?.reduce((acc, c) => acc + c.pieces, 0) || 0}
      address={item.address || address}
      imageUri={`https://i.pravatar.cc/150?img=${47 + index}`}
      extraInfo={`💰 ${item.price || 0} ₹  •  🧼 ${item.type || '-'}  •  ⚖️ ${item.weight || '-'}kg\n📅 ${item.pickupDate || pickupDate}  •  🕒 ${item.pickupTime || pickupTime}`}
    />
  );

  return (
    <TypeBBackground>
      <View style={{ marginTop: 90 }}>
        <Text style={styles.headerText}>My Orders</Text>

        <FlatList
          data={orders}
          keyExtractor={(item) => item._id || index.toString()} // Ensure unique key
          renderItem={renderItem}
          contentContainerStyle={styles.cardContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>No orders found</Text>}
        />
      </View>
    </TypeBBackground>
  );
};

export default MyBookingScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: fonts.HomeLabel,
    fontSize: 21,
    textAlign: 'left',
    padding: 25,
    color: '#F7941E',
  },
  cardContainer: {
    alignItems: 'center',
    rowGap: 10,
    paddingBottom: 40,
  },
  emptyText: {
    marginTop: 50,
    fontSize: 16,
    color: '#999',
    fontFamily: fonts.HomeLabel,
  },
});