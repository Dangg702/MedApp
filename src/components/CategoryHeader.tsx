import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const CategoryHeader = (props: any) => {
  return (
    <View style={[styles.categoryWrapper, styles.rowCenter]}>
      <View style={styles.rowCenter}>
        <AwesomeIcon name={props.iconName} size={28} color={COLORS.MainColor} />
        <Text style={styles.text}>{props.title}</Text>
      </View>
      {!props.noIconRight && (
        <TouchableOpacity onPress={() => props.onPressMore()}>
          <AwesomeIcon name="angle-right" size={28} color={COLORS.LightGrey} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryWrapper: {
    justifyContent: 'space-between',
    padding: SPACING.space_20,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.Text,
    marginLeft: SPACING.space_8,
  },
});

export default CategoryHeader;
