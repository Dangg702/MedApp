import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/NavigationTypes';

const InputHeader = (props: any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [searchText, setSearchText] = useState<string>(props.searchValue || '');

  const searchFunction = (searchKey: string) => {
    navigation.navigate('Search', {
      role: 'search',
      searchKey: searchKey,
      type: 'all',
    });
    setSearchText('');
  };

  return (
    <View style={[styles.inputBox, props.inputBox]}>
      <TextInput
        style={[styles.textInput, props.textInput]}
        onChangeText={textInput => setSearchText(textInput)}
        value={searchText}
        placeholder="Tên bác sĩ, chuyên khoa,..."
        placeholderTextColor={props.placeholderTextColor || COLORS.Grey}
      />
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => searchFunction(searchText)}>
        <Icon
          name="search"
          color={props.iconColor ? props.iconColor : COLORS.Text}
          size={FONTSIZE.size_30}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: SPACING.space_24,
    marginHorizontal: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: COLORS.BgGrey,
    color: COLORS.Grey,
    shadowColor: 'rgba(9, 30, 66, 0.25)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  textInput: {
    width: '90%',
    fontFamily: FONTFAMILY.roboto_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_10,
  },
});

export default InputHeader;
