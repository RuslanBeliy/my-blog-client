import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

import s from './Container.module.scss';

interface Props extends PropsWithChildren {
  className?: string;
}

export const Container: FC<Props> = ({ children, className }) => {
  return <div className={clsx(s.container, className)}>{children}</div>;
};
