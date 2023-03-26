import clsx from 'clsx';
import { FC } from 'react';

import s from './Input.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: FC<Props> = ({ className, ...props }) => {
  return (
    <div className={className}>
      <input className={clsx(s.input)} {...props} />
    </div>
  );
};
