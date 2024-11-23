import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  isLoggedIn: boolean;
  userInfo: object | null;
  userRole: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

// Định nghĩa kiểu dữ liệu cho payload của action
interface UpdateUserPayload {
  isLoggedIn?: boolean;
  userInfo?: object;
  userRole?: string;
  accessToken?: string;
  refreshToken?: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  userInfo: null,
  userRole: null,
  accessToken: null,
  refreshToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UpdateUserPayload>) => {
      const {
        isLoggedIn = true,
        userInfo = {},
        userRole = '',
        accessToken = '',
        refreshToken = '',
      } = action.payload;

      state.isLoggedIn = isLoggedIn;
      state.userInfo = userInfo;
      state.userRole = userRole;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    resetUser: state => {
      state.isLoggedIn = false;
      state.userInfo = {};
      state.userRole = '';
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
});

export const {updateUser, resetUser} = userSlice.actions;

export default userSlice.reducer;
