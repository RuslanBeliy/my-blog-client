import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/exports';
import { TypedUseSelectorHook } from 'react-redux/es/types';

import { AppDispatch, RootState } from '../store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAuth = () => {
  const isAuth = !!useAppSelector((state) => state.auth.token);
  return isAuth;
};
export const useAuthorPost = (authorId: string) => {
  const userId = useAppSelector((state) => state.auth.user?._id);
  return userId === authorId;
};
