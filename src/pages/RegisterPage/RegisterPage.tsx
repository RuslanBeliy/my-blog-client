import { FC } from 'react';

import s from './RegisterPage.module.scss';

import { AuthLayout, Container, RegisterForm } from '../../components';

interface Props {}

export const RegisterPage: FC<Props> = () => {
  return (
    <Container className={s.registerPage}>
      <AuthLayout title='Регистрация' children={<RegisterForm />} />
    </Container>
  );
};
