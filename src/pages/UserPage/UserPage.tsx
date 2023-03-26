import { FC } from 'react';

import s from './UserPage.module.scss';

import { Button, Container } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { authSelector } from '../../store/slices/auth/authSelectors';
import { deleteUser } from '../../store/slices/auth/authSlice';
import { cutFirstLetter } from '../../utils';

interface Props {}

export const UserPage: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(authSelector);
  const date = user && new Date(user.createdAt);
  const createdUser =
    date &&
    `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${
      date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    }.${date.getFullYear()}`;

  const handleDeleteUser = () => {
    const answer = window.confirm('Вы уверены что хотите удалить свой аккаунт?');
    if (!answer) return;
    dispatch(deleteUser());
  };

  const userWithoutImg = cutFirstLetter(user?.userName ?? '');
  return (
    <Container className={s.userPage}>
      <div className={s.wrap}>
        <div className={s.img}>
          {user?.avatarUrl ? <img src={user?.avatarUrl} alt='' /> : <span>{userWithoutImg}</span>}
        </div>
        <div className={s.info}>
          <div className={s.item}>
            <span>Имя: </span>
            {user?.userName}
          </div>
          <div className={s.item}>
            <span>Email: </span>
            {user?.email}
          </div>
          <div className={s.item}>
            <span>Дата регистрации: </span>
            {createdUser}
          </div>
          <div className={s.item}>
            <Button onClick={handleDeleteUser} variant='delete' size='sm'>
              Удалить аккаунт
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
