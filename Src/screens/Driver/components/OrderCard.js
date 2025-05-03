// components/OrderCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function OrderCard({ order, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>Order No: {order.id}</Text>
      <Text style={styles.text}>Date: {order.date} | Time: {order.time}</Text>
      <Text style={styles.text}>Payment: {order.payment} | Price: {order.price}</Text>
      <Text style={styles.text}>Address: {order.address}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {

    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  title: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: '#EAEAEA',
    fontSize: 14,
    marginTop: 4,
  },
});
