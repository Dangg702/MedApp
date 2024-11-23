import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './slices/userSlice';
import appointmentReducer from './slices/appointmentSlice';

interface UserState {
  isLoggedIn: boolean;
  userInfo: object;
  userRole: string;
  accessToken: string;
  refreshToken: string;
}

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

export interface RootState {
  user: UserState;
  appointment: AppointmentState;
}

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 1,
  storage: AsyncStorage, // Sử dụng AsyncStorage để lưu trữ dữ liệu
  blacklist: [], // Thêm reducers cần loại trừ vào đây nếu cần
};

const rootReducer = combineReducers({
  user: userReducer, 
  appointment: appointmentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
