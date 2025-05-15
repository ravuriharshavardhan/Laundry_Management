import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const galleryImages = [
  require('../../../../assets/Images/Services/Laundry1.jpg'),
  require('../../../../assets/Images/Services/Laundry1.jpg'),
  require('../../../../assets/Images/Services/Laundry1.jpg'),
  require('../../../../assets/Images/Services/Laundry1.jpg'),
];

const LaundryDetailScreen = () => {
  const [activeTab, setActiveTab] = useState('Gallery');

  return (
    <ScrollView style={styles.container}>
      {/* Header Image with overlay icons */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../../../../assets/Images/Services/Laundry1.jpg')}
          style={styles.headerImage}
        />
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.iconButtons}>
          <TouchableOpacity style={styles.iconCircle}>
            <Icon name="share" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <Icon name="favorite-border" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Preview List with map */}
      <View style={styles.previewList}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {galleryImages.map((item, index) => (
            <Image key={index} source={item} style={styles.previewImage} />
          ))}
        </ScrollView>
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <View style={styles.row}>
          <Text style={styles.category}>Laundry</Text>
          <Text style={styles.rating}>⭐ 4.8 (365 reviews)</Text>
        </View>
        <Text style={styles.title}>Spotless Attire Services</Text>
        <Text style={styles.address}>
          1012 Ocean Avenue, New York, USA
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {['About', 'Services', 'Gallery', 'Review'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.tabContentWrapper}>
        {activeTab === 'About' && (
          <Text style={styles.tabContentText}>
            Spotless Attire Services offers premium laundry, dry cleaning,
            and ironing solutions using eco-friendly products. We take pride
            in fast turnarounds, expert care, and customer satisfaction.
          </Text>
        )}

        {activeTab === 'Services' && (
          <View>
            <Text style={styles.serviceItem}>• Wash & Fold</Text>
            <Text style={styles.serviceItem}>• Dry Cleaning</Text>
            <Text style={styles.serviceItem}>• Ironing Services</Text>
            <Text style={styles.serviceItem}>• Express Delivery</Text>
          </View>
        )}

        {activeTab === 'Gallery' && (
          <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {galleryImages.map((item, index) => (
                <Image key={index} source={item} style={styles.galleryImage} />
              ))}
            </ScrollView>
          </View>
        )}

        {activeTab === 'Review' && (
          <View>
            <Text style={styles.reviewItem}>
              ⭐⭐⭐⭐⭐ “Clothes came back fresh and perfectly pressed!”
            </Text>
            <Text style={styles.reviewItem}>
              ⭐⭐⭐⭐ “Reliable service with good pricing.”
            </Text>
            <Text style={styles.reviewItem}>
              ⭐⭐⭐⭐⭐ “The express delivery is a lifesaver. Highly recommend!”
            </Text>
          </View>
        )}
      </View>

      {/* Book Button */}
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Service Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LaundryDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 8,
  },
  iconButtons: {
    position: 'absolute',
    top: 10,
    right: 20,
    flexDirection: 'row',
    gap: 10,
  },
  iconCircle: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    marginLeft: 10,
  },
  previewList: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 10,
  },
  infoSection: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  category: {
    fontSize: 13,
    color: '#666',
    fontFamily: 'Poppins-Medium',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  rating: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#F49905',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginTop: 4,
    color: '#333',
  },
  address: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#777',
    marginTop: 2,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 6,
  },
  tabText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#888',
  },
  tabActive: {
    color: '#4C63E7',
    fontFamily: 'Poppins-SemiBold',
    borderBottomWidth: 2,
    borderBottomColor: '#4C63E7',
    paddingBottom: 6,
  },
  tabContentWrapper: {
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  tabContentText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#555',
    lineHeight: 22,
  },
  serviceItem: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    marginVertical: 4,
  },
  galleryImage: {
    width: width * 0.5,
    height: 180,
    borderRadius: 12,
    marginRight: 12,
  },
  reviewItem: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#444',
    backgroundColor: '#f7f7f7',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  bookButton: {
    marginHorizontal: 16,
    backgroundColor: '#4C63E7',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    marginBottom: 30,
  },
  bookButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
});
