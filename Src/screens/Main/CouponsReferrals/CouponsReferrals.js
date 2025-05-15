import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import CouponCard from '../../../components/CouponCard/CouponCard';


const CouponScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <CouponCard
          icon={require('../../../../assets/Icons/Ironbox.png')}
          title="IRONING"
          description="Enjoy 10% off ironing service!"
          keyword="ironing"
          buttonText="Claim the offer"
          image={require('../../../../assets/Icons/Ironbox.png')}
        />
        <CouponCard
          icon={require('../../../../assets/Icons/Ironbox.png')}
          title="IRONING"
          description="Enjoy 10% off ironing service!"
          keyword="ironing"
          buttonText="Claim the offer"
          image={require('../../../../assets/Icons/Ironbox.png')}
        />
        <CouponCard
          icon={require('../../../../assets/Icons/Ironbox.png')}
          title="IRONING"
          description="Enjoy 10% off ironing service!"
          keyword="ironing"
          buttonText="Claim the offer"
          image={require('../../../../assets/Icons/Ironbox.png')}
        />
        <CouponCard
          icon={require('../../../../assets/Icons/Ironbox.png')}
          title="IRONING"
          description="Enjoy 10% off ironing service!"
          keyword="ironing"
          buttonText="Claim the offer"
          image={require('../../../../assets/Icons/Ironbox.png')}
        />
        {/* Add more coupons if needed */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CouponScreen;
