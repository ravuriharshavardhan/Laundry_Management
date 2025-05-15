import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderDetails = ({ route, navigation }) => {
  // In a real app, order ID would come from route.params.orderId
  // Sample data for a dry cleaning order
  const [orderDetails] = useState({
    id: 'ORD1240',
    status: 'In Progress',
    customer: {
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      address: '456 Park Avenue, Andheri West, Mumbai, Pin: 400053',
    },
    pickupLocation: {
      name: 'Sparkle Clean Laundry',
      phone: '+91 98765 12345',
      address: '123 Main Street, Bandra East, Mumbai, Pin: 400051',
    },
    serviceType: 'Delicate Care', // From dryCleaningTypes
    items: [
      { id: 'silk', name: 'Silk Dress', quantity: 1, price: 12, serviceType: 'Delicate Care' },
      { id: 'lace', name: 'Lace Top', quantity: 2, price: 10, serviceType: 'Delicate Care' },
      { id: 'chiffon', name: 'Chiffon Blouse', quantity: 1, price: 11, serviceType: 'Delicate Care' },
    ],
    premiumServices: [
      { id: 'p11', title: 'Soft Finish', price: 6, description: 'Extra softener for delicate fabrics.' },
      { id: 'p12', title: 'Hand Wash', price: 8, description: 'Gentle hand wash by textile experts.' },
    ],
    payment: {
      method: 'Online Payment',
      subtotal: 43, // Base price of items
      premiumServices: 14, // Additional services
      deliveryFee: 5,
      total: 62,
      status: 'Paid',
    },
    timeline: [
      { time: '12:30 PM', status: 'Order Placed' },
      { time: '12:45 PM', status: 'Laundry Accepted' },
      { time: '01:15 PM', status: 'Pickup Assigned to You' },
      { time: '01:20 PM', status: 'You Accepted Pickup' },
    ],
    deliveryInstructions: 'Please call when you arrive. The security guard will let you in. Apartment 502.',
    deliveryDate: 'May 7, 2025',
    deliveryTime: '5:00 PM - 7:00 PM'
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order #{orderDetails.id}</Text>
        <View style={styles.spacer}></View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Order Status */}
        <View style={styles.statusContainer}>
          <View style={styles.statusHeader}>
            <View style={[styles.statusIndicator, 
              orderDetails.status === 'Pending' ? styles.pendingIndicator : styles.progressIndicator]} />
            <Text style={styles.statusText}>{orderDetails.status}</Text>
          </View>
          <Text style={styles.deliverySchedule}>
            Delivery: {orderDetails.deliveryDate}, {orderDetails.deliveryTime}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="phone" size={20} color="#F49905" />
            <Text style={styles.actionText}>Call Customer</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="map-marker" size={20} color="#F49905" />
            <Text style={styles.actionText}>Navigate</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.primaryActionButton}>
            <Text style={styles.primaryActionText}>
              {orderDetails.status === 'Pending' ? 'Pick Up' : 'Deliver'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Location Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{orderDetails.status === 'Pending' ? 'Pickup Location' : 'Delivery Location'}</Text>
          
          <View style={styles.locationContainer}>
            <Icon name="store" size={20} color="#757575" style={styles.locationIcon} />
            <View style={styles.locationDetails}>
              <Text style={styles.locationName}>
                {orderDetails.status === 'Pending' ? orderDetails.pickupLocation.name : orderDetails.customer.name}
              </Text>
              <Text style={styles.locationAddress}>
                {orderDetails.status === 'Pending' ? orderDetails.pickupLocation.address : orderDetails.customer.address}
              </Text>
              <Text style={styles.locationPhone}>
                {orderDetails.status === 'Pending' ? orderDetails.pickupLocation.phone : orderDetails.customer.phone}
              </Text>
            </View>
          </View>
          
          {orderDetails.deliveryInstructions && (
            <View style={styles.instructionsContainer}>
              <Icon name="information" size={20} color="#F49905" style={styles.instructionIcon} />
              <Text style={styles.instructionsText}>{orderDetails.deliveryInstructions}</Text>
            </View>
          )}
        </View>
        
        {/* Order Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          
          <View style={styles.serviceTypeContainer}>
            <Text style={styles.serviceTypeLabel}>Service Type:</Text>
            <Text style={styles.serviceTypeValue}>{orderDetails.serviceType}</Text>
          </View>
          
          {/* Items */}
          <View style={styles.itemsContainer}>
            <Text style={styles.itemsHeader}>Items</Text>
            {orderDetails.items.map((item, index) => (
              <View key={item.id} style={styles.itemRow}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemType}>{item.serviceType}</Text>
                </View>
                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
              </View>
            ))}
          </View>
          
          {/* Premium Services */}
          {orderDetails.premiumServices.length > 0 && (
            <View style={styles.premiumServicesContainer}>
              <Text style={styles.itemsHeader}>Premium Services</Text>
              {orderDetails.premiumServices.map((service) => (
                <View key={service.id} style={styles.serviceRow}>
                  <View style={styles.serviceDetails}>
                    <Text style={styles.serviceName}>{service.title}</Text>
                    <Text style={styles.serviceDescription}>{service.description}</Text>
                  </View>
                  <Text style={styles.servicePrice}>₹{service.price}</Text>
                </View>
              ))}
            </View>
          )}
          
          {/* Payment Summary */}
          <View style={styles.paymentSummary}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Subtotal</Text>
              <Text style={styles.paymentValue}>₹{orderDetails.payment.subtotal}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Premium Services</Text>
              <Text style={styles.paymentValue}>₹{orderDetails.payment.premiumServices}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Delivery Fee</Text>
              <Text style={styles.paymentValue}>₹{orderDetails.payment.deliveryFee}</Text>
            </View>
            <View style={[styles.paymentRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{orderDetails.payment.total}</Text>
            </View>
            <View style={styles.paymentMethodRow}>
              <Text style={styles.paymentMethodLabel}>Payment Method:</Text>
              <View style={styles.paymentMethodValue}>
                <Icon name="credit-card" size={14} color="#4CAF50" />
                <Text style={styles.paymentMethodText}>{orderDetails.payment.method} • {orderDetails.payment.status}</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Order Timeline */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Timeline</Text>
          
          <View style={styles.timeline}>
            {orderDetails.timeline.map((event, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View style={styles.timelineDot} />
                  {index !== orderDetails.timeline.length - 1 && <View style={styles.timelineLine} />}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTime}>{event.time}</Text>
                  <Text style={styles.timelineStatus}>{event.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginLeft: -24, // To center the title properly
    // fontFamily: 'Poppins-SemiBold',
  },
  spacer: {
    width: 24,
  },
  statusContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  pendingIndicator: {
    backgroundColor: '#FFC107',
  },
  progressIndicator: {
    backgroundColor: '#4CAF50',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    // fontFamily: 'Poppins-SemiBold',
  },
  deliverySchedule: {
    marginTop: 4,
    fontSize: 12,
    color: '#757575',
    // fontFamily: 'Poppins-Regular',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
    // fontFamily: 'Poppins-Medium',
  },
  primaryActionButton: {
    backgroundColor: '#F49905',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    // fontFamily: 'Poppins-SemiBold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
    // fontFamily: 'Poppins-SemiBold',
  },
  locationContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  locationIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  locationDetails: {
    flex: 1,
  },
  locationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
    // fontFamily: 'Poppins-SemiBold',
  },
  locationAddress: {
    fontSize: 13,
    color: '#424242',
    marginBottom: 4,
    // fontFamily: 'Poppins-Regular',
  },
  locationPhone: {
    fontSize: 13,
    color: '#424242',
    // fontFamily: 'Poppins-Regular',
  },
  instructionsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E6',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  instructionIcon: {
    marginRight: 8,
  },
  instructionsText: {
    flex: 1,
    fontSize: 13,
    color: '#424242',
    // fontFamily: 'Poppins-Regular',
  },
  serviceTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceTypeLabel: {
    fontSize: 13,
    color: '#757575',
    // fontFamily: 'Poppins-Regular',
  },
  serviceTypeValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F49905',
    marginLeft: 4,
    // fontFamily: 'Poppins-SemiBold',
  },
  itemsContainer: {
    marginBottom: 16,
  },
  itemsHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
    // fontFamily: 'Poppins-SemiBold',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 13,
    color: '#212121',
    // fontFamily: 'Poppins-Medium',
  },
  itemType: {
    fontSize: 12,
    color: '#757575',
    // fontFamily: 'Poppins-Regular',
  },
  itemQuantity: {
    fontSize: 13,
    color: '#757575',
    marginHorizontal: 16,
    // fontFamily: 'Poppins-Regular',
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#212121',
    // fontFamily: 'Poppins-SemiBold',
  },
  premiumServicesContainer: {
    marginBottom: 16,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: 13,
    color: '#212121',
    // fontFamily: 'Poppins-Medium',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#757575',
    // fontFamily: 'Poppins-Regular',
  },
  servicePrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#212121',
    // fontFamily: 'Poppins-SemiBold',
  },
  paymentSummary: {
    marginTop: 8,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  paymentLabel: {
    fontSize: 13,
    color: '#757575',
    // fontFamily: 'Poppins-Regular',
  },
  paymentValue: {
    fontSize: 13,
    color: '#212121',
    // fontFamily: 'Poppins-Regular',
  },
  totalRow: {
    paddingTop: 8,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    // fontFamily: 'Poppins-SemiBold',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F49905',
    // fontFamily: 'Poppins-SemiBold',
  },
  paymentMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  paymentMethodLabel: {
    fontSize: 12,
    color: '#757575',
    // fontFamily: 'Poppins-Regular',
  },
  paymentMethodValue: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  paymentMethodText: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 4,
    // fontFamily: 'Poppins-Medium',
  },
  timeline: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
  },
  timelineLeft: {
    alignItems: 'center',
    width: 20,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F49905',
    marginRight: 10,
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: '#E0E0E0',
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 20,
  },
  timelineTime: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F49905',
    // fontFamily: 'Poppins-SemiBold',
  },
  timelineStatus: {
    fontSize: 13,
    color: '#212121',
    marginTop: 2,
    // fontFamily: 'Poppins-Regular',
  }
});

export default OrderDetails;