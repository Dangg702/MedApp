import React from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import Icon from 'react-native-vector-icons/Feather';

const SearchResultCard = (props: any) => {
  return (
    <TouchableOpacity style={styles.searchResultCard}>
      <View style={styles.header}>
        <Image
          source={{
            uri: props.avatar
              ? props.avatar
              : 'https://via.placeholder.com/150',
          }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <View style={styles.info}>
            <Text style={styles.name}>
              {props.position ? props.position : ''} {props.name}
            </Text>
            <Text style={styles.title}>{props.clinicName}</Text>
          </View>
          {props.specialty && props.specialty !== null && (
            <View style={styles.tags}>
              <Text style={styles.tag}>{props.specialty}</Text>
            </View>
          )}
        </View>
      </View>

      <Text style={styles.address}>
        <Icon name="map-pin" size={18} style={styles.icon} /> {props.address}
      </Text>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
          <Text style={styles.buttonText}>Đặt lịch ngay</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchResultCard: {
    padding: SPACING.space_12,
    marginVertical: SPACING.space_2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: BORDERRADIUS.radius_10,
    shadowOffset: {width: 0, height: 2},
    width: '100%',
    borderRadius: BORDERRADIUS.radius_8,
  },
  header: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.space_10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginRight: SPACING.space_10,
    objectFit: 'cover',
  },
  info: {
    flex: 1,
    gap: 4,
    left: 10,
  },
  title: {
    fontSize: FONTSIZE.size_14,
    color: '#888',
  },
  name: {
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
    color: COLORS.Grey,
  },
  tags: {
    flexDirection: 'row',
    marginBottom: SPACING.space_10,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    marginHorizontal: SPACING.space_4,
    fontSize: FONTSIZE.size_12,
    color: '#555',
  },
  address: {
    fontSize: FONTSIZE.size_14,
    color: '#555',
    textAlign: 'left',
    marginBottom: SPACING.space_10,
  },
  buttonWrapper: {
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_36,
    borderRadius: BORDERRADIUS.radius_8,
  },
  buttonText: {
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_16,
    textAlign: 'center',
  },
  icon: {
    marginRight: SPACING.space_8,
    padding: SPACING.space_8,
  },
});

export default SearchResultCard;
