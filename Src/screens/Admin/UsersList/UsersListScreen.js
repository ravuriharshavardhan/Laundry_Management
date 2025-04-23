import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCard from '../../../components/CustomCard/CustomCard';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';
import fonts from '../../../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Redux/Slice/authSlice';

const DeliveryOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log('🔐 Retrieved Token:', token);

        if (!token) {
          console.warn('⚠️ No token found in AsyncStorage');
          Alert.alert('Authentication Error', 'User token not found. Please log in again.');
          setLoading(false);
          return;
        }

        const url = 'http://192.168.1.6:3000/api/orders/delivery/orders';
        console.log('🌐 Fetching orders from:', url);

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('📦 Orders API Response:', JSON.stringify(response.data, null, 2));

        if (!Array.isArray(response.data)) {
          throw new Error('Invalid orders response format');
        }

        setOrders(response.data);
      } catch (error) {
        console.error('❌ Error fetching delivery orders:', error);

        if (error.response && error.response.status === 401) {
          Alert.alert('Unauthorized', 'Your session has expired. Please log in again.');
        } else {
          Alert.alert('Error', 'Failed to fetch delivery orders.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderItem = ({ item, index }) => {
    const clothCount = item.cloths?.reduce((acc, cloth) => acc + cloth.pieces, 0);

    console.log(`📦 Rendering order item at index ${index}:`, item);

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

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      dispatch(logout());
      navigation.replace('Login');
    } catch (error) {
      console.error('🔒 SignOut Error:', error);
      Alert.alert('Error', 'Something went wrong during sign out.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#F7941E" />
      </View>
    );
  }

  console.log('📋 Final orders array:', orders);

  return (
    <TypeBBackground>
      <View style={{ marginTop: 120 }}>
        <Text style={styles.title}>Delivery Orders</Text>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <FlatList
          data={orders}
          keyExtractor={(item, index) => item._id?.toString() || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          initialNumToRender={5}
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
  signOutButton: {
    backgroundColor: '#F7941E',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 150,
  },
  signOutText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: fonts.HomeLabel,
    textAlign: 'center',
  },
});
