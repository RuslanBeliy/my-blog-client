import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth/authSlice';
import { commentsReducer } from './slices/comments/commentsSlice';
import { postReducer } from './slices/post/postSlice';

import { postsReducer } from './slices/posts/postsSlice';
import { tagsReducer } from './slices/tags/tagsSlice';
import { uploadImageReducer } from './slices/uploadImage/uploadImageSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    post: postReducer,
    auth: authReducer,
    tags: tagsReducer,
    uploadImage: uploadImageReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
