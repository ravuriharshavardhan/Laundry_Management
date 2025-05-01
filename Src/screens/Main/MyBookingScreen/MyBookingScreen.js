import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('Scheduled');
  const [orders, setOrders] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        try {
          const data = await AsyncStorage.getItem('orders');
          const allOrders = data ? JSON.parse(data) : [];
          setOrders(allOrders);
        } catch (err) {
          console.error('Error loading orders:', err);
        }
      };
      fetchOrders();
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
              <Text style={styles.statusText}>Status: {order.status}</Text>
              <Text style={styles.sectionTitle}>Service: {order.serviceType}</Text>

              <Text style={styles.sectionTitle}>Clothing Items</Text>
              {order.cloths.map((item, idx) => (
                <Text key={idx} style={styles.itemText}>
                  - {item.name} x{item.quantity} (Rs.{item.price})
                </Text>
              ))}

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
  statusText: {
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
    marginBottom: 8,
    color: '#666',
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    marginTop: 8,
    color: '#444',
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
