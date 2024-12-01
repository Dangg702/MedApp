import axios from 'axios';
import {
  User,
  LoginUserType,
  LoginResponseType,
  CancelAppointmentType,
  CancelResponseType,
} from './typeUserService';

export const axiosJWT = axios.create();

import {API_URL} from '@env';

export const getDetailsUser = async (
  id: string,
  access_token: string,
): Promise<User> => {
  const response = await axiosJWT.get(
    `http://10.0.2.2:5000/api/user/get-details/${id}`,
    {
      headers: {
        token: `Brearer ${access_token}`,
      },
    },
  );
  const {data} = response;
  if (data && data.status === 'OK') {
    return data.data;
  } else {
    throw new Error('Failed to fetch users');
  }
};

export const LoginUser = async (
  newLoginUser: LoginUserType,
): Promise<LoginResponseType> => {
  const response = await axios.post(`${API_URL}/api/login`, newLoginUser);
  const {data} = response;
  if (data && data.errCode === 0) {
    return data;
  } else {
    throw new Error('Failed to LoginUser');
  }
};
export const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/api/logout`);
  const {data} = response;
  if (data.message === 'Logout successFully' && data.status === 'OK') {
    return data;
  } else {
    throw new Error('Failed to logoutUser');
  }
};

export const checkEmailSignUp = async (email: string) => {
  const response = await axios.post(`${API_URL}/api/generate-otp`, {email});
  const {data} = response;
  if (data) {
    return data;
  } else {
    throw new Error('Failed to checkEmailSignUp');
  }
};
export const verifyOtpCode = async (otp: string) => {
  const response = await axios.post(`${API_URL}/api/verify-otp`, {otp});
  const {data} = response;
  if (data) {
    return data;
  } else {
    throw new Error('Failed to verifyOtpCode');
  }
};
export const registerUser = async (newUser: object) => {
  const response = await axios.post(`${API_URL}/api/register`, newUser);
  const {data} = response;
  if (data) {
    return data;
  } else {
    throw new Error('Failed to registerUser');
  }
};

export const getDoctorList = async (limit: Number) => {
  const response = await axios.get(
    `${API_URL}/api/get-top-doctor?limit=${limit}`,
  );
  const {data} = response;
  if (data && data.errCode === 0) {
    return data;
  } else {
    throw new Error('Failed to fetch doctor list');
  }
};
export const getSpecialtyList = async (
  name: string,
  page: Number,
  perPage: Number,
) => {
  const response = await axios.get(
    `${API_URL}/api/get-all-specialty?name=${name}&page=${page}&per_page=${perPage}`,
  );
  const {data} = response;
  if (data && data.errCode === 0) {
    return data;
  } else {
    throw new Error('Failed to fetch specialty list');
  }
};
export const getHospitalList = async () => {
  const response = await axios.get(`${API_URL}/api/get-all-clinic`);
  const {data} = response;
  if (data && data.errCode === 0) {
    return data;
  } else {
    throw new Error('Failed to fetch hospital list');
  }
};

export const getListAppointmentOfPatientById = async (patientId: string) => {
  return axios.get(`/api/list-my-appointment?id=${patientId}`);
};
export const searchDoctorBySpecialty = async (specialty: string) => {
  return axios.get(`/api/book-exam/search?type=specialty&q=${specialty}`);
};
export const searchDoctorByName = async (doctorName: string) => {
  return axios.get(`/api/book-exam/search?type=doctor&q=${doctorName}`);
};
export const searchClinic = async (clinicName: string) => {
  return axios.get(`/api/book-exam/search?type=clinic&q=${clinicName}`);
};
export const searchAll = async (q: string) => {
  const response = await axios.get(
    `${API_URL}/api/book-exam/search?type=all&q=${q}`,
  );
  const {data} = response;
  if (data && data.errCode === 0) {
    console.log('Search all data', data);
    return data;
  } else {
    throw new Error('Failed to fetch search all');
  }
};
export const getListAppointmentOfPatient = async (patientId: Number) => {
  const response = await axios.get(
    `${API_URL}/api/list-my-appointment?id=${patientId}`,
  );
  const {data} = response;
  if (data && data.errCode === 0) {
    return data.data;
  } else {
    throw new Error('Failed to fetch list appointment of patient');
  }
};
export const cancelAppointment = async (
  cancelData: CancelAppointmentType,
): Promise<CancelResponseType> => {
  const response = await axios.post(
    `${API_URL}/api/cancel-appointmentapp`,
    cancelData,
  );
  console.log('cancelData',cancelData);
  const {data} = response;
  console.log('data from server',data);
  return data;
  // if (data && data.errCode === 0) {
  // } else {
  //   throw new Error('Failed to cancel appointment');
  // }
};

export const doctorInfoDetail = async (doctorId: Number) => {
  const response = await axios.get(`${API_URL}/api/get-doctor?id=${doctorId}`);
  const {data} = response;
  if (data && data.errCode === 0) {
    return data.data;
  } else {
    throw new Error('Failed to fetch doctor info detail');
  }
};

export const getScheduleTime = async (doctorId: Number, date: string) => {
  const response = await axios.get(
    `${API_URL}/api/get-schedule-time?doctorId=${doctorId}&date=${date}`,
  );
  const {data} = response;
  if (data && data.errCode === 0) {
    return data.data;
  } else {
    throw new Error('Failed to fetch schedule time');
  }
};
export const bookAppointment = async (payload: object) => {
  console.log('payload', payload);
  const response = await axios.post(
    `${API_URL}/api/booking-appointment`,
    payload,
  );
  const {data} = response;
  if (data) {
    return data;
  } else {
    throw new Error('Failed to book appointment');
  }
};

export const hospitalInfoDetail = async (hospitalId: Number) => {
  const response = await axios.get(
    `${API_URL}/api/get-clinic-detail-by-id?id=${hospitalId}`,
  );
  const {data} = response;
  if (data && data.errCode === 0) {
    return data.data;
  } else {
    throw new Error('Failed to fetch hospital info detail');
  }
};

export const getDoctorsByClinic = async (clinicName: string) => {
  const response = await axios.get(
    `${API_URL}/api/book-exam/search?type=clinic&q=${clinicName}`,
  );
  const {data} = response;
  if (data && data.errCode === 0) {
    return data.data;
  } else {
    throw new Error('Failed to fetch doctors by clinic');
  }
};

export const getDoctorsBySpecialty = async (specialtyName: string) => {
  const response = await axios.get(
    `${API_URL}/api/book-exam/search?type=specialty&q=${specialtyName}`,
  );
  const {data} = response;
  if (data && data.errCode === 0) {
    return data.data;
  } else {
    throw new Error('Failed to fetch doctors by specialty id');
  }
};

