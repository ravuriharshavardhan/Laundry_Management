import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CustomCard = ({
  name,
  clothCount,
  address,
  imageUri,
  avatarWidth = 50,
  avatarHeight = 50,
  cardWidth = '90%' // New prop for container width
}) => {
  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <Image
        source={{ uri: imageUri }}
        style={[
          styles.avatar,
          { width: avatarWidth, height: avatarHeight },
        ]}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subText}>Number of Clothes: {clothCount}</Text>
        <Text style={styles.subText}>{address}</Text>
      </View>
    </View>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    marginVertical: 10,
    alignSelf: 'center', // So width is respected
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  avatar: {
    borderRadius: 12,
    backgroundColor: '#D3D3D3',
  },
  details: {
    marginLeft: 16,
    flexShrink: 1,
  },
  name: {
    fontSize: 16,
    fontFamily:"trebuc",
    color: '#000',
  },
  subText: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
    fontFamily:"trebuc",
  },
});
