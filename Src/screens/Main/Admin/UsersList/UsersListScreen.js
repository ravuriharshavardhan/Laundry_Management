import { StyleSheet, Text, View, ScrollView, Alert, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CustomCard from '../../../../components/CustomCard/CustomCard';
import fonts from '../../../../utils/fonts';
import TypeBBackground from '../../../../components/BackgroundCard/TypeBBackground/TypeBBackground';

const UserListScreen = () => {
  const navigation = useNavigation();

  const [clothType, setClothType] = useState(null);

  const handleAddCloths = useCallback(() => {
    navigation.navigate("ManageCloths");
  }, [navigation]);
  return (
    <TypeBBackground>

      <View style={{marginTop:120}} >
      <Text
              style={{
                fontFamily: fonts.HomeLabel,

                fontSize: 21,
                textAlign: 'left',
                padding: 25,
                color: '#F7941E',
              }}
            >
             Users List
            </Text>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: -25 }}>
              <CustomCard
                 rightIcons={[
      
                  {
                component: <Image style={{height:20,width:20}} source={require('../../../../../assets/Images/CallIcon.png')} />,
                    onPress: () => Alert.alert('Delete Pressed'),
                  },
                ]}
              cardWidth='320'
                name="Shivi Jain"
                clothCount={10}
                address="71-A Surajnagar Ujjain"
                imageUri="https://i.pravatar.cc/150?img=47"
              />
              <CustomCard
                 rightIcons={[
      
                  {
                 component: <Image style={{height:20,width:20}} source={require('../../../../../assets/Images/CallIcon.png')} />,
                    onPress: () => Alert.alert('Delete Pressed'),
                  },
                ]}
                    cardWidth='320'
                name="Shivi Jain"
                clothCount={10}
                address="71-A Surajnagar Ujjain"
                imageUri="https://i.pravatar.cc/150?img=47"
              />
              <CustomCard
            rightIcons={[
      
              {
                 component: <Image style={{height:20,width:20}} source={require('../../../../../assets/Images/CallIcon.png')} />,
                onPress: () => Alert.alert('Delete Pressed'),
              },
            ]}
                    cardWidth='320'
                name="Shivi Jain"
                clothCount={10}
                address="71-A Surajnagar Ujjain"
                imageUri="https://i.pravatar.cc/150?img=47"
              />
              <CustomCard
                 rightIcons={[
      
                  {
                 component: <Image style={{height:20,width:20}} source={require('../../../../../assets/Images/CallIcon.png')} />,
                    onPress: () => Alert.alert('Delete Pressed'),
                  },
                ]}
                    cardWidth='320'
                name="Shivi Jain"
                clothCount={10}
                address="71-A Surajnagar Ujjain"
                imageUri="https://i.pravatar.cc/150?img=47"
              />

            </View>

      </View>
      


    </TypeBBackground>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderBottomWidth: 2,
    borderColor: '#F7A917',
    paddingHorizontal: 8,
    width: 290,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    left: 11

  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
    borderColor: "#fff"
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
    borderColor: "#fff"
  },
  dropdownContainer: {
    backgroundColor: '#F7941E', 
    borderRadius: 8,
  },
});
