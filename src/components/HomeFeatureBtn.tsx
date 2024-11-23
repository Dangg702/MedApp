import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const HomeFeatureBtn = (props: any) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnWrapper,
        props.shoudlMarginatedAtEnd
          ? props.isFirst
            ? {marginLeft: SPACING.space_12}
            : props.isLast
            ? {marginRight: SPACING.space_12}
            : {}
          : {},
        {maxWidth: props.cardWidth},
      ]}
      onPress={() => props.onPressFeature()}>
      {props.imagePath ? (
        <>
          <Image
            source={{uri: props.imagePath}}
            style={[styles.featureBtn, props.iconWrapperStyle]}
          />
        </>
      ) : (
        <LinearGradient
          colors={
            Array.isArray(props.gradientColors)
              ? props.gradientColors
              : ['#000000', '#FFFFFF']
          }
          // colors={props.gradientColors}
          style={[styles.featureBtn, props.iconWrapperStyle]}>
          <AwesomeIcon
            name={props.iconName}
            size={28}
            color={props.iconColor}
          />
        </LinearGradient>
      )}
      <Text style={styles.featureTitle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.space_24,
  },
  featureBtn: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    backgroundColor: '#f1f1f1',
    padding: SPACING.space_16,
    borderRadius: 100,
    alignItems: 'center',
  },
  featureTitle: {
    marginTop: SPACING.space_8,
    fontSize: FONTSIZE.size_16,
    color: COLORS.Text,
  },
});

export default HomeFeatureBtn;
