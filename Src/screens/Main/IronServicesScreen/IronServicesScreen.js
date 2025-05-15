import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const services = [
  {
    id: '1',
    title: 'Shirt Ironing',
    price: 'Rs.2.00',
    image: require('../../../../assets/Images/Services/Laundry1.jpg'),
    description: 'Professional shirt ironing to keep you looking crisp and sharp.',
  },
  {
    id: '2',
    title: 'Pants Ironing',
    price: 'Rs.2.50',
    image: require('../../../../assets/Images/Services/Laundry1.jpg'),
    description: 'Get your pants perfectly pressed and wrinkle-free.',
  },
  {
    id: '3',
    title: 'Dress Ironing',
    price: 'Rs.3.00',
    image: require('../../../../assets/Images/Services/Laundry1.jpg'),
    description: 'Delicate dress ironing for every occasion.',
  },
  {
    id: '4',
    title: 'Bedding Ironing',
    price: 'Rs.5.00',
    image: require('../../../../assets/Images/Services/Laundry1.jpg'),
    description: 'Smooth and fresh bedding for a luxurious feel.',
  },
];

const IronServiceCard = ({ service }) => (
  <View style={styles.card}>
    <Image source={service.image} style={styles.image} resizeMode="cover" />
    <View style={styles.content}>
      <View style={styles.titleRow}>
        <Icon name="local-laundry-service" size={20} color="#007BFF" />
        <Text style={styles.title}>{service.title}</Text>
      </View>
      <Text style={styles.description}>{service.description}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          <Icon name="attach-money" size={18} color="green" />{service.price}
        </Text>
        <TouchableOpacity style={styles.button}>
          <Icon name="add-shopping-cart" size={16} color="#fff" />
          <Text style={styles.buttonText}>  Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function IronServicesScreen() {
  return (
    <FlatList
      data={services}
      renderItem={({ item }) => <IronServiceCard service={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 6,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  button: {
    backgroundColor: '#007BFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
});
