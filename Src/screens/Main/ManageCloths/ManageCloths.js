import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCard from '../../../components/CustomCard/CustomCard';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';
import fonts from '../../../utils/fonts';

const DeliveryOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log(token);
        

        const response = await axios.get('http://192.168.1.6:3000/api/orders/delivery/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching delivery orders:', error);
        Alert.alert('Error', 'Failed to fetch delivery orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderItem = ({ item }) => {
    const clothCount = item.cloths?.reduce((acc, cloth) => acc + cloth.pieces, 0);

    return (
      <CustomCard
        rightIcons={[
          {
            component: (
              <Image
                style={{ height: 20, width: 20 }}
                source={require('../../../../assets/Images/CallIcon.png')}
              />
            ),
            onPress: () => Alert.alert(`Call ${item.address}`),
          },
        ]}
        cardWidth="320"
        name={item.orderId}
        clothCount={clothCount}
        address={item.address}
        imageUri="https://i.pravatar.cc/150?img=68"
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#F7941E" />
      </View>
    );
  }

  return (
    <TypeBBackground>
      <View style={{ marginTop: 120 }}>
        <Text style={styles.title}>Delivery Orders</Text>
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </TypeBBackground>
  );
};

export default DeliveryOrdersScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.HomeLabel,
    fontSize: 21,
    textAlign: 'left',
    padding: 25,
    color: '#F7941E',
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: -25,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});
