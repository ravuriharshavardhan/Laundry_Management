import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const orders = [
  {
    id: '123',
    date: '2025-05-03',
    time: '2:00 PM',
    paymentMethod: 'Credit Card',
    totalPrice: 45,
    address: '1234 Elm Street, City, State, 56789',
    dryCleaningType: 'Standard Clean',
    clothes: [
      { id: 'shirt', name: 'Cotton Shirt', price: 5 },
      { id: 'jeans', name: 'Jeans', price: 6 },
      { id: 'hoodie', name: 'Hoodie', price: 9 },
    ],
    premiumServices: [
      { id: 'p1', title: 'Stain Removal', price: 5 },
      { id: 'p3', title: 'Extra Softening', price: 7 },
    ],
    customer: {
      name: 'John Doe',
      phone: '9876543210',
    },
  },
  {
    id: '124',
    date: '2025-05-02',
    time: '1:00 PM',
    paymentMethod: 'PayPal',
    totalPrice: 72,
    address: '5678 Oak Avenue, City, State, 12345',
    dryCleaningType: 'Luxury Garments',
    clothes: [
      { id: 'suit', name: 'Business Suit', price: 15 },
      { id: 'blouse', name: 'Silk Blouse', price: 8 },
      { id: 'jeans', name: 'Jeans', price: 6 },
    ],
    premiumServices: [
      { id: 'p24', title: 'Anti-Bacterial Treatment', price: 7 },
      { id: 'p27', title: 'Bead & Crystal Care', price: 18 },
    ],
    customer: {
      name: 'Jane Smith',
      phone: '1234567890',
    },
  },
];

const DeliveryOrderScreen = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderText}><Text style={styles.bold}>Order No:</Text> {item.id}</Text>
      <Text style={styles.orderText}><Text style={styles.bold}>Order Date:</Text> {item.date}</Text>
      <Text style={styles.orderText}><Text style={styles.bold}>Order Time:</Text> {item.time}</Text>
      <Text style={styles.orderText}><Text style={styles.bold}>Payment Method:</Text> {item.paymentMethod}</Text>
      <Text style={styles.orderText}><Text style={styles.bold}>Price:</Text> Rs.{item.totalPrice}</Text>
      <Text style={styles.orderText}><Text style={styles.bold}>Address:</Text> {item.address}</Text>

      <TouchableOpacity style={styles.button} onPress={() => setSelectedOrder(item)}>
        <Text style={styles.buttonText}>View Order Details</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOrderDetails = (order) => {
    return (
      <View style={styles.orderDetails}>
        <Text style={styles.detailsHeader}>Order Details</Text>
        <Text style={styles.detailsText}><Text style={styles.bold}>Customer Name:</Text> {order.customer.name}</Text>
        <Text style={styles.detailsText}><Text style={styles.bold}>Customer Phone:</Text> {order.customer.phone}</Text>
        <Text style={styles.detailsText}><Text style={styles.bold}>Dry Cleaning Type:</Text> {order.dryCleaningType}</Text>

        <Text style={styles.detailsText}><Text style={styles.bold}>Clothes List:</Text></Text>
        {order.clothes.map((cloth) => (
          <Text key={cloth.id} style={styles.detailsText}>- {cloth.name} - Rs.{cloth.price}</Text>
        ))}

        <Text style={styles.detailsText}><Text style={styles.bold}>Premium Services:</Text></Text>
        {order.premiumServices.map((service) => (
          <Text key={service.id} style={styles.detailsText}>- {service.title} - Rs.{service.price}</Text>
        ))}

        <Text style={styles.detailsText}><Text style={styles.bold}>Total Bill:</Text> Rs.{order.totalPrice + order.premiumServices.reduce((total, service) => total + service.price, 0)}</Text>

        <TouchableOpacity style={styles.button} onPress={() => setSelectedOrder(null)}>
          <Text style={styles.buttonText}>Close Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Delivery Orders</Text>
      {selectedOrder ? renderOrderDetails(selectedOrder) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
        />
      )}
    </View>
  );
};

export default DeliveryOrderScreen;

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
    fontFamily: 'Poppins-Regular',  // Applying Poppins font
  },
  orderCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    fontFamily: 'Poppins-Regular',  // Applying Poppins font
  },
  orderText: {
    color: '#000',
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',  // Applying Poppins font
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
    fontFamily: 'Poppins-Regular',  // Applying Poppins font
  },
  detailsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F49905',
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',  // Applying Poppins font
  },
  detailsText: {
    color: '#000',
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',  // Applying Poppins font
  },
  orderDetails: {
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Poppins-Regular',  // Applying Poppins font
  },
});


