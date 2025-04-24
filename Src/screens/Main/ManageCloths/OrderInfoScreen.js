import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  Modal,
  Linking,
  Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import fonts from '../../../utils/fonts';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import CustomGradientButton from '../../../components/CustomGradientButton/CustomGradientButton';

const OrderInfoScreen = () => {
  const route = useRoute();
  const order = route?.params?.order;

  const [loading, setLoading] = useState(false);
  const [invoicePath, setInvoicePath] = useState(null);

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>❌ No order data found</Text>
      </View>
    );
  }

  const totalPrice =
    order.cloths?.reduce((sum, item) => sum + (item.totalPrice || 0), 0) || 0;

  const renderClothItem = ({ item }) => (
    <View style={styles.clothItem}>
      <View>
        <Text style={styles.clothName}>{item.name}</Text>
        <Text style={styles.clothDetails}>Qty: {item.pieces} | Type: {item.type}</Text>
      </View>
      <Text style={styles.clothPrice}>₹{item.totalPrice}</Text>
    </View>
  );

  const handleGenerateInvoice = async () => {
    try {
      setLoading(true);
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              h1 { color: #F7941E; text-align: center; }
              .section { margin: 20px 0; }
              .section h2 { margin-bottom: 10px; }
              .label { font-weight: bold; }
              .content { margin-bottom: 15px; }
              .cloth-item { border-bottom: 1px solid #ccc; padding: 10px 0; }
            </style>
          </head>
          <body>
            <h1>Invoice for Order #${order._id}</h1>
            <div class="section">
              <h2>Order Details</h2>
              <div class="content"><span class="label">Status:</span> ${order.status}</div>
              <div class="content"><span class="label">Pickup Date:</span> ${order.pickupDate} at ${order.pickupTime}</div>
              <div class="content"><span class="label">Address:</span> ${order.address}</div>
            </div>
            <div class="section">
              <h2>Cloth Items</h2>
              ${order.cloths.map(item => `
                <div class="cloth-item">
                  <span>${item.name}</span><br/>
                  <span>Qty: ${item.pieces} | Type: ${item.type}</span><br/>
                  <span>Price: ₹${item.totalPrice}</span>
                </div>
              `).join('')}
            </div>
            <div class="section">
              <h2>Total</h2>
              <div class="content"><span class="label">Total Price:</span> ₹${totalPrice}</div>
            </div>
          </body>
        </html>
      `;

      const options = {
        html: htmlContent,
        fileName: `Invoice_${order._id}`,
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      setInvoicePath(file.filePath);
      Alert.alert('Invoice', 'Invoice generated successfully!');
    } catch (error) {
      console.error('Error generating invoice:', error);
      Alert.alert('Invoice', 'There was an issue generating the invoice.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenInvoice = () => {
    if (invoicePath) {
      Linking.openURL(
        Platform.OS === 'android' ? `file://${invoicePath}` : invoicePath
      );
    } else {
      Alert.alert('Error', 'No invoice file found.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.orderDetails}>
        <Text style={styles.title}>Order Summary</Text>
        <Text style={styles.label}>Order ID: <Text style={styles.value}>{order.orderId || order._id}</Text></Text>
        <Text style={styles.label}>Status: <Text style={styles.value}>{order.status}</Text></Text>
        <Text style={styles.label}>Pickup: <Text style={styles.value}>{order.pickupDate} at {order.pickupTime}</Text></Text>
        <Text style={styles.label}>Address: <Text style={styles.value}>{order.address}</Text></Text>
      </View>

      <Text style={[styles.label, { marginTop: 20 }]}>Cloth Items</Text>
      <FlatList
        data={order.cloths || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderClothItem}
        contentContainerStyle={styles.clothListContainer}
        removeClippedSubviews={false}
        ListEmptyComponent={<Text style={styles.emptyText}>No items found</Text>}
      />

      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total: ₹{totalPrice}</Text>
        <CustomGradientButton title="Generate Invoice" onPress={handleGenerateInvoice} />
       
      </View>

      {/* Loader */}
      <Modal transparent animationType="fade" visible={loading}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#F7941E" />
        </View>
      </Modal>
    </View>
  );
};

export default OrderInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.HomeLabel,
    color: '#F7941E',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontWeight: 'normal',
    color: '#555',
  },
  orderDetails: {
    marginTop: 50,
    paddingVertical: 15,
    borderRadius: 8,
  },
  clothItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  clothName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  clothDetails: {
    fontSize: 12,
    color: '#555',
  },
  clothPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  clothListContainer: {
    paddingBottom: 100,
  },
  emptyText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#aaa',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
