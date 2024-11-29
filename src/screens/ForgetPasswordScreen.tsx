import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, Text, TextInput} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import CustomButton from '../components/CustomButton';

const ForgetPasswordScreen = ({navigation}: any) => {
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [isSendOtp, setIsSendOtp] = useState<boolean>(false);
  const [isVerify, setIsVerify] = useState<boolean>(false);

  const handleSendOtp = () => {
    if (!isSendOtp) {
      setIsSendOtp(true);
      setIsVerify(false);
      // Call API to send OTP
    } else if (!isVerify) {
      setIsVerify(true);
      // Call API to verify OTP
    } else {
      // Call API to reset password
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View>
        <AppHeader
          name="close"
          header={''}
          containerStyle={{backgroundColor: COLORS.White}}
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
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Nhập lại mật khẩu mới"
                placeholderTextColor={COLORS.LightGrey}
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
            <CustomButton title="Hoàn tất" onPress={handleSendOtp} />
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
  signInBtn: {
    backgroundColor: COLORS.BgGrey,
    borderWidth: 1,
    borderColor: COLORS.LightGrey,
  },
  signInText: {
    color: COLORS.Grey,
    fontSize: FONTSIZE.size_16,
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
  },
  icon: {
    marginRight: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_10,
  },
  flexOne: {
    flex: 1,
  },
  forgotPassword: {
    textAlign: 'right',
    color: COLORS.Text,
    marginTop: SPACING.space_10,
    fontSize: FONTSIZE.size_16,
  },
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    fontFamily: FONTFAMILY.roboto_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
});

export default ForgetPasswordScreen;
