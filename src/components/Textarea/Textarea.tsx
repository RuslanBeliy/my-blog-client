import clsx from 'clsx';
import { FC } from 'react';

import s from './Textarea.module.scss';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: FC<Props> = ({ className, ...props }) => {
  return <textarea className={clsx(s.textarea, className)} {...props}></textarea>;
};
