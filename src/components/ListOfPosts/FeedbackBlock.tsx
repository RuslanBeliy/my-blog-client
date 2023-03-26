import { FC } from 'react';

import { AiOutlineEye } from 'react-icons/ai';
import { RiMessage2Line } from 'react-icons/ri';

import s from './ListOfPosts.module.scss';

interface Props {
  viewsCount: number;
  commentsCount: number;
}

export const FeedbackBlock: FC<Props> = ({ viewsCount, commentsCount }) => {
  return (
    <div className={s.feedbackBlock}>
      <div className={s.item}>
        <AiOutlineEye /> {viewsCount}
      </div>
      <div className={s.item}>
        <RiMessage2Line /> {commentsCount}
      </div>
    </div>
  );
};
