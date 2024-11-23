import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';

const {width} = Dimensions.get('window');

const SettingScreen = ({navigation}: any) => {
  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar hidden />

      <View>
        <AppHeader
          name="close"
          header={'Cài đặt'}
          action={() => navigation.goBack()}
        />
      </View>

      <View style={styles.settingContainer}>
        <SettingComponent
          icon="refresh-cw"
          iconColor={COLORS.Yellow}
          heading="Thay đổi mật khẩu"
          moreIcon={true}
          navigateTo={() => navigation.navigate('ResetPassword')}
        />
        <SettingComponent
          icon="user-minus"
          iconColor={COLORS.Red}
          heading="Yêu cầu hủy tài khoản"
          moreIcon={true}
          navigateTo={() => navigation.navigate('ConfirmDelAccount')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.BgGrey,
  },
  settingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: SPACING.space_28,
    backgroundColor: COLORS.White,
    borderRadius: SPACING.space_20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginVertical: SPACING.space_32,
    marginHorizontal: SPACING.space_12,
  },
});

export default SettingScreen;
