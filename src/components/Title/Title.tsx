import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

import s from './Title.module.scss';

interface Props extends PropsWithChildren, React.HTMLAttributes<HTMLHeadingElement> {
  tag?: 'h1' | 'h2' | 'h3';
  size?: '20px' | '28px' | '34px' | '38px';
}

export const Title: FC<Props> = ({ children, className, tag = 'h2', size = '34px', ...props }) => {
  const Tag = tag;

  return (
    <Tag className={clsx(s.title, s[`size-${size}`], className)} {...props}>
      {children}
    </Tag>
  );
};
