import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Feather';

import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

const AppHeader = (props: any) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <TouchableOpacity onPress={() => props.action()}>
        <Icon
          name="chevron-left"
          style={styles.iconStyle}
          size={FONTSIZE.size_30}
          color={props.iconColor ? props.iconColor : COLORS.White}
        />
      </TouchableOpacity>
      <Text style={[styles.headerText, props.headerText]}>{props.header}</Text>
      <View style={styles.emptyContainer}></View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    paddingVertical: SPACING.space_10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.MainColor,
  },
  iconStyle: {
    fontSize: FONTSIZE.size_30,
    fontWeight: 600,
    paddingLeft: SPACING.space_18,
    paddingTop: 10,
  },
  headerText: {
    flex: 1,
    fontFamily: FONTFAMILY.roboto_bold,
    fontSize: FONTSIZE.size_20,
    textAlign: 'center',
    color: COLORS.White,
  },
  emptyContainer: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
  },
});
