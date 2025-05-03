import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const todayStats = {
  total: 15,
  completed: 10,
  pending: 3,
  delayed: 2,
  earnings: '1250',
  distance: '120 km',
  avgDeliveryTime: '30 min',
};

const alerts = [
  { id: '1', type: 'urgent', message: 'Urgent: Pickup #ORD1234 now!' },
  { id: '2', type: 'failed', message: 'Failed Delivery: #ORD1221' },
];

const activities = [
  { id: '1', time: '9:00 AM', action: 'Picked up #ORD1234' },
  { id: '2', time: '10:15 AM', action: 'Delivered #ORD1212' },
  { id: '3', time: '11:30 AM', action: 'Marked #ORD1221 as failed' },
];

const weather = {
  condition: 'Clear',
  temperature: '28°C',
};

const DriverDashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Welcome, Driver</Text>

        {/* Stats */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Today's Overview</Text>
          <View style={styles.statsRow}>
            <StatItem icon="clipboard-list" label="Total" value={todayStats.total} />
            <StatItem icon="check-circle" label="Completed" value={todayStats.completed} />
            <StatItem icon="clock-outline" label="Pending" value={todayStats.pending} />
            <StatItem icon="alert-circle" label="Delayed" value={todayStats.delayed} />
          </View>
          <Text style={styles.earnings}>
            <Icon name="currency-inr" size={18} /> {todayStats.earnings} Earned
          </Text>
          <Text style={styles.additionalStats}>Distance: {todayStats.distance}</Text>
          <Text style={styles.additionalStats}>Avg Delivery Time: {todayStats.avgDeliveryTime}</Text>
        </View>

        {/* Weather */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Current Weather</Text>
          <View style={styles.weatherInfo}>
            <Icon name="weather-sunny" size={22} color="#F49905" />
            <Text style={styles.weatherText}>{weather.condition}, {weather.temperature}</Text>
          </View>
        </View>

        {/* Alerts */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Quick Alerts</Text>
          {alerts.map(alert => (
            <View
              key={alert.id}
              style={[
                styles.alertBox,
                alert.type === 'urgent' ? styles.urgent : styles.failed,
              ]}
            >
              <Icon
                name={alert.type === 'urgent' ? 'alert-decagram' : 'alert'}
                size={18}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.alertText}>{alert.message}</Text>
            </View>
          ))}
        </View>

        {/* Activity */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <FlatList
            data={activities}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.activityItem}>
                <Icon name="history" size={18} color="#333" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.activityTime}>{item.time}</Text>
                  <Text>{item.action}</Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* Upcoming Tasks */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>Pickup #ORD1255 at 1:00 PM</Text>
          </View>
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>Deliver #ORD1240 at 3:00 PM</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const StatItem = ({ icon, label, value }) => (
  <View style={styles.statItem}>
    <Icon name={icon} size={22} color="#F49905" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default DriverDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F49905',
    marginBottom: 16,
  },
  card: {

    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    width: '22%',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
  earnings: {
    marginTop: 12,
    fontSize: 16,
    color: '#F49905',
    fontWeight: 'bold',
  },
  additionalStats: {
    color: '#000',
    marginTop: 4,
    fontSize: 14,
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  alertText: {
    color: '#000',
    fontWeight: '600',
  },
  urgent: {
    backgroundColor: '#d32f2f',
  },
  failed: {
    backgroundColor: '#f57c00',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  activityTime: {
    fontWeight: 'bold',
    color: '#F49905',
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 10,
  },
  taskItem: {

    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  taskText: {
    color: '#000',
    fontSize: 16,
  },
});
