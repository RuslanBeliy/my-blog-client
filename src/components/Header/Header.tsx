import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import s from './Header.module.scss';

import { UserInfo } from './UserInfo';

import { Button, Container, Logo } from '..';
import { useAppDispatch, useAppSelector, useAuth } from '../../hooks';
import { routes } from '../../router/routes';
import { authSelector } from '../../store/slices/auth/authSelectors';
import { authActions } from '../../store/slices/auth/authSlice';
import { setTokenLS } from '../../utils';

interface Props {}

export const Header: FC<Props> = () => {
  const isAuth = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(authSelector);

  const handleLogout = () => {
    dispatch(authActions.logout());
    setTokenLS('');
  };
  return (
    <header className={s.header}>
      <Container className={s.wrap}>
        <Logo />
        <div className={s.auth}>
          {isAuth ? (
            <>
              <Button
                size='sm'
                variant='outline'
                onClick={() => navigate(routes.addPost)}
                className={s.btn}
              >
                Написать пост
              </Button>
              <Button size='sm' className={s.btn} onClick={handleLogout}>
                Выйти
              </Button>
              <UserInfo userName={user?.userName ?? ''} avatarUrl={user?.avatarUrl} />
            </>
          ) : (
            <>
              <Button
                size='sm'
                variant='outline'
                onClick={() => navigate(routes.login)}
                className={s.btn}
              >
                Войти
              </Button>
              <Button size='sm' className={s.btn} onClick={() => navigate(routes.register)}>
                Регистрация
              </Button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
};
