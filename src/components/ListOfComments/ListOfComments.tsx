import { FC, useEffect, useRef, useState } from 'react';

import { CommentItem } from './CommentItem';

import s from './ListOfComments.module.scss';

import { useAppSelector } from '../../hooks';
import { commentsSelector } from '../../store/slices/comments/commentsSelector';
import { FetchStatus } from '../../types';
import { Comment } from '../../types/Post';
import { SpinnerDots } from '../Spinner';

interface Props {
  comments: Comment[];
  isFullPost?: boolean;
}

export const ListOfComments: FC<Props> = ({ comments, isFullPost = false }) => {
  const countSlice = useRef(10);
  const { status } = useAppSelector(commentsSelector);
  const [slicesComments, setSlicesComments] = useState<Comment[]>([]);

  const handleSliceComments = () => {
    countSlice.current += 10;
    setSlicesComments(comments.slice(-countSlice.current).reverse());
  };

  useEffect(() => {
    setSlicesComments(comments.slice(-countSlice.current).reverse());
  }, [comments]);
  return (
    <div className={s.listOfComments}>
      {status === FetchStatus.Loading || (status === FetchStatus.Idle && !isFullPost) ? (
        <div className={s.spinner}>
          <SpinnerDots />
        </div>
      ) : (
        slicesComments.map((comment) => (
          <CommentItem key={comment._id} isFullPost={isFullPost} {...comment} />
        ))
      )}
      {isFullPost && comments.length !== slicesComments.length && (
        <div onClick={handleSliceComments} className={s.moreComments}>
          Показать больше комментариев
        </div>
      )}
    </div>
  );
};
