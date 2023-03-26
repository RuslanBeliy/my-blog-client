import clsx from 'clsx';
import { FC, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { RxAvatar } from 'react-icons/rx';
import { TiDeleteOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AddAvatar } from './AddAvatar';
import s from './RegisterForm.module.scss';

import { Button } from '..';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { routes } from '../../router/routes';
import { authSelector } from '../../store/slices/auth/authSelectors';
import { userRegistration } from '../../store/slices/auth/authSlice';
import { uploadImageSelector } from '../../store/slices/uploadImage/uploadImageSelector';
import { uploadImage, uploadImageActions } from '../../store/slices/uploadImage/uploadImageSlice';
import { FetchStatus } from '../../types';
import { setTokenLS } from '../../utils';

interface Props {}

interface Inputs {
  userName: string;
  email: string;
  password: string;
}

export const RegisterForm: FC<Props> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const isFirstRender = useRef(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { message, status, token } = useAppSelector(authSelector);
  const { imageUrl } = useAppSelector(uploadImageSelector);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(userRegistration({ ...data, avatarUrl: imageUrl }));
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (status === FetchStatus.Success) {
      toast.success(message);
      setTokenLS(token);
      dispatch(uploadImageActions.clearUpload());
      navigate(routes.index);
    }
    if (status === FetchStatus.Error) toast.warning(message);
  }, [message]);

  const userNameError = errors.userName && (
    <span className={s.lableError}>Имя должно содержать минимум 3 символа</span>
  );
  const emailError = errors.email && <span className={s.lableError}>Укажите ваш email</span>;
  const passwordError = errors.password && (
    <span className={s.lableError}>Пароль должен содержать минимум 5 символов</span>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.register}>
      <AddAvatar imageUrl={imageUrl} />
      <div className={s.inputBox}>
        <input
          className={clsx(s.input, userNameError && s.error)}
          {...register('userName', {
            required: true,
            minLength: 3,
          })}
          placeholder='Введите ваше имя'
          type='text'
        />
        {userNameError}
      </div>
      <div className={s.inputBox}>
        <input
          className={clsx(s.input, emailError && s.error)}
          {...register('email', { required: true })}
          placeholder='Введите ваш E-mail'
          type='email'
        />
        {emailError}
      </div>
      <div className={s.inputBox}>
        <input
          className={clsx(s.input, passwordError && s.error)}
          {...register('password', { required: true, minLength: 5 })}
          placeholder='Введите ваш пароль'
          type='password'
        />
        {passwordError}
      </div>
      <Button>Зарегистрироваться</Button>
    </form>
  );
};
