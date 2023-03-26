import clsx from 'clsx';
import { FC } from 'react';

import s from './ListOfPosts.module.scss';
import { PostItem } from './PostItem';

import { useAppSelector } from '../../hooks';
import { postsSelector } from '../../store/slices/posts/postsSelectors';
import { FetchStatus } from '../../types';
import { SpinnerDots } from '../Spinner';

interface Props {
  className?: string;
}

export const ListOfPosts: FC<Props> = ({ className }) => {
  const { posts, status } = useAppSelector(postsSelector);

  return (
    <div className={clsx(s.listOfPosts, className)}>
      {status === FetchStatus.Loading || status === FetchStatus.Idle ? (
        <div className={s.spinner}>
          <SpinnerDots />
        </div>
      ) : (
        posts.map((post) => <PostItem key={post._id} {...post} />)
      )}
    </div>
  );
};
