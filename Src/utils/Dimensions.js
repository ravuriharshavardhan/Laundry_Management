import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import {Dimensions} from 'react-native';
  
  export const SCREEN_WIDTH = Dimensions.get('window').width;
  export const SCREEN_HEIGHT = Dimensions.get('window').height;
  
  export const W = dimension => {
    return wp((dimension / 375) * 100 + '%');
  };
  export const H = dimension => {
    return hp((dimension / 812) * 100 + '%');
  };
  
  export const F = dimension => {
    return hp((dimension / 812) * 100 + '%');
  };
  
  export const heightPercent = percent => {
    return hp(percent);
  };
  
  export const widthPercent = percent => {
    return wp(percent);
  };
  
  export const fontPercent = percent => {
    return hp(percent);
  };