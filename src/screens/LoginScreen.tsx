import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {LoginUserType} from '~/services/UserService/typeUserService';
import {useMutationHooks} from '../hooks/useMutationHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDetailsUser, LoginUser} from '../services/UserService/UserService';
import {updateUser} from '../redux/slices/userSlice';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  id?: Number;
}

const LoginScreen = ({navigation}: any) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  // console.log('User data:', user);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [access_token1, setAccess_token1] = useState('');
  const [refresh_token1, setRefresh_token1] = useState('');

  const mutationLoginUser = useMutationHooks((data: LoginUserType) => {
    return LoginUser(data);
  });
  const {data: dataUser} = mutationLoginUser;

  const handleLoginUser = () => {
    if (email === '' || password === '') {
      Alert.alert('Xin hãy nhập đầy đủ thông tin');
      return;
    }
  
    const newLoginUser: LoginUserType = {
      email: email,
      password: password,
    };
  
    // Gọi mutation và xử lý kết quả
    mutationLoginUser.mutate(newLoginUser, {
      onSuccess: (dataUser) => {
        if (dataUser && Number(dataUser.errCode) === 0) {
          setAccess_token1(dataUser.tokens.accessToken);
          setRefresh_token1(dataUser.tokens.refreshToken);
  
          // Lưu token vào AsyncStorage
          storeData('access_token', JSON.stringify(dataUser.tokens.accessToken));
          storeData('refresh_token', JSON.stringify(dataUser.tokens.refreshToken));
  
          // Cập nhật người dùng vào Redux
          dispatch(
            updateUser({
              accessToken: dataUser.tokens.accessToken,
              refreshToken: dataUser.tokens.refreshToken,
              userInfo: dataUser.data,
              userRole: dataUser.data.roleId,
            })
          );
  
          // Điều hướng về trang trước
          navigation.goBack();
          setEmail('');
          setPassword('');
        }
      },
      onError: (error) => {
        // Hiển thị thông báo khi có lỗi trong quá trình gọi API
        Alert.alert('Sai mật khẩu. Vui lòng nhập lại');
      },
    });
  };
  

  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error('Error saving data', e);
    }
  };

 

  
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <AppHeader
        name="close"
        header=""
        containerStyle={{backgroundColor: COLORS.White}}
        iconColor={COLORS.Text}
        action={() => navigation.navigate('Home')}
      />

      <View style={styles.bodyContent}>
        <View>
          <Text style={styles.logoText}>
            <Text style={styles.logoTextOrange}>Med</Text>
            <Text style={styles.logoTextBlue}>Sched</Text>
          </Text>

          <Text style={styles.heading}>Thông tin đăng nhập</Text>

          <TextInput
            style={styles.input}
            placeholder="abc12@gmail.com"
            placeholderTextColor={COLORS.LightGrey}
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.inputBox}>
            <TextInput
              style={[styles.textInput]}
              onChangeText={setPassword}
              value={password}
              placeholder="Nhập mật khẩu"
              placeholderTextColor={COLORS.LightGrey}
              secureTextEntry
            />
            <TouchableOpacity style={styles.icon}>
              <Icon
                name="eye-off"
                color={COLORS.LightGrey}
                size={FONTSIZE.size_24}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>

        <View style={{gap: SPACING.space_12}}>
          <CustomButton
            title="Đăng ký tài khoản"
            style={styles.signInBtn}
            textStyle={styles.signInText}
            onPress={() => navigation.navigate('SignUp')}
          />
          <CustomButton title="Đăng nhập" onPress={handleLoginUser} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    paddingBottom: SPACING.space_20,
  },
  bodyContent: {
    flex: 1,
    justifyContent: 'space-between',
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
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: COLORS.LightGrey,
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_8,
    paddingHorizontal: SPACING.space_15,
    marginBottom: SPACING.space_15,
  },
  icon: {
    marginLeft: SPACING.space_10,
  },
  forgotPassword: {
    textAlign: 'right',
    color: COLORS.Text,
    marginTop: SPACING.space_10,
    fontSize: FONTSIZE.size_16,
  },
  textInput: {
    flex: 1,
    fontFamily: FONTFAMILY.roboto_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
});

export default LoginScreen;
