import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CurvedCard from '../../../components/CurvedCard/CurvedCard';
import CustomerInput from '../../../components/CustomInput/CustomInputA';
import CustomButton from '../../../components/CustomButton/CustomButton';
import Octicons from 'react-native-vector-icons/Octicons'
import { useNavigation } from '@react-navigation/native';

const SchedulePickUpScreen = () => {
  const navigation = useNavigation()

  const handleaddcloths = useCallback(()=>{
    navigation.navigate("ManageCloths")

  },[])


  return (

  <KeyboardAvoidingView
  keyboardShouldPersistTaps="handled"
keyboardVerticalOffset={110}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={{ flexGrow: 1 }}
>
  <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    keyboardShouldPersistTaps="handled"
  >
    <View
      style={{
        marginTop: 200,
        flex: 1,
        elevation: 28,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
      }}
    >
      <CurvedCard
        height={670}
        borderRadius={40}
        curve1={{ c1: 40, c2: 400 }}
        curve2={{ c1: 50, c2: -1600 }}
        anchor1={-20}
        anchor2={1}
        viewBoxY={30}
        viewBoxX={-15}
        curveStrokeWidth={6}
      >
        <Text
            style={{
              fontFamily: 'Cinzel-SemiBold',

              fontSize: 21,
              textAlign: 'left',
              padding: 25,
              color: '#FFA717',
            }}
          >
            Schedule Pick Up
          </Text>

          <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: -25 }}>
            <CustomerInput placeholder={'Address'} width={320} />
            <CustomerInput placeholder={'Choose a Day for Pickup'} iconName={'caret-down-outline'} width={320} />
            <CustomerInput placeholder={'Choose Preferred Time'} iconName={'caret-down-outline'} width={320} />
            <CustomerInput  onPress={handleaddcloths} disabled={true}  placeholder={'Add Clothes'}   iconComponent={<Octicons name="plus" size={20} color="#5F6368" />}  width={320} />
            <CustomerInput placeholder={'Coupon(If any)'} width={320} />

            <View style={{ marginTop: 20 }}>
              <CustomButton width={151} backgroundColor={'#F7A917'} height={50} title={'Place Order'} />
            </View>

            </View>
      </CurvedCard>
    </View>
  </ScrollView>
</KeyboardAvoidingView>

  );
};

export default SchedulePickUpScreen;

const styles = StyleSheet.create({});
