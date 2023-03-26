import { FC } from 'react';

import s from './LoginPage.module.scss';

import { AuthLayout, Container, LoginForm } from '../../components';
interface Props {}

export const LoginPage: FC<Props> = () => {
  return (
    <Container className={s.loginPage}>
      <AuthLayout title='Вход в аккаунт' children={<LoginForm />} />
    </Container>
  );
};
