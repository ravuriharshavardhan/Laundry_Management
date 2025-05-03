import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function OrderDetails({ route }) {
  const { order } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Order No: {order.id}</Text>
      <Text style={styles.label}>Customer: {order.customer.name}</Text>
      <Text style={styles.label}>Phone: {order.customer.number}</Text>
      <Text style={styles.label}>Date: {order.date} at {order.time}</Text>
      <Text style={styles.label}>Payment: {order.payment}</Text>
      <Text style={styles.label}>Price: {order.price}</Text>
      <Text style={styles.label}>Address: {order.address}</Text>
      <Text style={styles.label}>Clothes:</Text>
      {order.customer.clothes.map((item, index) => (
        <Text key={index} style={styles.clothItem}>• {item}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A', padding: 16 },
  heading: { fontSize: 20, color: '#FFD700', fontWeight: 'bold', marginBottom: 10 },
  label: { color: '#fff', marginTop: 8, fontSize: 16 },
  clothItem: { color: '#ccc', marginLeft: 10, marginTop: 4 },
});
