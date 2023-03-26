import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axios } from '../../../api';
import { FetchStatus } from '../../../types';

import { AddPost, Post } from '../../../types/Post';
import { getTokenLS } from '../../../utils';

export const getOnePost = createAsyncThunk<Post, string, { rejectValue: string }>(
  'post/getOnePost',
  async (id, thunkApi) => {
    try {
      const { data } = await axios.get(`/posts/${id}`);
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        return thunkApi.rejectWithValue(e.response?.data.message);
      }
    }
  }
);
export const addPost = createAsyncThunk<Post, AddPost, { rejectValue: string }>(
  'post/addPost',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/posts`, params, {
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
export const removePost = createAsyncThunk<Post, string, { rejectValue: string }>(
  'post/removePost',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/posts/${id}`, {
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
export const updatePost = createAsyncThunk<
  Post,
  { id: string; body: AddPost },
  { rejectValue: string }
>('post/updatePost', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`/posts/${params.id}`, params.body, {
      headers: { Authorization: getTokenLS() },
    });
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return rejectWithValue(e.response?.data.message);
    }
  }
});

export const addComment = createAsyncThunk<
  Post,
  { comment: string; postId: string },
  { rejectValue: string }
>('post/addComment', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      `/posts/comments/${params.postId}`,
      { text: params.comment },
      { headers: { Authorization: getTokenLS() } }
    );
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return rejectWithValue(e.response?.data.message);
    }
  }
});
export const removeComment = createAsyncThunk<
  Post,
  { commentId: string; postId: string },
  { rejectValue: string }
>('post/removeComment', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(
      `/posts/comments/${params.postId}`,
      { commentId: params.commentId },
      { headers: { Authorization: getTokenLS() } }
    );
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return rejectWithValue(e.response?.data.message);
    }
  }
});

interface State {
  post: null | Post;
  message: string;
  status: FetchStatus;
}

const initialState: State = {
  post: null,
  message: '',
  status: FetchStatus.Idle,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearPostState(state) {
      state.message = '';
      state.post = null;
      state.status = FetchStatus.Idle;
    },
  },
  extraReducers(builder) {
    builder.addCase(getOnePost.pending, (state) => {
      state.status = FetchStatus.Loading;
      state.post = null;
    });
    builder.addCase(getOnePost.rejected, (state, { payload }) => {
      state.status = FetchStatus.Error;
      state.message = payload ?? '';
      state.post = null;
    });
    builder.addCase(getOnePost.fulfilled, (state, { payload }) => {
      state.status = FetchStatus.Success;
      state.message = '';
      state.post = payload;
    });
    builder.addCase(addComment.fulfilled, (state, { payload }) => {
      state.post = payload;
    });
    builder.addCase(addPost.pending, (state) => {
      state.status = FetchStatus.Loading;
    });
    builder.addCase(addPost.rejected, (state, { payload }) => {
      state.status = FetchStatus.Error;
      state.message = payload ?? '';
    });
    builder.addCase(addPost.fulfilled, (state, { payload }) => {
      state.status = FetchStatus.Success;
    });
    builder.addCase(updatePost.pending, (state) => {
      state.status = FetchStatus.Loading;
    });
    builder.addCase(updatePost.rejected, (state, { payload }) => {
      state.status = FetchStatus.Error;
      state.message = payload ?? '';
    });
    builder.addCase(updatePost.fulfilled, (state, { payload }) => {
      state.status = FetchStatus.Success;
    });
    builder.addCase(removeComment.fulfilled, (state, { payload }) => {
      state.post = payload;
    });
  },
});

export const { actions: postActions, reducer: postReducer } = postSlice;
