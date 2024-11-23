export type RootStackParamList = {
  Home: undefined;
  Search: {role: string; searchKey?: string; type?: string};
  Profile: {userId: Number};
  Settings: undefined;
  Scheduled: undefined;
  DoctorDetail: {doctorId: Number};
  HospitalDetail: {hospitalId: Number};
  Booking: {
    doctorId: Number;
    date: string;
    timeType: string;
    doctorName: string;
    clinicName: string;
    specialtyName: string;
    price: string;
    priceId: string;
    image: string;
    time: string;
  };
};
