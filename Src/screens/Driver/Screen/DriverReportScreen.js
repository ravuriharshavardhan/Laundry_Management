import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome icons

const { width } = Dimensions.get('window');

// Dummy performance data
const dummyReport = [
  {
    id: '1',
    date: '2025-05-01',
    deliveries: 12,
    onTime: 10,
    late: 2,
    codCollected: 1340,
  },
  {
    id: '2',
    date: '2025-05-02',
    deliveries: 15,
    onTime: 14,
    late: 1,
    codCollected: 890,
  },
  {
    id: '3',
    date: '2025-05-03',
    deliveries: 8,
    onTime: 6,
    late: 2,
    codCollected: 420,
  },
];

const DriverReportScreen = () => {
  const [report, setReport] = useState(dummyReport);

  const getTotalCOD = () =>
    report.reduce((total, item) => total + item.codCollected, 0);

  const getTotalDeliveries = () =>
    report.reduce((total, item) => total + item.deliveries, 0);

  const handleAutoAssign = () => {
    Alert.alert('Auto-Assign', 'Auto-assignment triggered based on workload');
  };

  const handleManualAssign = () => {
    Alert.alert('Manual Assign', 'Redirect to manual assignment screen');
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Redirect to profile editing screen');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={[styles.date, { fontFamily: 'Poppins-SemiBold' }]}>{item.date}</Text>
      <Text style={{ fontFamily: 'Poppins-Regular' }}>Deliveries: {item.deliveries}</Text>
      <Text style={{ fontFamily: 'Poppins-Regular' }}>On-Time: {item.onTime}</Text>
      <Text style={{ fontFamily: 'Poppins-Regular' }}>Late: {item.late}</Text>
      <Text style={{ fontFamily: 'Poppins-Regular' }}>COD Collected: ₹{item.codCollected}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileDetails}>
          <Text style={[styles.profileName, { fontFamily: 'Poppins-SemiBold' }]}>John Doe</Text>
          <Text style={[styles.profilePhone, { fontFamily: 'Poppins-Regular' }]}>+91 123 456 7890</Text>
        </View>
        <TouchableOpacity onPress={handleEditProfile}>
          <Icon name="edit" size={20} color="#F49905" />
        </TouchableOpacity>
      </View>

      {/* Driver Report */}
      <Text style={[styles.header, { fontFamily: 'Poppins-SemiBold' }]}>Driver Weekly Report</Text>

      <View style={styles.summary}>
        <Text style={[styles.summaryText, { fontFamily: 'Poppins-Regular' }]}>
          Total Deliveries: {getTotalDeliveries()}
        </Text>
        <Text style={[styles.summaryText, { fontFamily: 'Poppins-Regular' }]}>
          Total COD Collected: ₹{getTotalCOD()}
        </Text>
      </View>

      <FlatList
        data={report}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Buttons for Assignment */}
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#F49905' }]}
          onPress={handleManualAssign}
        >
          <Text style={[styles.buttonText, { fontFamily: 'Poppins-SemiBold' }]}>Manual Assign</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#000' }]}
          onPress={handleAutoAssign}
        >
          <Text style={[styles.buttonText, { fontFamily: 'Poppins-SemiBold', color: '#fff' }]}>Auto Assign</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default DriverReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 16,
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  profileDetails: {
    flexDirection: 'column',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilePhone: {
    fontSize: 14,
    color: '#888',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summary: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
    elevation: 2,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  buttonContainer: {
    position: 'absolute',

    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  button: {
    width: (width - 48) / 2,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
