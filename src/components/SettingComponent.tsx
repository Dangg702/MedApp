import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Feather';

const SettingComponent = (props: any) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => props.onPress()}>
      <View>
        <Icon
          name={props.icon}
          style={styles.iconStyle}
          color={props.iconColor}
        />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{props.heading}</Text>
      </View>
      <View style={styles.iconBG}>
        {props.moreIcon && (
          <FontAwesomeIcon name={'angle-right'} style={styles.iconStyle} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: SPACING.space_15,
  },
  iconStyle: {
    fontSize: FONTSIZE.size_24,
    paddingHorizontal: SPACING.space_20,
  },
  settingContainer: {
    flex: 1,
  },
  title: {
    color: COLORS.Text,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.roboto_medium,
  },
  subtitle: {
    color: COLORS.BlackRGB75,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.roboto_regular,
  },
  iconBG: {
    justifyContent: 'center',
  },
});

export default SettingComponent;
