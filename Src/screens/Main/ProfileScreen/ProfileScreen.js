import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform, // Import Platform module
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux'; // Import useDispatch to handle logout
import fonts from '../../../utils/fonts';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';
import MainBackGround from '../../../components/BackgroundCard/MainBackGround'; // Import MainBackGround
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../../Config/Config';
import { logout } from '../../../Redux/Slice/authSlice';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");  // Correct state initialization
  const [email, setEmail] = useState(""); 
  
  const dispatch = useDispatch();

  // Fetch user profile data using the token
  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken'); 
      
      console.log("Token:", token);

      // Get token FIRST
      if (token) {
        console.log('❌ No token found');
        return; 
      }
  
      const response = await axios.get(`${Config.API_BASE_URL}/api/Auth/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Add token to Authorization header
        },
      });
  
      console.log('✅ Full response data:', response.data);  // Full response
  
      // Set user details if available
      if (response?.data?.fullName && response?.data?.email) {
        setFullName(response.data.fullName);
        setEmail(response.data.email);

        // Store full name in AsyncStorage
        await AsyncStorage.setItem('UserInfo', response.data.fullName);
        console.log("UserInfo stored in AsyncStorage:", response.data.fullName);
      } else {
        console.log('⚠️ User data not available in response');
      }
    } catch (error) {
      console.error('❌ Error fetching profile:', error);
    } finally {
      setLoading(!false);
    }
  };

  const menuItems = [
    { label: 'My Bookings', icon: 'bell-outline', screen: 'MyBookings' },
    { label: 'Payments', icon: 'credit-card-outline', screen: '2' },
    { label: 'Coupons & Referrals', icon: 'ticket-percent-outline', screen: 'Coupons' },
    { label: 'Complaints', icon: 'message-outline', screen: 'UserComplaint' },
    { label: 'FAQs & Contact Us', icon: 'help-circle-outline', screen: 'Support' },
    { label: 'Addresses', icon: 'home-outline', screen: 'AddressManagement' }, // New "Addresses" entry
    // { label: 'Logout', icon: 'logout', screen: 'Login' },
  ];
  

  // useEffect(() => {
  //   fetchUserProfile();  // Fetch user profile when the component mounts
  // }, []);  // Trigger fetch if the token is updated

  const handleNavigation = async (screen) => {
    if (screen === 'Logout') {
      console.log('Logging out...');
  
      try {
        await AsyncStorage.removeItem('userToken'); // Remove stored token
        // dispatch(logout()); // Reset auth state
        navigation.replace('Login'); // Navigate to Login screen
      } catch (error) {
        console.error('Error during logout:', error);
      }
    } else {
      navigation.navigate(screen); // Navigate to the selected screen
    }
  };

  if (!loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F7941E" />
      </View>
    );
  }

  return (
    // Conditionally render background based on platform
    Platform.OS === 'ios' ? (
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
    ) : (
      <>
        <View style={{ marginHorizontal: 0 }}>
          <Text
            style={{
              fontFamily: fonts.HomeLabel,
              fontSize: 21,
              textAlign: 'left',
              color: '#F7941E',
              top: 50,
              paddingLeft: 30,
            }}
          >
            Profile
          </Text>

          <View style={{ marginHorizontal: 30, marginTop: 80 }}>
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
      </>
    )
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
