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
} from 'react-native';
import {BORDERRADIUS, COLORS, SPACING, FONTSIZE} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/Feather';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/NavigationTypes';
import {hospitalInfoDetail} from '../services/UserService/UserService';
import RenderHTML from 'react-native-render-html';
import CustomButton from '../components/CustomButton';

const HospitalDetailScreen = ({navigation}: any) => {
  const {width} = useWindowDimensions();
  const route = useRoute<RouteProp<RootStackParamList, 'HospitalDetail'>>();

  const {hospitalId} = route.params;
  const [hospitalData, setHospitalData] = useState<any>(undefined);

  useEffect(() => {
    getHospitalInfoDetail();
  }, []);

  const getHospitalInfoDetail = async () => {
    try {
      const response = await hospitalInfoDetail(hospitalId);
      setHospitalData(response);
    } catch (error) {
      console.log('Failed to get hospital info:', error);
    }
  };

  const navigateSearch = () => {
    navigation.navigate('Search', {
      role: 'search',
      type: 'clinic',
      searchKey: hospitalData?.name,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <AppHeader
        name="close"
        header="Thông tin bệnh viện"
        action={navigation.goBack}
      />
      {hospitalData && (
        <>
          <ScrollView style={styles.bodyContent}>
            <View style={[styles.flexRow, styles.infoWrapper]}>
              <Image
                source={{uri: hospitalData?.image}}
                style={styles.imageStyle}
              />
              <View style={styles.hospitalInfo}>
                <Text style={styles.title}>{hospitalData?.name}</Text>
                <Text style={styles.subTitle}>{hospitalData?.address}</Text>
              </View>
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.title}>Thời gian làm việc</Text>
              <View style={[styles.flexRow, styles.spaceBetween]}>
                <Text style={styles.subTitle}>Thứ 2 – Thứ 6</Text>
                <Text style={styles.subTitle}>06:00 - 16:30</Text>
              </View>
              <View style={[styles.flexRow, styles.spaceBetween]}>
                <Text style={styles.subTitle}>Thứ 7 – CN</Text>
                <Text style={styles.subTitle}>07:00 - 11:30</Text>
              </View>
            </View>
            <View style={styles.infoWrapper}>
              <RenderHTML
                contentWidth={width}
                source={{html: hospitalData?.contentHtml}}
                tagsStyles={{
                  h3: {fontSize: 16, fontWeight: 'bold', color: COLORS.Text},
                  p: {
                    fontSize: 16,
                    lineHeight: 24,
                    color: COLORS.Text,
                    textAlign: 'justify',
                  },
                }}
              />
            </View>
          </ScrollView>
          <CustomButton
            title={'Đặt lịch khám'}
            style={{margin: 12}}
            onPress={navigateSearch}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BgGrey,
    paddingBottom: SPACING.space_20,
  },
  bodyContent: {flex: 1, backgroundColor: COLORS.BgGrey},
  flexRow: {flexDirection: 'row', alignItems: 'center'},
  spaceBetween: {justifyContent: 'space-between'},
  infoWrapper: {
    backgroundColor: COLORS.White,
    borderRadius: BORDERRADIUS.radius_4,
    marginBottom: SPACING.space_12,
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_18,
  },
  imageStyle: {
    width: 100,
    aspectRatio: 3 / 2,
    borderRadius: BORDERRADIUS.radius_10,
  },
  hospitalInfo: {marginLeft: SPACING.space_15, flex: 1},
  title: {
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
    marginBottom: SPACING.space_8,
    color: COLORS.Text,
  },
  subTitle: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.Text,
  },
});

export default HospitalDetailScreen;
