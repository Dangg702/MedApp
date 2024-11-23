import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE} from '../theme/theme';

const CustomButton = (props: any) => {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}>
      <Text style={[styles.buttonText, props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // marginHorizontal: SPACING.space_16,
    backgroundColor: COLORS.MainColor,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_8,
  },
  buttonText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
  },
});

export default CustomButton;
