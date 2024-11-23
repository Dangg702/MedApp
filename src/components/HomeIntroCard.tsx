import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import Icon from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('window');

const HomeIntroCard = (props: any, {navigation}: any) => {
  return (
    <TouchableOpacity style={styles.homeIntroCard} onPress={props.onPress}>
      <Image
        source={{uri: props.imagePath}}
        style={[styles.cardImage, {width: props.cardWidth}]}
      />
      <View style={styles.introDetailWrapper}>
        <Text style={styles.introTitle}>{props.title}</Text>
        <Text style={styles.introDescription}>{props.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  homeIntroCard: {
    flexDirection: 'row',
    padding: SPACING.space_8,
    alignItems: 'center',
    marginHorizontal: SPACING.space_18,
    marginVertical: SPACING.space_10,
  },
  introDetailWrapper: {
    marginLeft: SPACING.space_15,
    flex: 1,
  },
  introTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: FONTSIZE.size_16,
    color: COLORS.Text,
  },
  introDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: FONTSIZE.size_14,
    color: COLORS.Text,
  },
  cardImage: {
    height: width * 0.2,
    aspectRatio: 3 / 2,
    borderRadius: BORDERRADIUS.radius_10,
  },
});

export default HomeIntroCard;
