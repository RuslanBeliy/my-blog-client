import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import s from './NotFoundPage.module.scss';

import { Button, Container, Title } from '../../components';
import { routes } from '../../router/routes';

interface Props {}

export const NotFoundPage: FC<Props> = () => {
  const navigate = useNavigate();
  return (
    <Container className={s.notFoundPage}>
      <div className={s.wrap}>
        <Title className={s.title}>Страница не найдена</Title>
        <Button onClick={() => navigate(routes.index)}>Вернуться на главную</Button>
      </div>
    </Container>
  );
};
