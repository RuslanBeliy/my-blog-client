import clsx from 'clsx';
import { FC } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';

import s from './ListOfComments.module.scss';

import { useAppDispatch, useAuthorPost } from '../../hooks';
import { routes } from '../../router/routes';
import { removeComment } from '../../store/slices/post/postSlice';
import { Comment } from '../../types/Post';
import { cutFirstLetter } from '../../utils';

interface Props extends Comment {
  className?: string;
  isFullPost?: boolean;
}

export const CommentItem: FC<Props> = ({
  _id,
  className,
  text,
  postId,
  author,
  isFullPost = false,
}) => {
  const authorName = author ? author.userName : 'DELETED';
  const userWithoutImg = cutFirstLetter(authorName);
  const dispatch = useAppDispatch();
  const isAuthor = useAuthorPost(author?._id ?? '');

  const handleRemoveComment = () => {
    dispatch(removeComment({ commentId: _id, postId }));
  };

  const wrapLink = (el: JSX.Element) => {
    return isFullPost ? (
      el
    ) : (
      <Link to={`${routes.fullPost}/${postId}`} key={postId} className={s.linkTo}>
        {el}
      </Link>
    );
  };
  return (
    <div className={clsx(s.commentItem, className)}>
      {isFullPost && isAuthor && (
        <div className={s.controlBlock}>
          <TiDeleteOutline onClick={handleRemoveComment} />
        </div>
      )}

      {wrapLink(
        <>
          <div className={s.avatar}>
            {author?.avatarUrl ? (
              <img src={author.avatarUrl} alt={author.userName} />
            ) : (
              <span>{userWithoutImg}</span>
            )}
          </div>
          <div className={s.info}>
            <div className={s.name}>{authorName}</div>
            <div className={s.comment}>{text}</div>
          </div>
        </>
      )}
    </div>
  );
};
