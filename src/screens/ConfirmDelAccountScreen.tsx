import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import CustomButton from '../components/CustomButton';

const {width} = Dimensions.get('window');

const ConfirmDelAccountScreen = ({navigation}: any) => {
  const [password, setPassword] = useState<string>('');

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View>
        <AppHeader
          name="close"
          header={'Xác nhận mật khẩu'}
          action={() => navigation.goBack()}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.warningContainer}>
          <Icon
            name="alert-triangle"
            size={42}
            color="#f28c38"
            style={styles.warningIcon}
          />
          <Text style={styles.warningText}>
            Nhập lại mật khẩu để xác nhận xóa tài khoản. Tài khoản bị xóa sẽ mất
            tất cả dữ liệu và không thể khôi phục. Cài đặt khám sẽ bị hủy và
            không hoàn tiền.
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/image/confirmDelAcc.png')}
            style={styles.image}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <CustomButton
          title="Xác nhận xóa"
          style={password === '' ? styles.button : styles.buttonActive}
          textStyle={
            password === '' ? styles.buttonText : styles.buttonTextActive
          }
        />
        {/* <TouchableOpacity
          style={password === '' ? styles.button : styles.buttonActive}>
          <Text
            style={
              password === '' ? styles.buttonText : styles.buttonTextActive
            }>
            Xác nhận xóa
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.White,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: SPACING.space_20,
  },
  content: {
    flex: 1,
    padding: SPACING.space_16,
    alignItems: 'center',
  },
  warningContainer: {
    padding: SPACING.space_16,
    alignItems: 'center',
    marginBottom: SPACING.space_16,
    flexDirection: 'row',
  },
  warningIcon: {
    marginRight: SPACING.space_10,
  },
  warningText: {
    color: COLORS.Grey,
    fontSize: FONTSIZE.size_16,
    flex: 1,
  },
  imageContainer: {
    width: 210,
    height: 160,
    borderRadius: 36,
    backgroundColor: COLORS.BgGrey,
    overflow: 'hidden',
    marginBottom: SPACING.space_20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: COLORS.Border,
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_8,
    paddingHorizontal: SPACING.space_10,
    marginBottom: SPACING.space_16,
  },
  button: {
    marginHorizontal: SPACING.space_16,
    borderColor: COLORS.Border,
    borderWidth: 2,
    paddingVertical: SPACING.space_10,
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_8,
    width: '100%',
    backgroundColor: COLORS.White,
  },
  buttonText: {
    color: COLORS.LightGrey,
    fontSize: FONTSIZE.size_16,
  },
  buttonActive: {
    marginHorizontal: SPACING.space_16,
    borderColor: COLORS.Red,
    borderWidth: 2,
    paddingVertical: SPACING.space_10,
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_8,
    width: '100%',
    backgroundColor: COLORS.White,
  },
  buttonTextActive: {
    color: COLORS.Red,
    fontSize: FONTSIZE.size_16,
  },
});

export default ConfirmDelAccountScreen;
