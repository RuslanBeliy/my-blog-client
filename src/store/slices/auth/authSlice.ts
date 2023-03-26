import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axios } from '../../../api';
import { FetchStatus, ValidationError } from '../../../types';

import { AuthServerResponse } from '../../../types/AuthServerResponse';
import { LoginUser, RegisterUser, User } from '../../../types/User';
import { getTokenLS } from '../../../utils';

export const userRegistration = createAsyncThunk<
  AuthServerResponse,
  RegisterUser,
  { rejectValue: { message: string } | ValidationError[] }
>('auth/userRegistration', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/auth/register', params);
    return data;
  } catch (e) {
    if (e instanceof AxiosError) return rejectWithValue(e.response?.data);
  }
});
export const userLogin = createAsyncThunk<AuthServerResponse, LoginUser, { rejectValue: string }>(
  'auth/userLogin',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', params);
      return data;
    } catch (e) {
      if (e instanceof AxiosError) return rejectWithValue(e.response?.data.message);
    }
  }
);
export const userMe = createAsyncThunk<AuthServerResponse, undefined, { rejectValue: string }>(
  'auth/userMe',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/auth/me', { headers: { Authorization: getTokenLS() } });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) return rejectWithValue(e.response?.data.message);
    }
  }
);
export const deleteUser = createAsyncThunk<{ message: string }, undefined, { rejectValue: string }>(
  'auth/deleteUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/auth/users`, {
        headers: { Authorization: getTokenLS() },
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) return rejectWithValue(e.response?.data.message);
    }
  }
);

interface State {
  message: string;
  errors: ValidationError[];
  token: string;
  user: User | null;
  status: FetchStatus;
}

const initialState: State = {
  message: '',
  token: getTokenLS(),
  user: null,
  errors: [],
  status: FetchStatus.Idle,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.errors = [];
      state.message = '';
      state.status = FetchStatus.Idle;
      state.token = '';
    },
  },
  extraReducers(builder) {
    builder.addCase(userRegistration.pending, (state) => {
      state.status = FetchStatus.Loading;
      state.errors = [];
      state.message = '';
    });
    builder.addCase(userRegistration.rejected, (state, { payload }) => {
      state.status = FetchStatus.Error;
      if (payload && 'message' in payload) state.message = payload.message;
      if (payload && Array.isArray(payload)) state.errors = payload;
    });
    builder.addCase(userRegistration.fulfilled, (state, { payload }) => {
      state.status = FetchStatus.Success;
      state.message = payload.message;
      state.token = payload.token;
      state.user = payload.userData;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.status = FetchStatus.Loading;
      state.token = '';
      state.message = '';
      state.user = null;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.status = FetchStatus.Error;
      state.message = payload ?? '';
      state.token = '';
      state.user = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.status = FetchStatus.Success;
      state.message = payload.message;
      state.token = payload.token;
      state.user = payload.userData;
    });
    builder.addCase(userMe.pending, (state) => {
      state.status = FetchStatus.Loading;
      state.message = '';
      state.user = null;
    });
    builder.addCase(userMe.rejected, (state, { payload }) => {
      state.status = FetchStatus.Error;
      state.message = payload ?? '';
      state.user = null;
    });
    builder.addCase(userMe.fulfilled, (state, { payload }) => {
      state.status = FetchStatus.Success;
      state.message = payload.message;
      state.user = payload.userData;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.status = FetchStatus.Loading;
    });
    builder.addCase(deleteUser.rejected, (state, { payload }) => {
      state.status = FetchStatus.Error;
      state.message = payload ?? '';
    });
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.status = FetchStatus.Idle;
      state.message = payload.message;
      state.user = null;
      state.errors = [];
      state.token = '';
    });
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
