// screens/OrderListScreen.js
import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import OrderCard from '../components/OrderCard';
import { useNavigation } from '@react-navigation/native';

const sampleOrders = [
  {
    id: 'ORD001',
    date: '2025-05-03',
    time: '12:30 PM',
    payment: 'Cash',
    price: '₹550',
    address: 'Plot 42, Green Street, Mumbai',
    customer: {
      name: 'Aarav Shah',
      number: '+91-9876543210',
      clothes: ['Shirt x2', 'Jeans x1'],
    },
  },
  {
    id: 'ORD002',
    date: '2025-05-02',
    time: '9:45 AM',
    payment: 'UPI',
    price: '₹720',
    address: 'Sector 18, Noida',
    customer: {
      name: 'Meera Nair',
      number: '+91-9876501234',
      clothes: ['Saree x1', 'Kurti x3'],
    },
  },
];

export default function OrderListScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sampleOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={() => navigation.navigate('OrderDetails', { order: item })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});
