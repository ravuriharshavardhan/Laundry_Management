import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Pressable,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../../Redux/Slice/authSlice';

const DriverDashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [todayStats] = useState({
    total: 15,
    completed: 10,
    pending: 3,
    delayed: 2,
    earnings: '1250',
  });

  const [activeOrders, setActiveOrders] = useState([
    {
      id: '1',
      status: 'Pending',
      task: 'Pickup #ORD1255 at 1:00 PM',
      address: '123 Main St, Cityville',
    },
    {
      id: '2',
      status: 'In Progress',
      task: 'Deliver #ORD1240 to John Doe',
      address: '456 Park Ave, Townsville',
    },
  ]);

  const [recentActivity] = useState([
    { id: '1', time: '9:00 AM', action: 'Picked up #ORD1234' },
    { id: '2', time: '10:15 AM', action: 'Delivered #ORD1212' },
  ]);

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      dispatch(logout());
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const handleAccept = orderId => {
    const updatedOrders = activeOrders.map(order =>
      order.id === orderId ? { ...order, status: 'In Progress' } : order,
    );
    setActiveOrders(updatedOrders);
  };

  const handleDecline = orderId => {
    const updatedOrders = activeOrders.filter(order => order.id !== orderId);
    setActiveOrders(updatedOrders);
  };

  const handleModal = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Driver Dashboard</Text>
          <TouchableOpacity
            onPress={handleModal}
            style={styles.profileButton}
          >
            <Icon name="account-circle" size={28} color="#F49905" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsSummary}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{todayStats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{todayStats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹{todayStats.earnings}</Text>
            <Text style={styles.statLabel}>Earned</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Active Orders</Text>
          {activeOrders.map(order => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              onPress={() => navigation.navigate('OrderDetails', { order })}
            >
              <View style={styles.orderHeader}>
                <View
                  style={[
                    styles.statusIndicator,
                    order.status === 'Pending'
                      ? styles.pendingIndicator
                      : styles.progressIndicator,
                  ]}
                />
                <Text style={styles.orderStatus}>{order.status}</Text>
                <View style={styles.spacer} />
                <Icon name="chevron-right" size={22} color="#9E9E9E" />
              </View>

              <View style={styles.orderDetails}>
                <Text style={styles.orderTask}>{order.task}</Text>
                <View style={styles.addressContainer}>
                  <Icon name="map-marker" size={14} color="#757575" />
                  <Text style={styles.orderAddress}>{order.address}</Text>
                </View>
              </View>

              <View style={styles.actionBar}>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="phone" size={18} color="#F49905" />
                  <Text style={styles.actionText}>Call</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="directions" size={18} color="#F49905" />
                  <Text style={styles.actionText}>Navigate</Text>
                </TouchableOpacity>

                {order.status === 'Pending' ? (
                  <View style={styles.decisionButtons}>
                    <TouchableOpacity
                      style={[styles.secondaryButton, styles.declineButton]}
                      onPress={() => handleDecline(order.id)}
                    >
                      <Text style={styles.secondaryButtonText}>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.secondaryButton, styles.acceptButton]}
                      onPress={() => handleAccept(order.id)}
                    >
                      <Text style={styles.secondaryButtonText}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[styles.primaryButton, styles.deliverButton]}
                  >
                    <Text style={styles.primaryButtonText}>Deliver</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivity.map(item => (
            <View key={item.id} style={styles.activityItem}>
              <Icon name="history" size={18} color="#757575" />
              <View style={styles.activityContent}>
                <Text style={styles.activityTime}>{item.time}</Text>
                <Text style={styles.activityText}>{item.action}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Driver Info</Text>
            <Text style={styles.modalText}>Name: John Driver</Text>
            <Text style={styles.modalText}>Email: john.driver@example.com</Text>
            <Text style={styles.modalText}>Role: Driver</Text>

            <TouchableOpacity
              style={styles.signOutButton}
              onPress={handleSignOut}
            >
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>

            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F7F8FA'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
    fontFamily: 'Poppins-Bold',
  },
  profileButton: {padding: 4},
  statsSummary: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  statItem: {flex: 1, alignItems: 'center'},
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    fontFamily: 'Poppins-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
    fontFamily: 'Poppins-Regular',
  },
  sectionContainer: {marginBottom: 16, paddingHorizontal: 16},
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  orderHeader: {flexDirection: 'row', alignItems: 'center', marginBottom: 12},
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  pendingIndicator: {backgroundColor: '#FFC107'},
  progressIndicator: {backgroundColor: '#4CAF50'},
  orderStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    fontFamily: 'Poppins-SemiBold',
  },
  spacer: {flex: 1},
  orderDetails: {marginBottom: 12},
  orderTask: {
    fontSize: 15,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 6,
    fontFamily: 'Poppins-Medium',
  },
  addressContainer: {flexDirection: 'row', alignItems: 'center'},
  orderAddress: {
    fontSize: 13,
    color: '#757575',
    marginLeft: 4,
    fontFamily: 'Poppins-Regular',
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  actionText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
    fontFamily: 'Poppins-Medium',
  },
  decisionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  secondaryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  declineButton: {
    backgroundColor: '#F44336',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  primaryButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  deliverButton: {
    backgroundColor: '#4CAF50',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  activityContent: {
    marginLeft: 12,
  },
  activityTime: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F49905',
    fontFamily: 'Poppins-SemiBold',
  },
  activityText: {
    fontSize: 14,
    color: '#424242',
    fontFamily: 'Poppins-Regular',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    fontFamily: 'Poppins-Bold',
    color: '#212121',
  },
  modalText: {
    fontSize: 14,
    marginVertical: 2,
    fontFamily: 'Poppins-Regular',
    color: '#424242',
  },
  signOutButton: {
    backgroundColor: '#F44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#F49905',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});

export default DriverDashboard;