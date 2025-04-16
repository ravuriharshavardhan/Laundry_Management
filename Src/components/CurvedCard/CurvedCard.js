import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Shadow } from 'react-native-shadow-2';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CurvedCard = ({
  children,

  // Layout
  width = screenWidth,
  height = screenHeight * 0.6,
  borderRadius = 20,
  backgroundColor = '#F5F4F4',

  // Shadow for card
  shadowColor = '#000',
  shadowOffset = { width: 0, height: 4 },
  shadowOpacity = 0.2,
  shadowRadius = 8,

  // SVG ViewBox
  viewBoxX = -2,
  viewBoxY = 10,
  viewBoxWidth = 30,
  viewBoxHeight,
  gradientStart = '#FFA717',
  gradientEnd = '#F19601',
  curveStrokeColor = '#F3D9ADDB',
  curveStrokeWidth = 2,
  curveScale = 1,


  insetShadowColor = 'rgba(1,2,0,0.7)',
  insetShadowOffsetY = 3,


  sideShadowColor = 'rgba(243, 217, 173, 0.86)',
  sideShadowOffset = 5,


  startY = screenWidth * 3,
  curve1 = { c1: 30, c2: screenWidth * 1.2 },
  curve2 = { c1: 30, c2: -190 },
  curve3 = { c1: 30, c2: height / 3 },
  curve4 = { c1: 30, c2: screenWidth * 3 },
  anchor1 = 3,
  anchor2 = 1,
  anchor3 = 30,
  anchor4 = 10,
}) => {
  const finalViewBoxHeight = viewBoxHeight || height;
  const hexOpacity = Math.floor(shadowOpacity * 255).toString(16).padStart(2, '0');

  const renderPath = () => `
    M0,${startY}
    Q${curve1.c1},${(3 * height) / 4} ${anchor1},${curve1.c2}
    Q${curve2.c1},${screenWidth / 10} ${anchor2},${curve2.c2}
    Q${curve3.c1},${screenWidth / 10} ${anchor3},${curve3.c2}
    Q${curve4.c1},${(6 * screenWidth) / 4} ${anchor4},${curve4.c2}
    Z
  `;

  const renderCurve = (isLeft = true) => {
    const transformSide = isLeft ? [{ scaleX: -curveScale }] : [{ scaleX: curveScale }];
    const sideShadowDx = isLeft ? -sideShadowOffset : sideShadowOffset;

    return (
      <Svg
        height={height}
        width={55}
        style={[
          styles.curve,
          isLeft ? { left: 0 } : { right: 0 },
          { transform: transformSide },
        ]}
        viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${finalViewBoxHeight}`}
      >
        <Defs>
          <LinearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="50%" stopColor={gradientStart} />
            <Stop offset="100%" stopColor={gradientEnd} />
          </LinearGradient>
        </Defs>

        {/* Side glow shadow */}
        <Path
          d={renderPath()}
          fill={sideShadowColor}
          transform={`translate(${sideShadowDx}, 0)`}
        />

        {/* Inset shadow mimic */}
        <Path
          d={renderPath()}
          fill={insetShadowColor}
          transform={`translate(0, ${insetShadowOffsetY})`}
          opacity={0.4}
        />

        {/* Main gradient curve */}
        <Path
          d={renderPath()}
          fill="url(#curveGradient)"
          stroke={curveStrokeColor}
          strokeWidth={curveStrokeWidth}
        />
      </Svg>
    );
  };

  return (
    <View style={styles.container}>
      <Shadow
        distance={shadowRadius}
        offset={shadowOffset}
        startColor={`${shadowColor}${hexOpacity}`}
      >
        <View
          style={[
            styles.card,
            {
              width,
              height,
              borderRadius,
              backgroundColor,
            },
          ]}
        >
          <View style={styles.curvesWrapper}>
            {renderCurve(true)}
            {renderCurve(false)}
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
    overflow: 'hidden',
    elevation:50
  },
  curvesWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    elevation: 1,
  },
  curve: {
    position: 'absolute',
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
});
