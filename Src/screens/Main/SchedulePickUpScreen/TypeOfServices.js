import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Pressable,
  Dimensions,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import fonts from '../../../utils/fonts';

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

const ImagesSliders = [
  {
    id: 1,
    ImageSource: require('../../../../assets/Images/Slider1.png'),
  },
  {
    id: 2,
    ImageSource: require('../../../../assets/Images/Slider1.png'), // Add more if needed
  },
];

const HomeScreen = () => {
  const [isActiveNotification, setisActiveNotification] = useState(false);
  const navigation = useNavigation();

  const sliderWidth = Dimensions.get('window').width;
  const handleNotification = () => {
    setisActiveNotification(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 5,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 35, width: 35, borderRadius: 20}}
            source={require('../../../../assets/Images/Avator.jpg')}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <FontAwesome5
              name="map-marker-alt"
              size={14}
              style={{marginRight: 15}}
            />
            <Text style={{fontFamily: fonts.label}}>
              Indore , Madhya Pradesh
            </Text>
          </View>
        </View>

        <Pressable onPress={handleNotification}>
          <Fontisto
            name={isActiveNotification ? 'bell' : 'bell-alt'}
            size={20}
          />
        </Pressable>
      </View>

      <View style={{marginVertical: 10}}>
        <FlatList
          data={ImagesSliders}
          keyExtractor={item => item.id.toString()}
          horizontal
          removeClippedSubviews={false}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={{width: 350, height: 150, marginRight: 15}}>
              <Image source={item.ImageSource} style={styles.Sliderimage} />
            </View>
          )}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{fontFamily: fonts.primary, fontSize: 20, fontWeight: '900'}}>
          Services
        </Text>
        <Text style={{fontFamily: fonts.primary, fontSize: 14}}>see all</Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {laundryTypes.map(type => (
          <TouchableOpacity
            key={type.id}
            style={styles.card}
            onPress={() => navigation.navigate(type.screen)}>
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
    width: '27%',
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
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    textAlign: 'center',
  },
  Sliderimage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
