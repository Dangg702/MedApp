import {CancelAppointmentType} from './typeUserService';
// muốn in ra những loại dữ liệu gì thì phải khai báo ra và lấy ra xử dụng

export interface User {
  id: number;
  name: string;
  image: string;
}

export interface GetDetailsUserType {
  email: string;
  password: string;
}

export interface LoginUserType {
  email: string;
  password: string;
}

export interface AppointmentType {
  doctorId: Number;
  doctorImage: string;
  doctorName: string;
  hospitalName: string;
  aptmDate: string;
  aptmTime: string;
  specialtyName: string;
  patientName: string;
  patientId: Number;
  aptmTimeType: string;
}

export interface CancelAppointmentType {
  doctorId: Number;
  patientId: Number;
  date: string;
  timeType: string;
}

// export interface data {
//   id: number;
//   email: string;
//   firstName: string;
//   lastName: string;
//   address: string;
//   phoneNumber: string;
//   gender: string;
//   image: string;
//   roleId: string;
//   positionId: string;
// }
// export interface tokens {
//   accessToken: string;
//   refreshToken: string;
// }
export interface LoginResponseType {
  // data: data[];
  data: object;
  tokens: object;
  errCode: string;
  message: string;
}

export interface CancelResponseType {
  errCode: Number;
  message: string;
}

export interface checkEmailSignUpType {
  name: string;
  email: string;
  OK: '';
}
export interface checkEmailSignUpTypeNhan {
  token: string;
  message: string;
  status: string;
}
export interface checkOTPSignUpType {
  name: string;
  email: string;
  otp: string;
  token: string;
  OK: '';
}
export interface createUserType {
  name: string;
  email: string;
  otp: string;
  token: string;
  password: string;
  confirmPassword: string;
}

export interface typeDataNhan {
  message: string;
  status: string;
  data: any;
}
export interface checkDetailsUserByEmailType {
  email: string;
}
export interface checkDetailsUserByOTPType {
  email: string;
  otp: string;
  OK: '';
}
export interface changePasswordType {
  email: string;
  otp: string;
  password: string;
  passwordRetrieval: string;
}

export interface data {
  name: string;
  phone: string;
  city: string;
  address: string;
}

export interface updateUser1 {
  id: string;
  access_token: string;
  data: data;
}
