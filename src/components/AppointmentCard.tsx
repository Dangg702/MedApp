import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import Icon from 'react-native-vector-icons/Feather';
import {cancelAppointment} from '../services/UserService/UserService';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/NavigationTypes';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useMutationHooks} from '../hooks/useMutationHooks';
import {
  CancelAppointmentType,
  CancelResponseType,
} from '../services/UserService/typeUserService';
import {resetAppointment} from '../redux/slices/appointmentSlice';
import userService from '../services/UserService/UserService';
import axios from 'axios';
export const axiosJWT = axios.create();
import {API_URL} from '@env';
const AppointmentCard = (props: any) => {
  const dispatch = useDispatch();
  const scheduledData = useSelector((state: RootState) => state.appointment);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    doctorId,
    doctorImage,
    doctorName,
    hospitalName,
    aptmDate,
    aptmTime,
    specialtyName,
    patientName,
    patientId,
    aptmTimeType,
  } = props.data;
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/list-my-appointment?id=${patientId}`);
        if (response.data.errCode === 0) {
          setAppointments(response.data.data);
          const appointments = response.data.data;
          const appointmentIds = appointments.map(appointment => appointment.id);
          console.log('Appointment IDs:', appointmentIds);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch appointments');
        console.log('err:',err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientId]);
  const mutationAppointment = useMutationHooks<
    CancelResponseType,
    CancelAppointmentType
  >(cancelData => cancelAppointment(cancelData));
  const {data} = mutationAppointment;

  const handleCancelAppointment = async () => {
    const bookingId = appointments.length > 0 ? appointments[0].id : null;
    const doctorId = appointments.length > 0 ? appointments[0].doctorId : null;
    const patientId = appointments.length > 0 ? appointments[0].patientId : null;
    const date = appointments.length > 0 ? appointments[0].date : null;
    const timeType = appointments.length > 0 ? appointments[0].timeType : null;

    let cancelData = {
      doctorId: doctorId,
      patientId: patientId,
      date: date,
      timeType: timeType,
      bookingId: bookingId,
    };
    console.log('cancelData',cancelData);
    try {
      // const response = await cancelAppointment(cancelData);
      mutationAppointment.mutate(cancelData, {
        onSuccess: () => {
          dispatch(resetAppointment()); // Redux update
        },
        onError: (error) => {
          Alert.alert('Lỗi', 'Không thể hủy lịch.');
          console.log(error);
        },
      });
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi hủy lịch.');
      console.log('Error when cancel appointment: ', error);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.appointmentCard, props.cardStyle]}
      onPress={props.pressAppointment && props.pressAppointment}>
      <View style={styles.appointmentInfo}>
        <Image source={{uri: doctorImage}} style={styles.doctorImage} />
        <View style={{marginLeft: SPACING.space_12}}>
          <Text style={[styles.doctorName, props.textStyle]}>
            Bác sĩ {doctorName}
          </Text>
          <Text style={[styles.hospitalName, props.textStyle]}>
            {hospitalName}
          </Text>
        </View>
      </View>
      <View style={[styles.breakLine, props.breakLineStyle]} />
      {patientName ? (
        <View>
          <View style={styles.appointmentDetailsWrapper}>
            <Text>Giờ khám</Text>
            <Text style={styles.textColor}>
              {aptmTime} - {aptmDate}
            </Text>
          </View>
          <View style={styles.appointmentDetailsWrapper}>
            <Text>Chuyên khoa</Text>
            <Text style={styles.textColor}>{specialtyName}</Text>
          </View>
          <View style={styles.appointmentDetailsWrapper}>
            <Text>Bệnh nhân</Text>
            <Text style={styles.textColor}>{patientName}</Text>
          </View>
          <View style={styles.appointmentDetailsWrapper}>
            <Text></Text>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                Alert.alert(
                  'Xác nhận',
                  'Bạn có chắc chắn muốn hủy lịch hẹn này?',
                  [
                    {text: 'Không', style: 'cancel'},
                    {
                      text: 'Đồng ý',
                      onPress: handleCancelAppointment,
                    },
                  ],
                );
              }}>
              <Text style={[styles.cancelText]}>Hủy lịch</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.appointmentDetailsWrapper}>
          <View style={styles.appointmentDetails}>
            <Icon name="calendar" size={20} color="white" />
            <Text style={[styles.appointmentText, props.textStyle]}>
              {aptmDate}
            </Text>
          </View>
          <View style={styles.appointmentDetails}>
            <Icon name="clock" size={20} color="white" />
            <Text style={[styles.appointmentText, props.textStyle]}>
              {aptmTime}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  breakLine: {
    width: '100%',
    height: 1,
    backgroundColor: 'white',
    marginVertical: SPACING.space_15,
  },
  textColor: {
    color: COLORS.Text,
  },
  appointmentCard: {
    flexDirection: 'column',
    backgroundColor: COLORS.MainColor,
    padding: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_10,
    alignItems: 'center',
    marginHorizontal: SPACING.space_18,
    marginBottom: SPACING.space_20,
    height: 168,
    width: width*0.96,
  },
  doctorImage: {
    width: 64,
    height: 64,
    borderRadius: 100,
  },
  appointmentInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: SPACING.space_15,
    flex: 1,
    // width: '100%',
    width: width*0.8,
    height: 'auto',
  },
  doctorName: {
    color: COLORS.White,
    fontWeight: '600',
    fontSize: FONTSIZE.size_16,
  },
  hospitalName: {
    color: COLORS.White,
    marginBottom: SPACING.space_8,
    fontSize: FONTSIZE.size_16,
    flexWrap: 'wrap',
    width: width*0.96, // Đảm bảo chữ nằm trong khung
  },
  appointmentDetailsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  appointmentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentText: {
    color: COLORS.White,
    marginLeft: SPACING.space_8,
    fontSize: FONTSIZE.size_16,
  },
  cancelBtn: {
    backgroundColor: COLORS.White,
    padding: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_8,
    borderWidth: 1,
    borderColor: COLORS.Red,
    borderStyle: 'solid',
    width: 130,
    marginTop: SPACING.space_12,
  },
  cancelText: {
    color: COLORS.Red,
    textAlign: 'center',
    fontSize: FONTSIZE.size_16,
  },
});

export default AppointmentCard;
