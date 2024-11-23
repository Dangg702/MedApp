import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  RouteProp,
  useNavigation,
  useRoute,
  NavigationProp,
} from '@react-navigation/native';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import InputHeader from '../components/InputHeader';
import Icon from 'react-native-vector-icons/Feather';
import SearchResultCard from '../components/SearchResultCard';
import {
  getDoctorList,
  getSpecialtyList,
  getHospitalList,
  searchAll,
  getDoctorsByClinic,
  getDoctorsBySpecialty,
} from '../services/UserService/UserService';
import {RootStackParamList} from '../navigation/NavigationTypes';

const {width, hight} = Dimensions.get('screen');

type RouteParams = {
  role: string;
  searchKey?: string;
};

type DataListItem = {
  id: number;
  name: string;
  specialty?: string;
  address: string;
  image?: string;
  position?: string;
  clinicName?: string;
};

const SearchScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Search'>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {role, searchKey, type} = route.params;
  // console.log('Role:', role);
  // console.log('Search key:', searchKey);
  // console.log('Type:', type);

  const [dataList, setDataList] = useState<DataListItem[]>([]);

  useEffect(() => {
    getDataList();
  }, [searchKey]);

  const getDataList = async () => {
    try {
      if (role === 'doctor') {
        let response = await getDoctorList(20);
        let data = response.doctors.map((item: any) => ({
          id: item.id,
          name: `${item.lastName} ${item.firstName}`,
          specialty: item.doctorInfoData.specialtyData
            ? item.doctorInfoData.specialtyData.valueVi
            : null,
          address: item.doctorInfoData.clinicData
            ? item.doctorInfoData.clinicData.address
            : item.address,
          clinicName: item.doctorInfoData.clinicData
            ? item.doctorInfoData.clinicData.name
            : '',
          image: item.image,
          position: item.positionData ? item.positionData.valueVi : null,
        }));
        setDataList(data);
      } else if (role === 'hospital') {
        let response = await getHospitalList();
        let data = response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          address: item.address,
          image: item.image,
        }));
        setDataList(data);
      } else if (role === 'specialty') {
        // chưa biết hiển thị như nào
        let response = await getSpecialtyList('ALL', 1, 50);
        // setDataList(data);
      } else if (role === 'search' && type && searchKey) {
        searchFunction(type, searchKey);
      }
    } catch (error) {
      console.log('Something went wrong in getDataList', error);
    }
  };

  const searchFunction = async (type: string, keyWord: string) => {
    try {
      let data;
      if (type === 'all' && keyWord) {
        let response = await searchAll(keyWord);
        data = response.data.map((item: any) => ({
          id: item.id,
          name: item['doctorInfoData.firstName']
            ? `${item['doctorInfoData.lastName']} ${item['doctorInfoData.firstName']}`
            : null,
          specialty: item['specialtyData.valueVi']
            ? item['specialtyData.valueVi']
            : null,
          address: item['clinicData.address'] ? item['clinicData.address'] : '',
          clinicName: item['clinicData.name'] ? item['clinicData.name'] : '',
          image: item['doctorInfoData.image']
            ? item['doctorInfoData.image']
            : '',
          position:
            item['doctorInfoData.positionId'] === 'P0' ? 'Bác sĩ' : null,
        }));
      } else if (type === 'clinic' && searchKey) {
        let response = await getDoctorsByClinic(searchKey);
        data = response.map((item: any) => ({
          id: item.doctorId,
          name: item['doctorInfoData.firstName']
            ? `${item['doctorInfoData.lastName']} ${item['doctorInfoData.firstName']}`
            : null,
          specialty: item['specialtyData.valueVi']
            ? item['specialtyData.valueVi']
            : null,
          address: item['clinicData.address'] ? item['clinicData.address'] : '',
          clinicName: item['clinicData.name'] ? item['clinicData.name'] : '',
          image: item['doctorInfoData.image']
            ? item['doctorInfoData.image']
            : '',
          position:
            item['doctorInfoData.positionId'] === 'P0' ? 'Bác sĩ' : null,
        }));
      } else if (type === 'specialty' && searchKey) {
        let response = await getDoctorsBySpecialty(searchKey);
        data = response.map((item: any) => ({
          id: item.doctorId,
          name: item['doctorInfoData.firstName']
            ? `${item['doctorInfoData.lastName']} ${item['doctorInfoData.firstName']}`
            : null,
          specialty: item['specialtyData.valueVi']
            ? item['specialtyData.valueVi']
            : null,
          address: item['clinicData.address'] ? item['clinicData.address'] : '',
          clinicName: item['clinicData.name'] ? item['clinicData.name'] : '',
          image: item['doctorInfoData.image']
            ? item['doctorInfoData.image']
            : '',
          position:
            item['doctorInfoData.positionId'] === 'P0' ? 'Bác sĩ' : null,
        }));
      }
      setDataList(data);
    } catch (error) {
      console.log('Something went wrong in searchFunction', error);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const navigateItem = (id: Number) => {
    if (role === 'doctor' || (role === 'search' && type === 'clinic')) {
      navigation.navigate('DoctorDetail', {
        doctorId: id,
      });
    } else if (role === 'hospital') {
      navigation.navigate('HospitalDetail', {
        hospitalId: id,
      });
    } else if (role === 'specialty') {
      // chưa biết hiển thị như nào
    }
  };

  // console.log('Data list:', dataList);
  if (dataList === undefined && dataList === null && dataList.length === 0) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.MainColor} />
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.headerSearch}>
        <TouchableOpacity
          style={styles.backBtnWrapper}
          onPress={() => goBack()}>
          <Icon
            name="chevron-left"
            style={styles.iconStyle}
            size={FONTSIZE.size_30}
            color={COLORS.White}
          />
        </TouchableOpacity>
        <View style={styles.InputHeaderContainer}>
          <InputHeader
            inputBox={styles.inputBox}
            textInput={styles.textInput}
            placeholderTextColor={COLORS.LightGrey}
            iconColor={COLORS.LightGrey}
            searchValue={searchKey}
          />
        </View>
      </View>
      <View style={styles.listContainer}>
        {dataList && dataList.length > 0 ? (
          <FlatList
            data={dataList}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            }
            bounces={false}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <SearchResultCard
                key={index}
                position={item.position ? item.position : null}
                name={item.name}
                avatar={item.image}
                specialty={item.specialty ? item.specialty : null}
                address={item.address}
                clinicName={item.clinicName}
                onPress={() => navigateItem(item.id)}
              />
            )}
          />
        ) : (
          <Text style={styles.noResultText}>Không tìm thấy kết quả</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  container: {
    display: 'flex',
    flex: 1,
    width,
    alignItems: 'center',
    backgroundColor: COLORS.BgGrey,
  },
  headerSearch: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.MainColor,
  },
  backBtnWrapper: {
    width: '10%',
    paddingTop: 10,
  },
  inputBox: {
    backgroundColor: COLORS.DarkGrey,
    color: COLORS.White,
    marginHorizontal: 0,
  },
  textInput: {
    width: '80%',
    color: COLORS.White,
  },
  iconStyle: {
    fontWeight: 600,
    paddingLeft: SPACING.space_18,
  },
  InputHeaderContainer: {
    display: 'flex',
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_28,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: SPACING.space_12,
    marginTop: SPACING.space_2,
  },
  noResultText: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.Text,
    textAlign: 'center',
    marginTop: SPACING.space_24,
  },
});

export default SearchScreen;
