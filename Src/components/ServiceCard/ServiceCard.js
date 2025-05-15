import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ServiceCard = ({ title, description, buttons, price, backgroundColor, image, onPress }) => {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor }]} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.buttonContainer}>
        {buttons.map((btn, idx) => (
          <View key={idx} style={styles.button}>
            <Text style={styles.buttonText}>{btn}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.price}>Price per item from Rs.{price}</Text>
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
    card: {
      marginHorizontal: 20,
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      backgroundColor: '#fff', // default in case backgroundColor not passed
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    image: {
      width: 60,
      height: 60,
      marginBottom: 12,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 18,
      fontFamily: 'Poppins-SemiBold',
      color: '#333',
      marginBottom: 6,
    },
    description: {
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
      color: '#666',
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#fff',
      borderRadius: 15,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginRight: 8,
      marginBottom: 6,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    buttonText: {
      fontSize: 12,
      fontFamily: 'Poppins-Regular',
      color: '#333',
    },
    price: {
      fontSize: 14,
      fontFamily: 'Poppins-SemiBold',
      color: '#222',
      marginTop: 6,
    },
  });
  