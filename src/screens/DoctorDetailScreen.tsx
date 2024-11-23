import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import {BORDERRADIUS, COLORS, SPACING} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/Feather';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/NavigationTypes';
import {
  doctorInfoDetail,
  getScheduleTime,
} from '../services/UserService/UserService';
import RenderHTML from 'react-native-render-html';

const DoctorDetailScreen = ({navigation}: any) => {
  const {width} = useWindowDimensions();
  const route = useRoute<RouteProp<RootStackParamList, 'DoctorDetail'>>();

  const {doctorId} = route.params;
  const today = new Date();
  const monthYear = today.getMonth() + 1 + '/' + today.getFullYear();
  const currentDate = String(today.getDate()).padStart(2, '0');

  const [doctorData, setDoctorData] = useState<any>(undefined);
  const [dateArr, setDateArr] = useState<any>([]);
  const [dateSelected, setDateSelected] = useState<any>(currentDate);
  const [scheduleTime, setScheduleTime] = useState<any>([]);

  useEffect(() => {
    getDoctorInfoDetail();
    const days = generateDays();
    setDateArr(days);
  }, []);

  useEffect(() => {
    handelGetScheduleByDate();
  }, [dateSelected]);

  const getDoctorInfoDetail = async () => {
    try {
      const response = await doctorInfoDetail(doctorId);
      setDoctorData(response);
    } catch (error) {
      console.log('Failed to get doctor info:', error);
    }
  };

  const generateDays = () => {
    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const days = [];
    const today = new Date();
    for (let i = 0; i < 20; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const dayOfWeek = nextDay.getDay();
      days.push({
        day: String(nextDay.getDate()).padStart(2, '0'),
        daysOfWeek: daysOfWeek[dayOfWeek],
      });
    }
    return days;
  };

  const handelGetScheduleByDate = async () => {
    try {
      const date = `${dateSelected}/${monthYear}`;
      const response = await getScheduleTime(doctorId, date);
      let scheduleTimeArr = response.map((item: any) => {
        return {
          time: item.timeData?.valueVi,
          timeType: item.timeType,
          date: item.date,
        };
      });
      setScheduleTime(scheduleTimeArr);
    } catch (error) {
      console.log('Failed to get schedule time:', error);
    }
  };

  const handleSelectedDate = (date: string) => {
    setDateSelected(date);
  };

  const handleBooking = (data: object) => {
    navigation.navigate('Booking', {
      doctorId: doctorId,
      date: data.date,
      timeType: data.timeType,
      doctorName: doctorData.lastName + ' ' + doctorData.firstName,
      clinicName: doctorData.doctorInfoData?.clinicData?.name,
      specialtyName: doctorData.doctorInfoData?.specialtyData?.valueVi,
      price: doctorData.doctorInfoData?.priceData?.valueVi,
      priceId: doctorData.doctorInfoData?.priceId,
      image: doctorData.image,
      time: data.time,
    });
  };

  // console.log('scheduleTime', scheduleTime);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <AppHeader
        name="close"
        header="Thông tin bác sĩ"
        action={navigation.goBack}
      />
      {doctorData && (
        <ScrollView style={styles.bodyContent}>
          {/* Doctor Information */}
          <View style={styles.doctorInfoContainer}>
            <Image
              source={{uri: doctorData.image}}
              style={styles.doctorImage}
            />
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorName}>
                BS {doctorData.lastName} {doctorData.firstName}
              </Text>
              <Text style={styles.doctorTitle}>
                <Icon name="check-circle" size={16} color={COLORS.MainColor} />
                {doctorData.positionData?.valueVi}
              </Text>
              <Text style={styles.doctorRole}>
                {doctorData.doctorInfoData?.clinicData?.name}
              </Text>
              <Text style={styles.specialty}>
                Chuyên khoa:{' '}
                <Text style={styles.specialtyVal}>
                  {doctorData.doctorInfoData?.specialtyData?.valueVi}
                </Text>
              </Text>
            </View>
          </View>
          {/* Booking Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Lịch khám tháng {monthYear}</Text>
            <View style={styles.dateSelector}>
              <FlatList
                data={dateArr}
                keyExtractor={(item: any) => item.day}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.containerGap24}
                renderItem={({item, index}) => {
                  // if (item.daysOfWeek !== 'CN') {
                  return (
                    <View style={styles.flexCol}>
                      <Text>
                        {item.daysOfWeek}
                        {'\n'}
                      </Text>
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleSelectedDate(item.day)}
                        style={[
                          styles.dateItem,
                          dateSelected === item.day ? styles.activeDate : {},
                        ]}>
                        <Text
                          style={
                            dateSelected === item.day
                              ? styles.activeDateText
                              : styles.dateText
                          }>
                          {item.day}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                  // }
                }}
              />
            </View>

            <View style={styles.timeSlotContainer}>
              {scheduleTime.length > 0 ? (
                scheduleTime.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.timeSlot}
                    onPress={() => handleBooking(item)}>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.dateText}>Không có lịch khám</Text>
              )}
            </View>
          </View>
          {/* Doctor Introduce */}
          <RenderHTML
            contentWidth={width}
            source={{html: doctorData.markdownData?.contentHtml}}
            tagsStyles={{
              h3: {fontSize: 16, fontWeight: 'bold', color: COLORS.Text},
              p: {fontSize: 16, lineHeight: 24, color: COLORS.Text},
            }}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    paddingBottom: SPACING.space_20,
  },
  bodyContent: {flex: 1, backgroundColor: COLORS.White, padding: 16},
  doctorInfoContainer: {flexDirection: 'row', marginBottom: 16},
  doctorImage: {width: 100, height: 100, borderRadius: 50},
  doctorDetails: {marginLeft: 16},
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.Text,
    marginTop: 4,
  },
  doctorTitle: {
    fontSize: 14,
    color: COLORS.MainColor,
    fontWeight: '600',
    marginTop: 4,
  },
  doctorRole: {fontSize: 14, marginTop: 4},
  specialty: {fontSize: 14, marginTop: 4, width: 'auto'},
  specialtyVal: {
    fontSize: 14,
    color: COLORS.MainColor,
    fontWeight: '600',
  },
  sectionContainer: {marginVertical: 16},
  sectionTitle: {fontSize: 16, fontWeight: 'bold', marginBottom: 8},
  dateSelector: {flexDirection: 'row', justifyContent: 'space-between'},
  containerGap24: {columnGap: 24},
  flexCol: {flexDirection: 'column', alignItems: 'center'},
  dateItem: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: COLORS.BgGrey,
  },
  activeDate: {backgroundColor: '#0066cc'},
  dateText: {fontSize: 18, fontWeight: 'bold', color: COLORS.Text},
  activeDateText: {color: COLORS.White, fontWeight: 'bold', fontSize: 18},
  timeSlotContainer: {flexDirection: 'row', marginTop: 24},
  timeSlot: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: BORDERRADIUS.radius_8,
    marginHorizontal: 4,
    borderColor: COLORS.Border,
    borderWidth: 1,
  },
  timeText: {
    fontSize: 16,
    color: COLORS.Text,
  },
});

export default DoctorDetailScreen;
