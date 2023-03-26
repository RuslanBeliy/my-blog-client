import { FC } from 'react';

import s from './Error.module.scss';

import { Container } from '..';

interface Props {
  text: string;
}

export const Error: FC<Props> = ({ text }) => {
  return <Container className={s.error}>Ошибка: {text}</Container>;
};
