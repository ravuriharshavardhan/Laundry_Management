import {
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
  } from 'react-native'
  import React from 'react'
  import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground'
  import CustomerInputB from '../../../components/CustomInput/CustomInputB'
  import CustomGradientButton from '../../../components/CustomGradientButton/CustomGradientButton'
  
  const UserComplaint = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <TypeBBackground>
              <View style={styles.container}>

                <Text style={{fontFamily:"VarelaRound-Regular", fontSize:18,marginVertical:10}}>Complaints</Text>

                <View style={{
  height: 2,
  backgroundColor: '#F7941E',
  marginVertical: 10,
  width: '100%',
  alignSelf: 'center',
}} />


  
                <TextInput
                placeholderTextColor={"#000"}
                  placeholder="Enter notification"
                  style={styles.input}
                  multiline
                />
  
                <View style={{ alignItems: 'center' }}>
                  <CustomGradientButton
                  
                    width={114}
                    borderRadius={6}
                    title="Notify"
                  />
                </View>
              </View>
            </TypeBBackground>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
  
  export default UserComplaint
  
  const styles = StyleSheet.create({
    container: {
      padding: 50,
      flex: 1,

    },
    input: {
      height: 165,
      width: '95%',
      borderWidth: 1,
      borderColor: '#F7941E',
      backgroundColor: '#F3F2F6',
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: 20,
      alignSelf: 'center',
      textAlignVertical: 'top', 
      color:"#000",
      marginVertical:30
    },
  })
  