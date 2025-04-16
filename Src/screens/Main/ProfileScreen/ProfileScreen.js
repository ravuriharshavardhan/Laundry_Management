import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CurvedCard from '../../../components/CurvedCard/CurvedCard';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import fonts from '../../../utils/fonts';

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#F7941E', '#F7941E']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    >
      <View style={{ height: 56 }} />

      <View
        style={{
          marginTop: 200,
          flex: 1,
          elevation: 28,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 20,

        }}
      >
        <CurvedCard
          height={780}
          borderRadius={40}
          curve1={{ c1: 40, c2: 400 }}
          curve2={{ c1: 50, c2: -1600 }}
          anchor1={-20}
          anchor2={1}
          viewBoxY={30}
          viewBoxX={-15}
          curveStrokeWidth={6}
        >

          <View style={{ marginHorizontal: 30 }}>
            <Text
              style={{
                fontFamily: fonts.HomeLabel,

                fontSize: 21,
                textAlign: 'left',
                padding: 25,
                color: '#F7941E',
              }}
            >
              Profile
            </Text>

            <View style={{ marginHorizontal: 30 }}>


  {/* User Info Section */}
  <View style={{ alignItems: 'center', marginBottom: 20 }}>
    <Image
      source={{ uri: 'https://your-image-url-or-local-path.com' }} // Replace with dynamic or static image
      style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
      }}
    />
    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>David J</Text>
    <Text style={{ color: 'gray' }}>+91 9876789054</Text>
  </View>

  {/* Menu Items */}
  {[
    { label: 'My Bookings', icon: 'bell-outline' },
    { label: 'Payments', icon: 'credit-card-outline' },
    { label: 'Coupons & Referrals', icon: 'ticket-percent-outline' },
    { label: 'Complaints', icon: 'message-outline' },
    { label: 'FAQs & Contact Us', icon: 'help-circle-outline' },
    { label: 'Logout', icon: 'logout' },
  ].map((item, index) => (
    <TouchableOpacity
      key={index}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: index < 5 ? 1 : 0,
        borderBottomColor: '#eee',
      }}
      onPress={() => {
        // You can use navigation here for each route
        console.log(`${item.label} pressed`);
      }}
    >
      <Icon name={item.icon} size={24} color="#F7941E" style={{ marginRight: 20 }} />
      <Text style={{ fontSize: 16 }}>{item.label}</Text>
    </TouchableOpacity>
  ))}
</View>

            
          </View>



        </CurvedCard>
      </View>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderBottomWidth: 2,
    borderColor: '#F7A917',
    paddingHorizontal: 8,
    width: 290,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    left: 11

  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
    borderColor: "#fff"
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
    borderColor: "#fff"
  },
  dropdownContainer: {
    backgroundColor: '#F7941E', 
    borderRadius: 8,
  },
});
