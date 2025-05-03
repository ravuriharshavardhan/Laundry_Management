import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const DashboardScreen = () => {
  // Dummy Data
  const deliveryData = {
    totalDeliveries: 150,
    completed: 120,
    pending: 20,
    delayed: 10,
    failed: 5,
    urgent: 3,
  };

  const driverActivities = [
    { id: 1, name: 'John Doe', completed: 30, ongoing: 5, idle: 0 },
    { id: 2, name: 'Jane Smith', completed: 25, ongoing: 3, idle: 2 },
    { id: 3, name: 'Mike Taylor', completed: 40, ongoing: 0, idle: 0 },
  ];

  const renderDriverItem = ({ item }) => (
    <TouchableOpacity style={styles.driverCard}>
      <Text style={styles.driverName}>{item.name}</Text>
      <Text>Completed: {item.completed}</Text>
      <Text>Ongoing: {item.ongoing}</Text>
      <Text>Idle: {item.idle}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Delivery Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>Total Deliveries Today: {deliveryData.totalDeliveries}</Text>
      </View>

      {/* Delivery Status */}
      <View style={styles.statusContainer}>
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Completed</Text>
          <Text style={styles.statusCount}>{deliveryData.completed}</Text>
        </View>
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Pending</Text>
          <Text style={styles.statusCount}>{deliveryData.pending}</Text>
        </View>
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Delayed</Text>
          <Text style={styles.statusCount}>{deliveryData.delayed}</Text>
        </View>
      </View>

      {/* Quick Alerts */}
      <View style={styles.alertContainer}>
        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>Failed Deliveries</Text>
          <Text style={styles.alertCount}>{deliveryData.failed}</Text>
        </View>
        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>Urgent Orders</Text>
          <Text style={styles.alertCount}>{deliveryData.urgent}</Text>
        </View>
      </View>

      {/* Driver Activities */}
      <Text style={styles.sectionTitle}>Driver Activities</Text>
      <FlatList
        data={driverActivities}
        renderItem={renderDriverItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  summaryCard: {
    backgroundColor: '#6200ea',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  summaryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusCard: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ea',
    marginTop: 8,
  },
  alertContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  alertCard: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  alertCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  driverCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
    elevation: 2,
    minWidth: 150,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default DashboardScreen;