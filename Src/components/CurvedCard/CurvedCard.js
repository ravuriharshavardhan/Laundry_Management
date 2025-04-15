import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {Shadow} from 'react-native-shadow-2';

const {width, height} = Dimensions.get('window');
const curveHeight = height * 1;

const CurvedCard = ({children}) => {
  return (
    <View style={styles.container}>
      <Shadow>
        <View style={[styles.card, {width: width * 1, height: curveHeight}]}>
          <View style={styles.curvesWrapper}>
            <Svg
              height={curveHeight}
              width={55}
              style={[styles.curve, styles.left]}
              viewBox={`-3 0 25 ${curveHeight}`}>
              <Path
                d={`
                                    M0,${width * 3}
                                    Q30,${(3 * curveHeight) / 4} 3,${
                  width * 1.2
                }
                                    Q30,${width / 10} 1,-180
                                    Q30,${width / 10} 30,${curveHeight / 3}
                                    Q30,${(6 * width) / 4} 10,${width * 3}
                                    Z
                                `}
                fill="#F49905"
                stroke="#F3D9ADDB"
                strokeWidth={2}
              />
            </Svg>

            <Svg
              height={curveHeight}
              width={55}
              style={[styles.curve, styles.right]}
              viewBox={`-3 0 25 ${curveHeight}`}>
              <Path
                d={`
                                    M0,${width * 3}
                                    Q30,${(3 * curveHeight) / 4} 3,${ width * 1.2
                }
                                    Q30,${width / 10} 1,-180
                                                            Q30,${
                                                              width / 10
                                                            } 30,${curveHeight / 3
                }
                                    Q30,${(3 * curveHeight) / 4} 10,${width * 3}
                                    Z
                                `}
                fill="#F49905"
                stroke="#F3D9ADDB"
                strokeWidth={2}
              />
            </Svg>
          </View>
          <View style={styles.content}>{children}</View>
        </View>
      </Shadow>
    </View>
  );
};

export default CurvedCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#F5F4F4',
    overflow: 'hidden',
  },
  curvesWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    elevation:1
  },
  curve: {
    position: 'absolute',
  },
  left: {
    left: 0,
    transform: [{scaleX: -2}],
  },
  right: {
    right: 0,
    transform: [{scaleX: 2}],
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
});
