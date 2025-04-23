import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';  // Import useSelector to access Redux state

import fonts from '../../../utils/fonts';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';
import axios from 'axios';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");  // Correct state initialization
  const [email, setEmail] = useState("");        // Correct state initialization

  const token = useSelector((state) => state.auth.token);  // Access token from Redux store

  // Fetch user profile data using the token
  const fetchUserProfile = async () => {
    try {
      if (!token) {
        console.log('No token found');
        return;  // Handle case where no token is found
      }

      const response = await axios.get('http://192.168.1.6:3000/api/Auth/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,  // Adding Bearer token to the request header
        },
      });

      console.log('Full response data:', response.data);  // Log the full response for debugging

      // Check if the response contains user data
      if (response?.data?.fullName && response?.data?.email) {
        setFullName(response.data.fullName);  // Set full name from response
        setEmail(response.data.email);        // Set email from response
      } else {
        console.log('User data not available');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);  // Log any error encountered
    } finally {
      setLoading(false);  // Set loading to false once the request is done
    }
  };

  const menuItems = [
    { label: 'My Bookings', icon: 'bell-outline', screen: 'MyBookings' },
    { label: 'Payments', icon: 'credit-card-outline', screen: 'Payments' },
    { label: 'Coupons & Referrals', icon: 'ticket-percent-outline', screen: 'Coupons' },
    { label: 'Complaints', icon: 'message-outline', screen: 'UserComplaint' },
    { label: 'FAQs & Contact Us', icon: 'help-circle-outline', screen: 'Support' },
    { label: 'Logout', icon: 'logout', screen: 'Logout' },
  ];

  
  useEffect(() => {
    fetchUserProfile();  // Fetch user profile when the component mounts
  }, [token]);  // Trigger fetch if the token is updated

  const handleNavigation = (screen) => {
    if (screen === 'Logout') {
      console.log('Logging out...');
      // Handle logout functionality here
    } else {
      navigation.navigate(screen); // Navigate to the selected screen
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F7941E" />
      </View>
    );
  }

  return (
    <TypeBBackground>
      <View style={{ marginHorizontal: 0 }}>
        <Text
          style={{
            fontFamily: fonts.HomeLabel,
            fontSize: 21,
            textAlign: 'left',
            color: '#F7941E',
            top: 100,
            paddingLeft: 30,
          }}
        >
          Profile
        </Text>

        <View style={{ marginHorizontal: 30, marginTop: 120 }}>
          {/* User Info Section */}
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Image
              source={{
                uri: 'https://i.pravatar.cc/150?img=47', // Placeholder profile image
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginBottom: 10,
              }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {fullName || 'Unnamed User'} {/* Display fullName correctly */}
            </Text>
            <Text style={{ color: 'gray' }}>
              {email || 'Email not available'} {/* Display email correctly */}
            </Text>
          </View>

          {/* Menu items */}
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleNavigation(item.screen)}
            >
              <Icon
                name={item.icon}
                size={24}
                color="#F7941E"
                style={{ marginRight: 20 }}
              />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </TypeBBackground>
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
  },
  menuLabel: {
    fontSize: 16,
  },
});
