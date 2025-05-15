import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomGradientButton from '../../../components/CustomGradientButton/CustomGradientButton';
import CustomButton from '../../../components/CustomButton/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DriverReportScreen = () => {
  const navigation = useNavigation();

  const deliveryPerson = {
    name: 'Alex Smith',
    phone: '+1 987 654 321',
    image: 'https://via.placeholder.com/100',
  };

  const handleSignOut = () => {
    // Ideally call logout API or Redux reset here too
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Driver Delivery Report</Text>

      {/* Delivery Person Info */}
      <View style={styles.agentCard}>
        <Image source={{ uri: deliveryPerson.image }} style={styles.agentImage} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.agentName}>{deliveryPerson.name}</Text>
          <Text style={styles.agentPhone}>{deliveryPerson.phone}</Text>
        </View>
      </View>

      {/* List of Settings Buttons */}
      <View style={styles.buttonList}>
        <CustomButton
          width="100%"
          height="12%"
          title={
            <View style={styles.buttonWithIcon}>
              <Icon name="account" size={20} color="#333" />
              <Text style={styles.buttonTitle}>Personal Information</Text>
            </View>
          }
          backgroundColor="#fff"
          onPress={() => navigation.navigate('PersonalInfoScreen')}
        />
        <CustomButton
          width="100%"
          height="12%"
          title={
            <View style={styles.buttonWithIcon}>
              <Icon name="truck" size={20} color="#333" />
              <Text style={styles.buttonTitle}>Delivery Preferences</Text>
            </View>
          }
          backgroundColor="#fff"
          onPress={() => navigation.navigate('DeliveryPreferencesScreen')}
        />
        <CustomButton
          width="100%"
          height="12%"
          title={
            <View style={styles.buttonWithIcon}>
              <Icon name="credit-card" size={20} color="#333" />
              <Text style={styles.buttonTitle}>Payment Details</Text>
            </View>
          }
          backgroundColor="#fff"
          onPress={() => navigation.navigate('PaymentDetailsScreen')}
        />
        <CustomButton
          width="100%"
          height="12%"
          title={
            <View style={styles.buttonWithIcon}>
              <Icon name="check-circle" size={20} color="#333" />
              <Text style={styles.buttonTitle}>Identification & Verification</Text>
            </View>
          }
          backgroundColor="#fff"
          onPress={() => navigation.navigate('IDVerificationScreen')}
        />
        <CustomButton
          width="100%"
          height="12%"
          title={
            <View style={styles.buttonWithIcon}>
              <Icon name="file-document" size={20} color="#333" />
              <Text style={styles.buttonTitle}>Support & Documents</Text>
            </View>
          }
          backgroundColor="#fff"
          onPress={() => navigation.navigate('SupportDocumentsScreen')}
        />
        <CustomButton
          width="100%"
          height="12%"
          title={
            <View style={styles.buttonWithIcon}>
              <Icon name="store-settings" size={20} color="#333" />
              <Text style={styles.buttonTitle}>Account Settings</Text>
            </View>
          }
          backgroundColor="#fff"
          onPress={() => navigation.navigate('AccountSettingsScreen')}
        />
      </View>

      {/* Sign Out Button */}
      <View style={styles.signButtonContainer}>
        <CustomGradientButton title="Sign Out" onPress={handleSignOut} />
      </View>
    </ScrollView>
  );
};

export default DriverReportScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
  },
  agentImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  agentPhone: {
    fontSize: 14,
    color: '#555',
  },
  buttonList: {
    gap: 20,
    marginBottom: 30,
  },
  signButtonContainer: {
    marginTop: 40,
  },
  buttonWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonTitle: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});
