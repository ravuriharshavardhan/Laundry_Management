import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing the Material Icons

const OrderTabs = () => {
  const [orderDetails] = useState({
    id: 'ORD1240',
    status: 'In Progress',
    customer: {
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      address: '456 Park Avenue, Andheri West, Mumbai, Pin: 400053',
    },
    pickupLocation: {
      name: 'Sparkle Clean Laundry',
      phone: '+91 98765 12345',
      address: '123 Main Street, Bandra East, Mumbai, Pin: 400051',
    },
    serviceType: 'Delicate Care',
    items: [
      { id: 'silk', name: 'Silk Dress', quantity: 1, price: 12, serviceType: 'Delicate Care' },
      { id: 'lace', name: 'Lace Top', quantity: 2, price: 10, serviceType: 'Delicate Care' },
      { id: 'chiffon', name: 'Chiffon Blouse', quantity: 1, price: 11, serviceType: 'Delicate Care' },
    ],
    premiumServices: [
      { id: 'p11', title: 'Soft Finish', price: 6, description: 'Extra softener for delicate fabrics.' },
      { id: 'p12', title: 'Hand Wash', price: 8, description: 'Gentle hand wash by textile experts.' },
    ],
    payment: {
      method: 'Online Payment',
      subtotal: 43,
      premiumServices: 14,
      deliveryFee: 5,
      total: 62,
      status: 'Paid',
    },
    timeline: [
      { time: '12:30 PM', status: 'Order Placed' },
      { time: '12:45 PM', status: 'Laundry Accepted' },
      { time: '01:15 PM', status: 'Pickup Assigned to You' },
      { time: '01:20 PM', status: 'You Accepted Pickup' },
    ],
    deliveryInstructions: 'Please call when you arrive. The security guard will let you in. Apartment 502.',
    deliveryDate: 'May 7, 2025',
    deliveryTime: '5:00 PM - 7:00 PM',
  });

  const [activeTab, setActiveTab] = useState('accepted'); // Default tab is 'accepted'

  const acceptedOrders = [orderDetails];
  const cancelledOrders = [
    {
      ...orderDetails,
      status: 'Cancelled',
      timeline: [...orderDetails.timeline, { time: '03:00 PM', status: 'Order Cancelled' }],
    },
  ];

  const renderOrderDetails = (orders) => {
    return orders.map((order, index) => (
      <View key={index} style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View style={[styles.statusIndicator, order.status === 'Cancelled' ? styles.pendingIndicator : styles.progressIndicator]} />
          <Text style={styles.orderStatus}>{order.status}</Text>
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.orderTask}>Customer: {order.customer.name}</Text>
          <Text style={styles.orderTask}>Items:</Text>
          {order.items.map((item, idx) => (
            <Text key={idx} style={styles.orderTask}>
              {item.name} - {item.quantity} x ₹{item.price}
            </Text>
          ))}
          <Text style={styles.orderTask}>Total: ₹{order.payment.total}</Text>
        </View>
        <View style={styles.actionBar}>
          {/* New action buttons related to laundry */}
          <TouchableOpacity style={[styles.secondaryButton, styles.detailsButton]}>
            <Icon name="info" size={20} color="#FFFFFF" />
            <Text style={styles.secondaryButtonText}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryButton, styles.requestPickupButton]}>
            <Icon name="local-shipping" size={20} color="#FFFFFF" />
            <Text style={styles.secondaryButtonText}>Request Pickup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryButton, styles.markCompletedButton]}>
            <Icon name="check-circle" size={20} color="#FFFFFF" />
            <Text style={styles.secondaryButtonText}>Mark as Completed</Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order Management</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'accepted' && styles.activeTab]}
          onPress={() => setActiveTab('accepted')}
        >
          <Text style={[styles.tabText, activeTab === 'accepted' && styles.activeTabText]}>Accepted Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'cancelled' && styles.activeTab]}
          onPress={() => setActiveTab('cancelled')}
        >
          <Text style={[styles.tabText, activeTab === 'cancelled' && styles.activeTabText]}>Cancelled Orders</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.ordersList}>
        {activeTab === 'accepted'
          ? renderOrderDetails(acceptedOrders)
          : renderOrderDetails(cancelledOrders)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },

  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#FF9800', // Pink to make it stand out
  },
  tabText: {
    fontSize: 16,
    color: '#424242',
    fontFamily: 'Poppins-SemiBold',
  },
  activeTabText: {
    color: '#ffffff',
  },
  ordersList: {
    flex: 1,
    marginBottom: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  pendingIndicator: {
    backgroundColor: '#FF4081', // Pink for pending orders
  },
  progressIndicator: {
    backgroundColor: '#4CAF50', // Green for active orders
  },
  orderStatus: {
    fontSize: 18,
    fontWeight: '600',
    color: '#424242',
    fontFamily: 'Poppins-SemiBold',
  },
  orderDetails: { marginBottom: 16 },
  orderTask: {
    fontSize: 14,
    fontWeight: '500',
    color: '#616161',
    marginBottom: 6,
    fontFamily: 'Poppins-Regular',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '30%',
    justifyContent: 'center',  // Centering the text and icon
  },
  detailsButton: {
    backgroundColor: '#3F51B5', // Blue for details
  },
  // requestPickupButton: {
  //   backgroundColor: '#FF9800', // Orange for request pickup
  // },
  markCompletedButton: {
    backgroundColor: '#4CAF50', // Green for completed
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 7,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',

  },
});

export default OrderTabs;
