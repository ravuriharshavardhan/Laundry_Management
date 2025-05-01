import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OrderSummaryScreen = ({ route }) => {
  const order = route.params?.order;

  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const formatTime = (isoTime) =>
    new Date(isoTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Order Summary</Text>

      {/* Address */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pickup Address</Text>
        <Text style={styles.text}>{order.address.fullName}</Text>
        <Text style={styles.text}>{order.address.phoneNumber}</Text>
        <Text style={styles.text}>{order.address.streetAddress}</Text>
        <Text style={styles.text}>
          {order.address.city}, {order.address.state} - {order.address.zipCode}
        </Text>
        <Text style={styles.text}>{order.address.country}</Text>
      </View>

      {/* Pickup Date & Time */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pickup Details</Text>
        <Text style={styles.text}>
          <Icon name="calendar-today" size={16} /> {formatDate(order.pickupDate)}
        </Text>
        <Text style={styles.text}>
          <Icon name="access-time" size={16} /> {formatTime(order.pickupTime)}
        </Text>
      </View>

      {/* Delivery & Payment */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Preferences</Text>
        <Text style={styles.text}>Delivery Type: {order.deliveryType}</Text>
        <Text style={styles.text}>Payment Method: {order.paymentMethod}</Text>
      </View>

      {/* Cloth Items */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Clothing Items</Text>
        {order.cloths.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.text}>{item.name} x {item.quantity}</Text>
            <Text style={styles.text}>Rs.{item.price}</Text>
          </View>
        ))}
      </View>

      {/* Total */}
      <View style={[styles.card, styles.totalCard]}>
        <Text style={styles.totalText}>Total: Rs.{order.total}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f6f7fb',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 2,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalCard: {
    backgroundColor: '#e9f5ee',
    borderWidth: 1,
    borderColor: '#b4e1cd',
  },
  totalText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#2e7d32',
    textAlign: 'right',
  },
});

export default OrderSummaryScreen;
