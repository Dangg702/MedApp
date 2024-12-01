import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Text, TextInput, Alert } from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import {API_URL} from '@env';

const ForgetPasswordScreen = ({ navigation }: any) => {
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [isSendOtp, setIsSendOtp] = useState<boolean>(false);
  const [isVerify, setIsVerify] = useState<boolean>(false);

  // Gửi yêu cầu kiểm tra email và gửi OTP
  const handleSendOtp = async () => {
    if (!isSendOtp) {
      try {
        const response = await axios.post(`${API_URL}/check-email`, { emailUser: email });
        if (response.data.status === 'OK') {
          Alert.alert('Thông báo', 'OTP đã được gửi đến email của bạn.');
          setIsSendOtp(true);
        } else {
          Alert.alert('Thông báo', 'Email không tồn tại.');
        }
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể gửi OTP.');
      }
    } else if (!isVerify) {
      try {
        const response = await axios.post(`${API_URL}/check-otp`, { otp, email });
        if (response.data.status === 'OK') {
          Alert.alert('Thông báo', 'OTP xác thực thành công.');
          setIsVerify(true);
        } else {
          Alert.alert('Thông báo', 'OTP không hợp lệ hoặc đã hết hạn.');
        }
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể xác thực OTP.');
      }
    }
  };

  // Đặt lại mật khẩu
  const handleChangePassword = async () => {
    console.log(otp,
      email,
      password,
      rePassword,);
    if (password !== rePassword) {
      Alert.alert('Thông báo', 'Mật khẩu không khớp.');
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/change-password`, {
        otp,
        email,
        anewpassword: password,
        passwordRetrieval:rePassword,
      });
      if (response.data.status === 'OK') {
        Alert.alert('Thông báo', 'Mật khẩu đã được thay đổi thành công.');
        navigation.goBack();
      } else {
        Alert.alert('Thông báo', 'Thay đổi mật khẩu thất bại.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thay đổi mật khẩu.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
        <AppHeader
          name="close"
          header={''}
          containerStyle={{ backgroundColor: COLORS.White }}
          iconColor={COLORS.Text}
          action={() => navigation.goBack()}
        />
      </View>

      <View style={styles.bodyContent}>
        <View>
          <Text style={styles.logoText}>
            <Text style={styles.logoTextOrange}>Med</Text>
            <Text style={styles.logoTextBlue}>Sched</Text>
          </Text>
          {!isSendOtp ? (
            <>
              <Text style={styles.heading}>Quên mật khẩu</Text>
              <Text style={styles.heading}>
                Nhập email đã đăng ký để nhận mã xác thực
              </Text>
              <TextInput
                style={styles.input}
                placeholder="abc12@gmail.com"
                placeholderTextColor={COLORS.LightGrey}
                value={email}
                onChangeText={setEmail}
              />
            </>
          ) : !isVerify ? (
            <>
              <Text style={styles.heading}>Xác thực OTP</Text>
              <Text style={styles.heading}>
                Nhập mã xác thực đã gửi đến email
              </Text>
              <TextInput
                style={styles.input}
                placeholder="123456"
                placeholderTextColor={COLORS.LightGrey}
                value={otp}
                onChangeText={setOtp}
              />
            </>
          ) : (
            <>
              <Text style={styles.heading}>Đặt lại mật khẩu</Text>
              <Text style={styles.heading}>Nhập mật khẩu mới để cập nhật</Text>
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu mới"
                placeholderTextColor={COLORS.LightGrey}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Nhập lại mật khẩu mới"
                placeholderTextColor={COLORS.LightGrey}
                secureTextEntry
                value={rePassword}
                onChangeText={setRePassword}
              />
            </>
          )}
        </View>

        <View>
          {!isVerify ? (
            <CustomButton title="Tiếp tục" onPress={handleSendOtp} />
          ) : (
            <CustomButton title="Hoàn tất" onPress={handleChangePassword} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.White,
    marginBottom: SPACING.space_20,
    flex: 1,
  },
  bodyContent: {
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: SPACING.space_20,
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: SPACING.space_20,
  },
  logoTextOrange: {
    color: COLORS.SubColor,
  },
  logoTextBlue: {
    color: COLORS.MainColor,
  },
  heading: {
    fontSize: FONTSIZE.size_18,
    fontWeight: '500',
    marginBottom: SPACING.space_20,
    color: COLORS.Text,
  },
  input: {
    height: 50,
    borderColor: COLORS.LightGrey,
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_8,
    paddingHorizontal: SPACING.space_15,
    fontSize: FONTSIZE.size_16,
    marginBottom: SPACING.space_15,
    color:COLORS.Black,

  },
});

export default ForgetPasswordScreen;
