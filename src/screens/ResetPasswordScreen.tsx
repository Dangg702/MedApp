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
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import CustomButton from '../components/CustomButton';

const {width} = Dimensions.get('window');

const ResetPasswordScreen = ({navigation}: any) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View>
        <AppHeader
          name="close"
          header={'Thay đổi mật khẩu'}
          action={() => navigation.goBack()}
        />
      </View>

      <View style={styles.resetPasswordForm}>
        <Text style={styles.label}>
          Mật khẩu hiện tại <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu hiện tại của bạn"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />

        <Text style={styles.label}>
          Mật khẩu mới <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu mới"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text style={styles.label}>
          Nhập lại mật khẩu mới <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu mới"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <CustomButton title="Thay đổi" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.White,
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: SPACING.space_20,
  },
  resetPasswordForm: {
    paddingHorizontal: SPACING.space_16,
    paddingVertical: SPACING.space_24,
    flex: 1,
  },
  label: {
    fontSize: FONTSIZE.size_16,
    marginBottom: SPACING.space_8,
  },
  required: {
    color: COLORS.Red,
  },
  input: {
    height: 40,
    borderColor: COLORS.Border,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color:COLORS.Black,
  },
});

export default ResetPasswordScreen;
