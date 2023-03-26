import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

import s from './Button.module.scss';

interface Props extends PropsWithChildren, React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'fill' | 'outline' | 'delete';
  size?: 'sm' | 'mb';
}

export const Button: FC<Props> = ({
  children,
  variant = 'fill',
  size = 'mb',
  className,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick && onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(s.button, s[`button-${variant}`], s[`button-${size}`], className)}
      {...props}
    >
      {children}
    </button>
  );
};
