import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

interface AppointmentState {
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

// Định nghĩa kiểu dữ liệu cho payload của action
interface UpdateAppointmentPayload {
  doctorId?: Number;
  doctorImage?: string;
  doctorName?: string;
  hospitalName?: string;
  aptmDate?: string;
  aptmTime?: string;
  specialtyName?: string;
  patientName?: string;
  patientId?: Number;
  aptmTimeType?: string;
}

const initialState: AppointmentState = {
  doctorId: -1,
  doctorImage: '',
  doctorName: '',
  hospitalName: '',
  aptmDate: '',
  aptmTime: '',
  specialtyName: '',
  patientName: '',
  patientId: -1,
  aptmTimeType: '',
};

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    updateAppointment: (
      state,
      action: PayloadAction<Partial<UpdateAppointmentPayload>>,
    ) => {
      const {
        doctorId = -1,
        doctorImage = '',
        doctorName = '',
        hospitalName = '',
        aptmDate = '',
        aptmTime = '',
        specialtyName = '',
        patientName = '',
        patientId = -1,
        aptmTimeType = '',
      } = action.payload;

      if (doctorId !== undefined) state.doctorId = doctorId;
      if (doctorImage !== undefined) state.doctorImage = doctorImage;
      if (doctorName !== undefined) state.doctorName = doctorName;
      if (hospitalName !== undefined) state.hospitalName = hospitalName;
      if (aptmDate !== undefined) state.aptmDate = aptmDate;
      if (aptmTime !== undefined) state.aptmTime = aptmTime;
      if (specialtyName !== undefined) state.specialtyName = specialtyName;
      if (patientName !== undefined) state.patientName = patientName;
      if (patientId !== undefined) state.patientId = patientId;
      if (aptmTimeType !== undefined) state.aptmTimeType = aptmTimeType;
    },
    resetAppointment: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {updateAppointment, resetAppointment} = appointmentSlice.actions;

export default appointmentSlice.reducer;
