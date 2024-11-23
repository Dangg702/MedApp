import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {COLORS, SPACING, FontFamily} from '../theme/theme';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import HomeHeader from '../components/HomeHeader';
import HomeFeatureBtn from '../components/HomeFeatureBtn';
import AppointmentCard from '../components/AppointmentCard';
import HomeIntroCard from '../components/HomeIntroCard';
import {
  getDoctorList,
  getSpecialtyList,
  getHospitalList,
  getListAppointmentOfPatient,
} from '../services/UserService/UserService';
import {updateAppointment} from '../redux/slices/appointmentSlice';
import {useMutationHooks} from '../hooks/useMutationHooks';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const appointment = useSelector((state: RootState) => state.appointment);
  // console.log('User data home:', user);
  // console.log('appointment data home:', appointment);
  const [doctorList, setDoctorList] = useState<any>(undefined);
  const [specialtyList, setSpecialtyList] = useState<any>(undefined);
  const [hospitalList, setHospitalList] = useState<any>(undefined);
  const [isScheduled, setIsScheduled] = useState<boolean>(false);

  // const mutationAppointment = useMutationHooks((patientId: Number) => {
  //   return getListAppointmentOfPatient(patientId);
  // });
  const mutationAppointment = useMutationHooks(
    async (patientId: number) => {
      return await getListAppointmentOfPatient(patientId);
    },
    {
      onSuccess: data => {
        if (data) {
          const lastItemData = data.at(-1);
          const newData = {
            doctorImage: lastItemData.doctorBookingData.image,
            doctorName: `${lastItemData.doctorBookingData.lastName} ${lastItemData.doctorBookingData.firstName}`,
            hospitalName:
              lastItemData.doctorBookingData.doctorInfoData.clinicData.name,
            aptmDate: lastItemData.date,
            aptmTime: lastItemData.timeBookingData.valueVi,
            specialtyName:
              lastItemData.doctorBookingData.doctorInfoData.specialtyData
                .valueVi,
            patientName: `${user.userInfo.lastName} ${user.userInfo.firstName}`,
            patientId: user.userInfo.id,
            doctorId: lastItemData.doctorBookingData.id,
            aptmTimeType: lastItemData.timeBookingData.keyMap,
            scheduledId: lastItemData.id,
          };

          dispatch(updateAppointment(newData)); // Cập nhật Redux state
          setIsScheduled(true);
        } else {
          setIsScheduled(false);
        }
      },
    },
  );

  // const {data: scheduledData} = mutationAppointment;
  // console.log('Scheduled data:', scheduledData);

  useEffect(() => {
    (async () => {
      let tempDoctor = await getDoctorList(20);
      setDoctorList(tempDoctor.doctors);
      let tempSpecialty = await getSpecialtyList('ALL', 1, 50);
      setSpecialtyList(tempSpecialty.data);
      let tempHospital = await getHospitalList();
      setHospitalList(tempHospital.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      getUserScheduled();
    })();
  }, [isScheduled, appointment]);

  const featureFunction = (role: string) => {
    navigation.navigate('Search', {role: role});
  };

  const getUserScheduled = async () => {
    if (user.isLoggedIn) {
      const patientId = user.userInfo.id;
      //call api and update redux
      mutationAppointment.mutate(patientId);
    }
  };

  // if (
  //   doctorList == undefined &&
  //   doctorList == null &&
  //   specialtyList == undefined &&
  //   specialtyList == null &&
  //   hospitalList == undefined &&
  //   hospitalList == null
  // ) {
  //   return (
  //     <ScrollView
  //       style={styles.container}
  //       bounces={false}
  //       contentContainerStyle={styles.scrollViewContainer}>
  //       <StatusBar hidden />
  //       <View style={styles.loadingContainer}>
  //         <ActivityIndicator size={'large'} color={COLORS.MainColor} />
  //       </View>
  //     </ScrollView>
  //   );
  // }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar hidden />
      {!user.isLoggedIn ? (
        <>
          {/* // Header */}
          <HomeHeader
            isLogin={user.isLoggedIn}
            navigateToLogin={() => navigation.navigate('LogIn')}
          />
        </>
      ) : (
        <>
          {/* // Header & Scheduled */}
          {!isScheduled && appointment.aptmDate === '' ? (
            <HomeHeader
              isLogin={user.isLoggedIn}
              userName={`${user.userInfo.lastName} ${user.userInfo.firstName}`}
              avatarUrl={user.userInfo.image}
            />
          ) : (
            <>
              <HomeHeader
                isLogin={user.isLoggedIn}
                userName={`${user.userInfo.lastName} ${user.userInfo.firstName}`}
                avatarUrl={user.userInfo.image}
                bgColor={{backgroundColor: COLORS.White}}
                greetingTextStyle={{color: COLORS.LightGrey}}
                nameTextStyle={{color: COLORS.Text}}
              />
              {appointment.aptmDate !== '' && (
                <AppointmentCard
                  data={
                    appointment
                      ? {
                          doctorImage: appointment.doctorImage,
                          doctorName: appointment.doctorName,
                          hospitalName: appointment.hospitalName,
                          aptmDate: appointment.aptmDate,
                          aptmTime: appointment.aptmTime,
                          specialtyName: appointment.specialtyName,
                        }
                      : undefined
                  }
                  pressAppointment={() => navigation.navigate('Scheduled')}
                />
              )}
            </>
          )}
        </>
      )}
      {/* // search */}
      <InputHeader />
      {/* Feature */}
      <View style={styles.features}>
        <HomeFeatureBtn
          title="Bác sĩ"
          iconName="stethoscope"
          iconColor={COLORS.White}
          gradientColors={['#ff7e5f', '#FF5524']}
          onPressFeature={() => featureFunction('doctor')}
        />
        <HomeFeatureBtn
          title="Bệnh viện"
          iconName="hospital-o"
          iconColor={COLORS.White}
          gradientColors={['#2575fc', '#6a11cb']}
          onPressFeature={() => featureFunction('hospital')}
        />
        {/* chua biet hien thi */}
        <HomeFeatureBtn
          title="Chuyên khoa"
          iconName="medkit"
          iconColor={COLORS.White}
          gradientColors={['#da22ff', '#ff6666']}
          onPressFeature={() => featureFunction('specialty')}
        />
      </View>
      {/* Doctor List */}
      <View>
        <CategoryHeader
          title="Bác sĩ"
          iconName="stethoscope"
          onPressMore={() => featureFunction('doctor')}
        />
        <FlatList
          data={doctorList}
          keyExtractor={(item: any) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({item, index}) => (
            <HomeFeatureBtn
              key={index}
              shouldMarginatedAtEnd={true}
              isFirst={index == 0 ? true : false}
              isLast={index == doctorList?.length - 1 ? true : false}
              title={`${item.lastName} ${item.firstName}`}
              iconWrapperStyle={styles.imageWrapper}
              imagePath={item.image}
              onPressFeature={() =>
                navigation.navigate('DoctorDetail', {doctorId: item.id})
              }
            />
          )}
        />
      </View>
      {/* Hospital List */}
      <View>
        <CategoryHeader
          title="Bệnh viện"
          iconName="hospital-o"
          onPressMore={() => featureFunction('hospital')}
        />
        <FlatList
          data={hospitalList}
          keyExtractor={(item: any) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap12}
          renderItem={({item, index}) => (
            <HomeIntroCard
              title={item.name}
              description={item.address}
              imagePath={item.image}
              shouldMarginatedAtEnd={true}
              isFirst={index == 0 ? true : false}
              isLast={index == hospitalList?.length - 1 ? true : false}
              onPress={() =>
                navigation.navigate('HospitalDetail', {hospitalId: item.id})
              }
            />
          )}
        />
      </View>
      {/* Specialty List */}
      <View style={{marginBottom: SPACING.space_24}}>
        <CategoryHeader
          title="Chuyên khoa"
          iconName="medkit"
          noIconRight={true}
        />
        <FlatList
          data={specialtyList}
          keyExtractor={(item: any) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({item, index}) => (
            <HomeFeatureBtn
              key={index}
              shouldMarginatedAtEnd={true}
              isFirst={index == 0 ? true : false}
              isLast={index == specialtyList?.length - 1 ? true : false}
              title={`${item.valueVi}`}
              iconWrapperStyle={styles.imageWrapper}
              imagePath={item.image}
              onPressFeature={() =>
                navigation.navigate('Search', {
                  role: 'search',
                  type: 'specialty',
                  searchKey: item.valueVi,
                })
              }
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.White,
  },
  InputHeaderContainer: {
    width: '100%',
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING.space_20,
  },
  imageWrapper: {
    borderRadius: 100,
    width: 80,
    height: 80,
    objectFit: 'contain',
  },
  containerGap24: {
    paddingHorizontal: SPACING.space_24,
  },
  containerGap12: {
    paddingHorizontal: SPACING.space_12,
  },
});

export default HomeScreen;
