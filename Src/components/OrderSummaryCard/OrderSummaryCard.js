import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OrderSummaryCard = ({ order, onPress }) => {
  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Latest Order</Text>
        <View style={[styles.statusBadge, getStatusBadgeStyle(order.status)]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.iconWrapper}>
          <Icon name="calendar-today" size={18} color="#fff" />
        </View>
        <Text style={styles.text}>Pickup: {formatDate(order.pickupDate)}</Text>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.iconWrapper}>
          <Icon name="local-shipping" size={18} color="#fff" />
        </View>
        <Text style={styles.text}>Delivery: {order.deliveryType}</Text>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.iconWrapper}>
          <Icon name="payments" size={18} color="#fff" />
        </View>
        <Text style={styles.text}>Total: ₹{order.total}</Text>
      </View>
    </TouchableOpacity>
  );
};

const getStatusBadgeStyle = (status) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return { backgroundColor: '#c8e6c9' };
    case 'pending':
      return { backgroundColor: '#ffe0b2' };
    case 'cancelled':
      return { backgroundColor: '#ffcdd2' };
    default:
      return { backgroundColor: '#e0e0e0' };
  }
};

export default OrderSummaryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginVertical: 12,
    marginHorizontal: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#333',
    textTransform: 'capitalize',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F49905',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#444',
    flexShrink: 1,
  },
});
