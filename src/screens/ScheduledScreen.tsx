import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import Icon from 'react-native-vector-icons/Feather';
import AppHeader from '../components/AppHeader';
import AppointmentCard from '../components/AppointmentCard';
import {getListAppointmentOfPatient} from '../services/UserService/UserService';

const {width, hight} = Dimensions.get('screen');

const ScheduledScreen = ({navigation}: any) => {
  const user = useSelector((state: RootState) => state.user);
  const scheduledData = useSelector((state: RootState) => state.appointment);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
        <AppHeader
          name="close"
          header={'Lịch khám'}
          action={() => navigation.goBack()}
          containerStyle={styles.headerStyle}
          iconColor={COLORS.MainColor}
          headerText={styles.headerText}
        />
      </View>
      <View>
        {scheduledData.aptmDate !== '' ? (
          <View style={styles.appointmentStyle}>
            <AppointmentCard
              data={scheduledData}
              textStyle={{color: COLORS.Text}}
              cardStyle={styles.cardStyle}
              breakLineStyle={{backgroundColor: COLORS.Border}}
            />
          </View>
        ) : (
          <View>
            <Image
              source={require('../assets/image/noAppoinment.png')}
              style={styles.noAptmImg}
            />
            <Text style={styles.noAptmTitle}>Bạn chưa có lịch khám </Text>
            <Text style={styles.noAptmSubTitle}>
              Lịch khám của bạn hiển thị tại đây
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.BgGrey,
  },
  headerStyle: {
    backgroundColor: COLORS.White,
  },
  headerText: {
    color: COLORS.Text,
    fontWeight: 600,
    fontSize: FONTSIZE.size_24,
  },
  appointmentStyle: {
    marginTop: SPACING.space_20,
  },
  cardStyle: {
    height: 260,
    backgroundColor: COLORS.White,
    shadowColor: 'rgba(9, 30, 66, 0.25)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  noAptmImg: {
    height: 200,
    aspectRatio: 3 / 2,
    marginTop: 80,
    objectFit: 'contain',
  },
  noAptmTitle: {
    color: COLORS.Text,
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.roboto_bold,
    marginTop: 20,
    textAlign: 'center',
  },
  noAptmSubTitle: {
    color: COLORS.Grey,
    fontSize: FONTSIZE.size_16,
    marginTop: 10,
    textAlign: 'center',
    width: '100%',
  },
});

export default ScheduledScreen;
