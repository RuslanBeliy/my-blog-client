import { FC } from 'react';

import s from './Footer.module.scss';

import { Container } from '../Container';

interface Props {}

export const Footer: FC<Props> = () => {
  return (
    <div className={s.footer}>
      <Container className={s.wrap}>developed by Ruslan Beliy</Container>
    </div>
  );
};
