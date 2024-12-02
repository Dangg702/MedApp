import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/Feather';
import {
  checkEmailSignUp,
  verifyOtpCode,
  registerUser,
} from '../services/UserService/UserService';

const {width} = Dimensions.get('window');

const SignUpScreen = ({navigation}: any) => {
  const [firstName, setFisrtName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [step, setStep] = useState<string>('s1');

  const handleStep = async () => {
    if (step === 's1') {
      // call api to send otp
      let response = await checkEmailSignUp(email);
      if (response && response.errCode === 0) {
        setStep('s2');
      } else {
        Alert.alert('Thông báo', response.message);
      }
    } else if (step === 's2' && otp) {
      // call api to verify otp
      console.log('otp', otp);
      let response = await verifyOtpCode(otp);
      if (response && response.errCode === 0) {
        setStep('s3');
      } else {
        Alert.alert('Thông báo', response.message);
      }
    } else {
      // call api to register
      let newUser = {
        firstName,
        lastName,
        email,
        password,
      };
      let response = await registerUser(newUser);
      if (response && response.errCode === 0) {
        navigation.navigate('LogIn');
      } else {
        Alert.alert('Thông báo', response.message);
      }
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

          {step === 's1' && (
            <>
              <Text style={styles.heading}>Thông tin đăng ký</Text>
              <TextInput
                style={styles.input}
                placeholder="abc12@gmail.com"
                placeholderTextColor={COLORS.LightGrey}
                value={email}
                onChangeText={setEmail}
              />
            </>
          )}
          {step === 's2' && (
            <View>
              <Text style={styles.heading}>
                Nhập mã xác thực đã được gửi đến email {email}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="123456"
                placeholderTextColor={COLORS.LightGrey}
                value={otp}
                onChangeText={setOtp}
              />
              <Text style={styles.descOtp}>Không nhận được mã OTP?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgetPassword')}>
                <Text style={styles.descOtp}>Gửi lại</Text>
              </TouchableOpacity>
              <Text style={styles.descOtp}>Thay đổi email khác</Text>
            </View>
          )}
          {step === 's3' && (
            <>
              <Text style={styles.heading}>Hoàn tất đăng ký</Text>
              <TextInput
                style={styles.input}
                placeholder="Tên"
                placeholderTextColor={COLORS.LightGrey}
                onChangeText={textInput => setLastName(textInput)}
                value={lastName}
              />
              <TextInput
                style={styles.input}
                placeholder="Họ"
                placeholderTextColor={COLORS.LightGrey}
                onChangeText={textInput => setFisrtName(textInput)}
                value={firstName}
              />
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu"
                placeholderTextColor={COLORS.LightGrey}
                onChangeText={textInput => setPassword(textInput)}
                value={password}
                secureTextEntry
              />
              <View style={[styles.inputBox, styles.input]}>
                <TextInput
                  style={[styles.textInput]}
                  placeholder="Nhập lại mật khẩu"
                  placeholderTextColor={COLORS.LightGrey}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
                <Icon
                  name="eye-off"
                  color={COLORS.LightGrey}
                  size={FONTSIZE.size_24}
                />
              </View>
            </>
          )}
        </View>

        <View>
          <CustomButton
            title={step === 's3' ? 'Đăng ký' : 'Tiếp tục'}
            textStyle={{fontWeight: '600'}}
            onPress={handleStep}
          />
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
    color:COLORS.Black,

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
  descOtp: {
    textAlign: 'center',
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
    fontSize: FONTSIZE.size_16,
    color: COLORS.Grey,
  },
});

export default SignUpScreen;
