import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import CustomCard from '../../../components/CustomCard/CustomCard';
import fonts from '../../../utils/fonts';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';

const MyBookingScreen = () => {
  const [orders, setOrders] = useState([]);  // State to store orders
  const [loading, setLoading] = useState(true);  // Loading state to show activity indicator
  const address = useSelector(state => state.order.address);
  const pickupDate = useSelector(state => state.order.pickupDate);
  const pickupTime = useSelector(state => state.order.pickupTime);

  // Fetch orders from the backend API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://192.168.1.6:3000/api/orders/orders');
        setOrders(response.data);  // Set orders data
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);  // Hide loading indicator
      }
    };

    fetchOrders();
  }, []);  // Empty dependency array to run the effect only once on mount

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F7941E" />
      </View>
    );
  }

  return (
    <TypeBBackground>
      <View style={{ marginTop: 90 }}>
        <Text style={styles.headerText}>My Orders</Text>

        <ScrollView contentContainerStyle={styles.cardContainer}>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <CustomCard
                key={order._id}  // Use order ID as the unique key
                name={order.clothName}  // Assuming "clothName" is part of the order data
                clothCount={order.clothCount}  // Assuming cloth count is part of order data
                address={order.address || address}  // Display the order's address, fallback to state
                imageUri={`https://i.pravatar.cc/150?img=${47 + index}`}  // Placeholder image URI
                extraInfo={`💰 ${order.price} ₹  •  🧼 ${order.type}  •  ⚖️ ${order.weight}kg\n📅 ${pickupDate}  •  🕒 ${pickupTime}`}  // Example extra info
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No orders found</Text>
          )}
        </ScrollView>
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
    justifyContent: 'center',
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
