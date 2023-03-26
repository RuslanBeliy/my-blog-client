import clsx from 'clsx';
import { FC } from 'react';

import s from './ListOfPosts.module.scss';

import { cutFirstLetter } from '../../utils';

interface Props {
  userName: string;
  createdAt: Date;
  avatarUrl?: string;
  className?: string;
}

export const UserInfo: FC<Props> = ({ className, avatarUrl, createdAt, userName }) => {
  const date = new Date(createdAt);
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const formatedDate = `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`;
  const userWithoutImg = cutFirstLetter(userName);
  return (
    <div className={clsx(s.userInfo, className)}>
      <div className={s.avatar}>
        {avatarUrl ? <img src={avatarUrl} alt={userName} /> : <span>{userWithoutImg}</span>}
      </div>
      <div className={s.info}>
        <div className={s.name}>{userName}</div>
        <div className={s.date}>{formatedDate}</div>
      </div>
    </div>
  );
};
