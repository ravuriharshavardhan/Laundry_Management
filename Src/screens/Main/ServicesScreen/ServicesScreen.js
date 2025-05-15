import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const services = [
  {
    id: '1',
    title: 'Shirt Ironing',
    price: '2.00',
    image: require('../../../../assets/Images/Services/Laundry1.jpg'),
    description: 'Professional shirt ironing to keep you looking crisp and sharp.',
  },
  {
    id: '2',
    title: 'Pants Ironing',
    price: '2.50',
    image: require('../../../../assets/Images/Services/Laundry1.jpg'),
    description: 'Get your pants perfectly pressed and wrinkle-free.',
  },
  {
    id: '3',
    title: 'Dress Ironing',
    price: '3.00',
    image: require('../../../../assets/Images/Services/Laundry1.jpg'),
    description: 'Delicate dress ironing for every occasion.',
  },
  {
    id: '4',
    title: 'Bedding Ironing',
    price: '5.00',
    image: require('../../../../assets/Images/Services/Laundry1.jpg'),
    description: 'Smooth and fresh bedding for a luxurious feel.',
  },
];

const IronServiceCard = ({ service }) => (
  <View style={styles.card}>
    <Image source={service.image} style={styles.image} />
    <View style={styles.content}>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.description}>{service.description}</Text>
      <View style={styles.footer}>
        <View style={styles.priceRow}>
          <Icon name="cash" size={18} color="#28a745" />
          <Text style={styles.price}>Rs. {service.price}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Icon name="cart-plus" size={18} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function IronServicesScreen() {
  return (
    <FlatList
      data={services}
      removeClippedSubviews={false}
      renderItem={({ item }) => <IronServiceCard service={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 170,
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#28a745',
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#007BFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
});
