import clsx from 'clsx';
import { FC, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import s from './LoginForm.module.scss';

import { Button } from '..';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { routes } from '../../router/routes';
import { authSelector } from '../../store/slices/auth/authSelectors';
import { userLogin } from '../../store/slices/auth/authSlice';
import { FetchStatus } from '../../types';
import { setTokenLS } from '../../utils';

interface Props {}

interface Inputs {
  email: string;
  password: string;
}

export const LoginForm: FC<Props> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const isFirstRender = useRef(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { message, status, token } = useAppSelector(authSelector);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(userLogin(data));
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (status === FetchStatus.Success) {
      toast.success(message);
      setTokenLS(token);
      navigate(routes.index);
    }
    if (status === FetchStatus.Error) toast.error(message);
  }, [message]);

  const emailError = errors.email && <span className={s.lableError}>Укажите ваш email</span>;
  const passwordError = errors.password && (
    <span className={s.lableError}>Поле пароля должно быть заполнено</span>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.login}>
      <div className={s.inputBox}>
        <input
          className={clsx(s.input, emailError && s.error)}
          {...register('email', {
            required: true,
          })}
          placeholder='Введите email'
          type='email'
        />
        {emailError}
      </div>
      <div className={s.inputBox}>
        <input
          className={clsx(s.input, passwordError && s.error)}
          {...register('password', {
            required: true,
          })}
          placeholder='Введите ваш пароль'
          type='password'
        />
        {passwordError}
      </div>
      <Button>Войти</Button>
    </form>
  );
};
