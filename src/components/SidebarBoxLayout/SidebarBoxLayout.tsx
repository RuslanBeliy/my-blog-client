import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import { AddComment } from './AddComment';
import s from './SidebarBoxLayout.module.scss';

import { Title } from '..';
import { useAuth } from '../../hooks';
import { routes } from '../../router/routes';

interface Props extends PropsWithChildren {
  title: string;
  isFullPost?: boolean;
}

export const SidebarBoxLayout: FC<Props> = ({ title, children, isFullPost = false }) => {
  const isAuth = useAuth();
  return (
    <div className={s.sidebarLayout}>
      <Title className={s.title} tag='h3' size='20px'>
        {title}
      </Title>
      {children}
      {isFullPost ? (
        isAuth ? (
          <AddComment />
        ) : (
          <span className={s.warning}>
            Чтобы оставить комментарий <Link to={routes.login}>авторизуйтесь</Link>
          </span>
        )
      ) : null}
    </div>
  );
};
