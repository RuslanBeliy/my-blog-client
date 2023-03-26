import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axios } from '../../../api';

import { FetchStatus } from '../../../types';
import { Comment } from '../../../types/Post';

export const getLastComments = createAsyncThunk<Comment[], undefined, { rejectValue: string }>(
  'comments/getLastComments',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get('/posts/comments');
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        return thunkApi.rejectWithValue(e.response?.data.message);
      }
    }
  }
);

interface State {
  comments: Comment[];
  message: string;
  status: FetchStatus;
}

const initialState: State = {
  comments: [],
  message: '',
  status: FetchStatus.Idle,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getLastComments.pending, (state) => {
      state.message = '';
      state.status = FetchStatus.Loading;
      state.comments = [];
    });
    builder.addCase(getLastComments.rejected, (state, { payload }) => {
      state.message = payload ?? '';
      state.status = FetchStatus.Error;
      state.comments = [];
    });
    builder.addCase(getLastComments.fulfilled, (state, { payload }) => {
      state.message = '';
      state.status = FetchStatus.Success;
      state.comments = payload;
    });
  },
});

export const { actions: commentsActions, reducer: commentsReducer } = commentsSlice;
