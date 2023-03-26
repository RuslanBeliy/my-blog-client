import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axios } from '../../../api';
import { FetchStatus } from '../../../types';
import { getTokenLS } from '../../../utils';

export const uploadImage = createAsyncThunk<{ url: string }, FormData, { rejectValue: string }>(
  'uploadImage/uploadImage',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/upload', formData, {
        headers: { Authorization: getTokenLS() },
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data.message);
      }
    }
  }
);

interface State {
  imageUrl: string;
  status: FetchStatus;
}

const initialState: State = {
  imageUrl: '',
  status: FetchStatus.Idle,
};

const uploadImageSlice = createSlice({
  name: 'uploadImage',
  initialState,
  reducers: {
    clearUpload(state) {
      state.imageUrl = '';
      state.status = FetchStatus.Idle;
    },
    setUpload(state, { payload }: PayloadAction<string>) {
      state.imageUrl = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(uploadImage.pending, (state) => {
      state.status = FetchStatus.Loading;
      state.imageUrl = '';
    });
    builder.addCase(uploadImage.rejected, (state) => {
      state.status = FetchStatus.Error;
      state.imageUrl = '';
    });
    builder.addCase(uploadImage.fulfilled, (state, { payload }) => {
      state.status = FetchStatus.Success;
      state.imageUrl = 'https://my-blog-ckvh.onrender.com/api' + payload.url;
    });
  },
});

export const { actions: uploadImageActions, reducer: uploadImageReducer } = uploadImageSlice;
