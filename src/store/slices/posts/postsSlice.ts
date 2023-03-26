import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axios } from '../../../api';
import { FetchStatus } from '../../../types';
import { ServerResponsePosts, Post } from '../../../types/Post';

export const getPosts = createAsyncThunk<
  ServerResponsePosts,
  undefined | { rating?: string; tag?: string; skip?: number },
  { rejectValue: string }
>('posts/getPosts', async (params, thunkApi) => {
  try {
    const { data } = await axios.get('/posts', {
      params,
    });
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return thunkApi.rejectWithValue(e.response?.data.message);
    }
  }
});
export const getMorePosts = createAsyncThunk<
  ServerResponsePosts,
  { rating?: string; tag?: string; skip?: number },
  { rejectValue: string }
>('posts/getMorePosts', async (params, thunkApi) => {
  try {
    const { data } = await axios.get('/posts', {
      params,
    });
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return thunkApi.rejectWithValue(e.response?.data.message);
    }
  }
});

interface State {
  countDocuments: number;
  posts: Post[];
  errorMessage: string;
  status: FetchStatus;
}

const initialState: State = {
  countDocuments: 0,
  posts: [],
  errorMessage: '',
  status: FetchStatus.Idle,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPosts.pending, (state) => {
      state.status = FetchStatus.Loading;
      state.posts = [];
    });
    builder.addCase(getPosts.rejected, (state, { payload }) => {
      state.status = FetchStatus.Error;
      state.errorMessage = payload ?? '';
      state.posts = [];
    });
    builder.addCase(getPosts.fulfilled, (state, { payload }) => {
      state.status = FetchStatus.Success;
      state.errorMessage = '';
      state.posts = payload.posts;
      state.countDocuments = payload.countDocuments;
    });
    builder.addCase(getMorePosts.rejected, (state, { payload }) => {
      state.status = FetchStatus.Error;
      state.errorMessage = payload ?? '';
      state.posts = [];
    });
    builder.addCase(getMorePosts.fulfilled, (state, { payload }) => {
      state.status = FetchStatus.Success;
      state.errorMessage = '';
      state.posts.push(...payload.posts);
      state.countDocuments = payload.countDocuments;
    });
  },
});

export const { actions: postsActions, reducer: postsReducer } = postsSlice;
