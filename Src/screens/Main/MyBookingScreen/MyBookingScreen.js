import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios'; // Importing Axios
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchOrders } from '../../../Apis/fetchOrders'; // Your custom fetch function, or you can replace with axios directly

const Orders = () => {
  const [activeTab, setActiveTab] = useState('Scheduled');
  const [orders, setOrders] = useState([]);

  // Fetch orders when the screen comes into focus using Axios
  useFocusEffect(
    useCallback(() => {
      const fetchAllOrders = async () => {
        try {
          const response = await axios.get('http://192.168.1.3:3000/api/orders/orders');
          console.log(response.data);

          setOrders(response.data); // Assuming the response contains the orders in response.data
        } catch (err) {
          console.error('Error loading orders:', err);
          Alert.alert('Error', err.message); // Displaying error alert
        }
      };

      fetchAllOrders();
    }, [])
  );

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'Scheduled') return order.status === 'Scheduled';
    if (activeTab === 'Cancelled') return order.status === 'Cancelled';
    if (activeTab === 'History') return order.status === 'Delivered' || order.status === 'Completed';
    return false;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>

      <View style={styles.tabContainer}>
        {['Scheduled', 'History', 'Cancelled'].map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.orderList}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, i) => (
            <View key={i} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderTitle}>Order #{order.orderId}</Text>
                <Icon
                  name={
                    order.status === 'Scheduled'
                      ? 'time-outline'
                      : order.status === 'Delivered' || order.status === 'Completed'
                        ? 'checkmark-circle-outline'
                        : 'close-circle-outline'
                  }
                  size={22}
                  color={
                    order.status === 'Scheduled'
                      ? '#FFA717'
                      : order.status === 'Delivered' || order.status === 'Completed'
                        ? 'green'
                        : 'red'
                  }
                />
              </View>

              {/* Address Details */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Address:</Text>
                <Text style={styles.itemText}>
                  {order.address.fullName}, {order.address.streetAddress}, {order.address.city}, {order.address.state}, {order.address.zipCode}, {order.address.country}
                </Text>
                <Text style={styles.itemText}>Phone: {order.address.phoneNumber}</Text>
              </View>

              {/* Pickup and Payment Details */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Pickup Details:</Text>
                <Text style={styles.itemText}>Pickup Date: {new Date(order.pickupDate).toLocaleDateString()}</Text>
                <Text style={styles.itemText}>Pickup Time: {new Date(order.pickupTime).toLocaleTimeString()}</Text>
                <Text style={styles.itemText}>Delivery Type: {order.deliveryType}</Text>
                <Text style={styles.itemText}>Payment Method: {order.paymentMethod}</Text>
              </View>

              {/* Clothing Items */}
              <Text style={styles.sectionTitle}>Clothing Items:</Text>
              {order.cloths.map((item, idx) => (
                <Text key={idx} style={styles.itemText}>
                  - {item.name} x{item.quantity} ({item.CleaningType}) (Rs.{item.price})
                </Text>
              ))}

              {/* Total */}
              <Text style={styles.total}>Total: Rs.{order.total}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No orders found in this tab.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 12,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#888',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#FFA717',
  },
  activeTabText: {
    color: '#FFA717',
    fontWeight: '600',
  },
  orderList: {
    paddingBottom: 80,
  },
  orderCard: {
    backgroundColor: '#fafafa',
    padding: 16,
    borderRadius: 10,
    marginBottom: 14,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    color: '#444',
    marginTop: 8,
  },
  itemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  total: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFA717',
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#aaa',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});
