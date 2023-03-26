import { FC, PropsWithChildren } from 'react';

import s from './AuthLayout.module.scss';

import { Title } from '..';

interface Props extends PropsWithChildren {
  title: string;
}

export const AuthLayout: FC<Props> = ({ title, children }) => {
  return (
    <div className={s.authLayout}>
      <Title className={s.title} tag='h3' size='28px'>
        {title}
      </Title>
      {children}
    </div>
  );
};
