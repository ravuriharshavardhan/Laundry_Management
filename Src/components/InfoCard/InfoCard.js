import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';

const InfoCard = ({ label = '', subtitle = '', highlight = '', imageSource }) => {
    return (
        <View style={styles.card}>
    {imageSource && (
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
    )}
    <Text style={styles.title}>{label}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
    <Text style={styles.subtitle}>
        our <Text style={styles.link}>{highlight}</Text>
    </Text>
</View>

    );
};

export default InfoCard;

const styles = StyleSheet.create({
    card: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        marginBottom: 25,
    },
    title: {
        fontSize: 22,
        color: colors.accent,
        fontFamily: 'trebuc',
    },
    subtitle: {
        fontSize: 14,
        color: colors.text,
        fontFamily: fonts.primary,
        lineHeight: 22,
        marginTop: 10,
    },
    link: {
        color: colors.secondtext,
        fontSize: 14,
        fontFamily: fonts.primary,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 15,
    },
});
