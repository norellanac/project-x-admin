import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import {
  LoginResponse,
} from '../../types/api/apiResponses';
import { User } from '../../types/api/modelTypes';

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  user: User
  error: string | null;
  
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: {} as User,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<LoginResponse>) {
      state.isAuthenticated = true;
      state.user = action.payload.user
      state.token = action.payload.token;
      state.error = null;
    },
    setAuthUserState(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isAuthenticated = false;
      state.user = {} as User;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = {} as User;
      state.error = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, setAuthUserState, loginFailure, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;