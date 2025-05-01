import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const laundryTypes = [
  {
    id: 'dry_clean',
    name: 'Dry Clean',
    image: require('../../../../assets/Icons/DryCleaning.png'),
    screen: 'DryCleaning',
  },
  {
    id: 'Home_Care',
    name: 'Home Care',
    image: require('../../../../assets/Icons/HomeCare.png'),
    screen: 'HomeCare',
  },
  {
    id: 'ironing',
    name: 'Ironing',
    image: require('../../../../assets/Icons/Ironbox.png'),
    screen: 'ironing',
  },
  {
    id: 'CarpetCleaning',
    name: 'Carpet Cleaning',
    image: require('../../../../assets/Icons/CarpetCleaning.png'),
    screen: 'CarpetCleaning',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Text style={styles.title}>Choose Laundry Type</Text>

      <ScrollView contentContainerStyle={styles.grid}>
        {laundryTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={styles.card}
            onPress={() => navigation.navigate(type.screen)}
          >
            <Image source={type.image} style={styles.image} />
            <Text style={styles.label}>{type.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    color: '#FFA717',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 20,
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    textAlign: 'center',
  },
});
