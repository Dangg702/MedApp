import React from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';

const HomeHeader = (props: any) => {
  return (
    <View style={[styles.header, props.bgColor]}>
      <View>
        <Text style={[styles.greetingText, props.greetingTextStyle]}>
          Xin chào!!
        </Text>
        {props.isLogin ? (
          <Text style={[styles.nameText, props.nameTextStyle]}>
            {props.userName}
          </Text>
        ) : (
          <TouchableOpacity onPress={() => props.navigateToLogin()}>
            <Text style={[styles.nameText]}>Đăng ký/ Đăng nhập</Text>
          </TouchableOpacity>
        )}
      </View>
      {props.isLogin && (
        <Image
          source={{uri: props.avatarUrl}}
          style={[styles.profileImage, props.profileImageStyle]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.space_20,
    backgroundColor: COLORS.MainColor,
    width: '100%',
    height: 108,
    paddingHorizontal: SPACING.space_20,
  },
  greetingText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
  nameText: {
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
    color: COLORS.White,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 100,
  },
});

export default HomeHeader;
