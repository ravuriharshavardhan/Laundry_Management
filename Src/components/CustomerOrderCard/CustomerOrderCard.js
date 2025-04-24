import React from 'react';
import {
  View,
  Text,
  StyleSheet,

  TouchableOpacity,
  Pressable,
} from 'react-native';

const CustomerOrderCard = ({
  name,
  clothCount,
  address,
  imageUri,
  status,
  onPress,
  avatarWidth = 50,
  avatarHeight = 50,
  cardWidth = '90%',
  rightIcons = [] // Array of icons to render on the right
}) => {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return { backgroundColor: '#f0ad4e' }; // Orange
      case 'picked':
        return { backgroundColor: '#0275d8' }; // Blue
      case 'washed':
        return { backgroundColor: '#5bc0de' }; // Light blue
      case 'delivered':
        return { backgroundColor: '#5cb85c' }; // Green
      case 'cancelled':
        return { backgroundColor: '#d9534f' }; // Red
      default:
        return { backgroundColor: '#6c757d' }; // Gray
    }
  };

  return (
    <Pressable onPress={onPress} style={[styles.card, { width: cardWidth }]}>
     
    
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subText}>Number of Clothes: {clothCount}</Text>
        <Text style={styles.subText}>{address}</Text>

        {status && (
          <View style={[styles.statusBadge, getStatusStyle(status)]}>
            <Text style={styles.statusText}>{status.toUpperCase()}</Text>
          </View>
        )}
      </View>

      <View style={styles.iconWrapper}>
        {rightIcons.map((icon, index) => (
          <TouchableOpacity key={index} onPress={icon.onPress} style={styles.iconButton}>
            {icon.component}
          </TouchableOpacity>
        ))}
      </View>
    </Pressable>
  );
};

export default CustomerOrderCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    marginVertical: 10,
    alignSelf: 'center',
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
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'trebuc',
    color: '#000',
  },
  subText: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
    fontFamily: 'trebuc',
  },
  statusBadge: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  iconWrapper: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    paddingHorizontal: 6,
  },
});
