import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axios } from '../../../api';

import { FetchStatus } from '../../../types';

export const getPopularTags = createAsyncThunk<string[], undefined, { rejectValue: string }>(
  'tags/getPopularTags',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get('/posts/tags');
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        return thunkApi.rejectWithValue(e.response?.data.message);
      }
    }
  }
);

interface State {
  tags: string[];
  errorMessage: string;
  status: FetchStatus;
}

const initialState: State = {
  tags: [],
  errorMessage: '',
  status: FetchStatus.Idle,
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPopularTags.pending, (state) => {
      state.errorMessage = '';
      state.status = FetchStatus.Loading;
      state.tags = [];
    });
    builder.addCase(getPopularTags.rejected, (state, { payload }) => {
      state.errorMessage = payload ?? '';
      state.status = FetchStatus.Error;
      state.tags = [];
    });
    builder.addCase(getPopularTags.fulfilled, (state, { payload }) => {
      state.errorMessage = '';
      state.status = FetchStatus.Success;
      state.tags = payload;
    });
  },
});

export const { actions: tagsActions, reducer: tagsReducer } = tagsSlice;
