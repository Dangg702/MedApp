import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('window');

const ForgetPasswordScreen = ({navigation}: any) => {
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

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
        </View>

        <View>
          <CustomButton title="Tiếp tục" />
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
