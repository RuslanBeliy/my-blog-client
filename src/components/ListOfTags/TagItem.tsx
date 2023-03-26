import clsx from 'clsx';
import { FC } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import s from './ListOfTags.module.scss';

interface Props {
  text: string;
  onClick?: () => void;
  activeTag?: string;
  closeTag?: boolean;
}

export const TagItem: FC<Props> = ({ text, onClick, activeTag, closeTag = false }) => {
  return (
    <div onClick={onClick} className={clsx(s.tagItem, activeTag === text && s.activeTag)}>
      {text}
      {closeTag && <AiOutlineCloseCircle />}
    </div>
  );
};
