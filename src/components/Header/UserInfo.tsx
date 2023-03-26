import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import s from './Header.module.scss';

import { routes } from '../../router/routes';

interface Props {
  userName: string;
  avatarUrl?: string;
  className?: string;
}

export const UserInfo: FC<Props> = ({ className, avatarUrl, userName }) => {
  const userWithoutImg = userName
    .split(' ')
    .reduce((acc, el) => (acc += el.slice(0, 1).toUpperCase()), '');
  return (
    <div className={clsx(s.userInfo, className)}>
      <Link to={routes.userPage}>
        <div className={s.avatar}>
          {avatarUrl ? <img src={avatarUrl} alt={userName} /> : <span>{userWithoutImg}</span>}
        </div>
      </Link>
    </div>
  );
};
