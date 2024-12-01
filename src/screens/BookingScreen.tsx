import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  useWindowDimensions,
  ScrollView,
  FlatList,
  Linking,
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
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/NavigationTypes';
import {bookAppointment} from '../services/UserService/UserService';

import axios from 'axios';


const BookingScreen = ({navigation}: any) => {
  const user = useSelector((state: RootState) => state.user);
  console.log('user', user);
  const route = useRoute<RouteProp<RootStackParamList, 'Booking'>>();
  const {
    doctorId,
    doctorName,
    date,
    timeType,
    time,
    specialtyName,
    clinicName,
    image,
    price,
  } = route.params;
  const handleBooking = async () => {
    const response = await bookAppointment({
      patientId: user.userInfo.id,
      doctorId,
      doctorName,
      date,
      timeType,
      language: 'vi',
      timeVal: time,
    });
    if (response) {
      Alert.alert(response.message);
      navigation.navigate('Scheduled');
    } else {
      Alert.alert('Đặt lịch thất bại');
    }
  };
 
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <AppHeader
        name="close"
        header="Đặt lịch khám"
        action={navigation.goBack}
      />
      <ScrollView>
        <Text style={styles.titleText}>Thông tin đăng ký</Text>
        <View style={styles.bookingInfoWrapper}>
          <View style={styles.doctorInfoWrapper}>
            <Image source={{uri: image}} style={styles.doctorImage} />
            <View style={styles.doctorInfo}>
              <Text style={styles.textStrong}>BS. {doctorName}</Text>
              <Text style={styles.textBody}>Chuyên khoa: {specialtyName}</Text>
              <Text style={styles.textBody}>{clinicName}</Text>
            </View>
          </View>
          <View
            style={[
              styles.rowDisplay,
              styles.dateTimeWrapper,
              styles.paddingHorizontal16,
            ]}>
            <View style={styles.dateWrapper}>
              <Text>Giờ khám</Text>
              <Text style={styles.textStrong}>{time}</Text>
            </View>
            <View style={styles.timeWrapper}>
              <Text>Ngày khám</Text>
              <Text style={styles.textStrong}>{date}</Text>
            </View>
          </View>
          <View style={styles.paddingHorizontal16}>
            <Text style={styles.subTitleText}>Thông tin bệnh nhân</Text>
            <View style={styles.marginBottom12}>
              <Text>Họ và tên</Text>
              <Text style={styles.textStrong}>
                {user.userInfo.lastName} {user.userInfo.firstName}
              </Text>
            </View>
            <View style={[styles.rowDisplay, styles.marginBottom12]}>
              <View>
                <Text>Giới tính</Text>
                <Text style={styles.textStrong}>
                  {user.userInfo.gender === 'F' ? 'Nữ' : 'Nam'}
                </Text>
              </View>
              <View>
                <Text>Số điện thoại</Text>
                <Text style={styles.textStrong}>
                  {user.userInfo.phoneNumber}
                </Text>
              </View>
            </View>
            <View style={styles.marginBottom12}>
              <Text>Email</Text>
              <Text style={styles.textStrong}>{user.userInfo.email}</Text>
            </View>
            <View style={styles.marginBottom12}>
              <Text>Địa chỉ</Text>
              <Text style={styles.textStrong}>{user.userInfo.address}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.titleText}>Chi tiết thanh toán</Text>
        <View style={styles.bookingInfoWrapper}>
          <View style={styles.paddingHorizontal16}>
            <View>
              <Text>Phí khám</Text>
              <Text style={styles.textStrong}>{price} VND</Text>
            </View>
            <View style={styles.breakLine}></View>
            <View style={styles.marginBottom12}>
              <Text>Tổng thanh toán</Text>
              <Text style={styles.textStrong}>{price} VND</Text>
            </View>
          </View>
        </View>
        <CustomButton
          title={'Xác nhận đặt lịch'}
          style={{margin: 12}}
          onPress={handleBooking}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BgGrey,
    paddingBottom: SPACING.space_20,
  },
  titleText: {
    textTransform: 'uppercase',
    fontSize: FONTSIZE.size_16,
    color: COLORS.Text,
    fontWeight: '600',
    marginTop: 18,
    marginBottom: SPACING.space_12,
    marginLeft: SPACING.space_16,
  },
  subTitleText: {
    textTransform: 'uppercase',
    fontSize: FONTSIZE.size_14,
    color: COLORS.LightGrey,
    fontWeight: '600',
    marginBottom: SPACING.space_12,
  },
  textBody: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  textStrong: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.Text,
    fontWeight: '600',
  },
  bookingInfoWrapper: {
    backgroundColor: COLORS.White,
    padding: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_15,
    marginHorizontal: SPACING.space_16,
  },
  doctorInfoWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: SPACING.space_16,
    borderColor: COLORS.Border,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: BORDERRADIUS.radius_25 * 4,
    objectFit: 'cover',
  },
  doctorInfo: {
    flex: 1,
    marginLeft: SPACING.space_8,
  },
  rowDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimeWrapper: {
    marginTop: SPACING.space_16,
    marginBottom: SPACING.space_20,
  },
  paddingHorizontal16: {
    paddingHorizontal: SPACING.space_16,
  },
  marginBottom12: {
    marginBottom: SPACING.space_12,
  },
  breakLine: {
    borderBottomWidth: 1,
    borderColor: COLORS.Border,
    marginVertical: SPACING.space_8,
  },
});

export default BookingScreen;
