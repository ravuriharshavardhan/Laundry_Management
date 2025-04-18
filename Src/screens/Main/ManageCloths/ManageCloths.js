import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground'
import fonts from '../../../utils/fonts'
import Feather from 'react-native-vector-icons/Feather'
import CustomerInput from '../../../components/CustomInput/CustomInputA'

const ManageCloths = () => {
  const handleAddCloth = () => {
    // Add your logic here, like navigation or opening a modal
    console.log("FAB Pressed - Add new cloth");
  };

  return (
    <TypeBBackground>
      <View style={{ marginTop: 80, paddingTop: 50, paddingLeft: 30 }}>
        <Text style={{
          fontFamily: fonts.HomeLabel,
          color: "#FFA717",
          width: 340,
          fontSize: 21
        }}>
          Add/Manage Cloth
        </Text>

        <View style={styles.inputContainer}>
          <Feather name="search" size={18} color="#666" style={styles.icon} />
          <CustomerInput
            backgroundColor={"#E7E7E7"}
            height={40}
            style={styles.textInput}
            placeholder="Search cloths..."
          />
        </View>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddCloth}>
      <Image source={require('../../../../assets/Images/FABIcon.png')}/>
      </TouchableOpacity>
    </TypeBBackground>
  )
}

export default ManageCloths

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    height: 40,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    right: 40
  },
  icon: {
    marginRight: 8,
    left: 40,
    zIndex: 1
  },
  textInput: {
    flex: 1,
    padding: 0,
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 160,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',

  },
})
