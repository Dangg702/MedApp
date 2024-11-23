import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';
import {ScrollView} from 'react-native';
import {resetUser} from '../redux/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '../redux/store';
import Icon from 'react-native-vector-icons/Feather';

const UserAccountScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  // console.log('UserAccountScreen user', user);

  const onPressSetting = () => {
    navigation.navigate('Settings');
  };
  const handleLogoutUser = async () => {
    // Xóa token khỏi AsyncStorage
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
    } catch (e) {
      console.error('Error clearing tokens', e);
    }

    // Đặt lại Redux state của người dùng
    dispatch(resetUser());

    navigation.navigate('LogIn');
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />

      {user.isLoggedIn ? (
        <View style={styles.profileContainer}>
          <Image
            source={{uri: user.userInfo.image}}
            style={styles.avatarImage}
          />
          <View style={styles.profileDetailWrapper}>
            <Text style={styles.avatarText}>
              {user.userInfo.lastName} {user.userInfo.firstName}
            </Text>
            <Text style={styles.subAvatarText}>{user.userInfo.email}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.askLoginContainer}>
          <Text style={styles.avatarText}>Chưa là thành viên?</Text>
          <Text style={styles.subAvatarText}>Đăng ký hoặc đăng nhập ngay</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('LogIn')}
            style={styles.btnStyle}>
            <Text style={styles.textBtn}>
              <Icon name="user" size={20} color={COLORS.White} /> Đăng ký / Đăng
              nhập
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.settingContainer}>
        <SettingComponent
          icon="file-minus"
          iconColor={COLORS.MainColor}
          heading="Hồ sơ y tế"
          moreIcon={true}
        />
        <SettingComponent
          icon="heart"
          iconColor={COLORS.Red}
          heading="Danh sách quan tâm"
          moreIcon={true}
        />
        <SettingComponent
          icon="map-pin"
          iconColor={COLORS.MainColor}
          heading="Quản lý sổ địa chỉ"
          moreIcon={true}
        />
      </View>

      <View style={styles.settingContainer}>
        <SettingComponent
          icon="alert-circle"
          iconColor={COLORS.Yellow}
          heading="Điều khoản, Quy định"
          moreIcon={true}
        />
        <SettingComponent
          icon="share-2"
          iconColor={COLORS.Purple}
          heading="Chia sẻ ứng dụng"
        />
        <SettingComponent
          icon="headphones"
          iconColor={COLORS.Blue}
          heading="Liên hệ & hỗ trợ"
        />
        {user.isLoggedIn && (
          <>
            <SettingComponent
              icon="settings"
              iconColor={COLORS.Text}
              heading="Cài đặt"
              moreIcon={true}
              onPress={() => onPressSetting()}
            />
            <SettingComponent
              icon="log-out"
              iconColor={COLORS.Orange}
              heading="Đăng xuất"
              onPress={() => handleLogoutUser()}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.BgGrey,
    paddingHorizontal: SPACING.space_12,
  },
  askLoginContainer: {
    padding: SPACING.space_28,
    backgroundColor: COLORS.White,
    borderRadius: SPACING.space_20,
    marginVertical: SPACING.space_24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profileContainer: {
    flexDirection: 'row',
    gap: SPACING.space_12,
    alignItems: 'center',
    padding: SPACING.space_28,
    backgroundColor: COLORS.White,
    borderRadius: SPACING.space_20,
    marginVertical: SPACING.space_24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
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
    marginBottom: SPACING.space_24,
  },
  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  profileDetailWrapper: {
    flexDirection: 'column',
  },
  avatarText: {
    fontFamily: FONTFAMILY.roboto_bold,
    fontSize: FONTSIZE.size_16,
    marginTop: SPACING.space_16,
    color: COLORS.Text,
    fontWeight: 'bold',
  },
  subAvatarText: {
    fontFamily: FONTFAMILY.roboto_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.Text,
  },
  btnStyle: {
    backgroundColor: COLORS.MainColor,
    padding: SPACING.space_12,
    borderRadius: SPACING.space_36,
    marginTop: SPACING.space_12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
  },
  textBtn: {
    alignItems: 'center',
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
  },
});

export default UserAccountScreen;
