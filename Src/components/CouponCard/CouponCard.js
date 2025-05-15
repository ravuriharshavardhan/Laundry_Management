import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CouponCard = ({ icon, title, description, keyword, buttonText, image }) => {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={styles.titleRow}>
          <Image source={icon} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.description}>
          Enjoy 10% off <Text style={styles.highlight}>{keyword}</Text> service!
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
      <Image source={image} style={styles.personImage} resizeMode="contain" />
    </View>
  );
};

export default CouponCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFD6F1', // Light pink
    flexDirection: 'row',
    borderRadius: 20,
    padding: 16,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  left: {
    flex: 1,
    marginRight: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    marginBottom: 10,
  },
  highlight: {
    backgroundColor: '#4DB7FE',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#F2E9F8',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 14,
    color: '#444',
    fontFamily: 'Poppins-SemiBold',
  },
  personImage: {
    width: 90,
    height: 90,
  },
});
