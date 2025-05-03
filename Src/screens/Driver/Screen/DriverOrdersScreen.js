import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const laundryOrders = [
  { id: '1', customer: 'John Doe', orderStatus: 'Pickup Scheduled', pickupTime: '2:00 PM', items: 5 },
  { id: '2', customer: 'Jane Smith', orderStatus: 'In Progress', pickupTime: '10:30 AM', items: 3 },
  { id: '3', customer: 'Michael Johnson', orderStatus: 'Delivered', pickupTime: '1:00 PM', items: 2 },
  { id: '4', customer: 'Sara Lee', orderStatus: 'Pending', pickupTime: '4:00 PM', items: 7 },
];

const DriverOrdersScreen = () => {
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderText}><Text style={styles.bold}>Order ID:</Text> {item.id}</Text>
      <Text style={styles.orderText}><Text style={styles.bold}>Customer:</Text> {item.customer}</Text>
      <Text style={styles.orderText}><Text style={styles.bold}>Status:</Text> {item.orderStatus}</Text>
      <Text style={styles.orderText}><Text style={styles.bold}>Pickup Time:</Text> {item.pickupTime}</Text>
      <Text style={styles.orderText}><Text style={styles.bold}>Items:</Text> {item.items}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Laundry Orders</Text>
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        data={laundryOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
      />
    </View>
  );
};

export default DriverOrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F49905',
    marginBottom: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  orderText: {
    color: '#000',
    fontSize: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#F49905',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#121212',
    fontWeight: 'bold',
  },
});
