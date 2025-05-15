import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RecommendedOffersCard = ({ offer, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: offer.image }}
        style={styles.offerImage}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.description}>{offer.description}</Text>
        <View style={styles.footer}>
          <View style={styles.discountContainer}>
            <Icon name="local-offer" size={16} color="#f44336" />
            <Text style={styles.discount}>{offer.discount}% OFF</Text>
          </View>
          <Text style={styles.validity}>
            Valid till: {offer.validity}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecommendedOffersCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  offerImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#f3f3f3',
  },
  details: {
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#666',
    marginVertical: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#f44336',
    marginLeft: 4,
  },
  validity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#888',
  },
});