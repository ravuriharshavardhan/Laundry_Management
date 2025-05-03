import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import fonts from '../../../utils/fonts';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';
import MainBackGround from '../../../components/BackgroundCard/MainBackGround';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../../Config/Config';
import { logout } from '../../../Redux/Slice/authSlice';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          console.log('❌ No token found');
          return;
        }

        const response = await axios.get(`${Config.API_BASE_URL}/api/Auth/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.data?.fullName && response?.data?.email) {
          setFullName(response.data.fullName);
          setEmail(response.data.email);
          await AsyncStorage.setItem('UserInfo', response.data.fullName);
        }
      } catch (error) {
        console.error('❌ Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      dispatch(logout());
      navigation.replace('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F7941E" />
      </View>
    );
  }

  const Wrapper = Platform.OS === 'ios' ? TypeBBackground : View;

  return (
    <Wrapper>
      <View style={{ marginHorizontal: 30, marginTop: Platform.OS === 'ios' ? 120 : 80 }}>
        <Text
          style={{
            fontFamily: fonts.HomeLabel,
            fontSize: 21,
            textAlign: 'left',
            color: '#F7941E',
            marginBottom: 20,
          }}
        >
          Profile
        </Text>

        {/* Profile Info */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
            style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
          />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{fullName || 'Unnamed User'}</Text>
          <Text style={{ color: 'gray' }}>{email || 'Email not available'}</Text>
        </View>

        {/* Individual Menu Items */}
        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('MyBookings')}>
          <Icon name="bell-outline" size={24} color="#F7941E" style={{ marginRight: 20 }} />
          <Text style={styles.menuLabel}>My Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('2')}>
          <Icon name="credit-card-outline" size={24} color="#F7941E" style={{ marginRight: 20 }} />
          <Text style={styles.menuLabel}>Payments</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('Coupons')}>
          <Icon name="ticket-percent-outline" size={24} color="#F7941E" style={{ marginRight: 20 }} />
          <Text style={styles.menuLabel}>Coupons & Referrals</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('UserComplaint')}>
          <Icon name="message-outline" size={24} color="#F7941E" style={{ marginRight: 20 }} />
          <Text style={styles.menuLabel}>Complaints</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('Support')}>
          <Icon name="help-circle-outline" size={24} color="#F7941E" style={{ marginRight: 20 }} />
          <Text style={styles.menuLabel}>FAQs & Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('AddressManagement')}>
          <Icon name="home-outline" size={24} color="#F7941E" style={{ marginRight: 20 }} />
          <Text style={styles.menuLabel}>Addresses</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate('Login')}>
          <Icon name="logout" size={24} color="#F7941E" style={{ marginRight: 20 }} />
          <Text style={styles.menuLabel}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Wrapper>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#F9F9FB',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  menuLabel: {
    fontSize: 16,
  },
});
