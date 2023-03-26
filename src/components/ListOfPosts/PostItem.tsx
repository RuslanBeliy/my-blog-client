import clsx from 'clsx';
import { FC } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom';

import { FeedbackBlock } from './FeedbackBlock';
import s from './ListOfPosts.module.scss';
import { UserInfo } from './UserInfo';

import { Title } from '..';
import { useAppDispatch, useAuthorPost } from '../../hooks';
import { routes } from '../../router/routes';
import { removePost } from '../../store/slices/post/postSlice';
import { getPosts } from '../../store/slices/posts/postsSlice';
import { Post } from '../../types/Post';
import { textСropping } from '../../utils';

interface Props extends Post {
  className?: string;
  isFullPost?: boolean;
}

export const PostItem: FC<Props> = ({
  _id,
  className,
  imageUrl,
  title,
  text,
  author,
  createdAt,
  viewsCount,
  comments,
  tags,
  isFullPost = false,
}) => {
  const correctText = isFullPost ? text : textСropping(text, 150);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthor = useAuthorPost(author._id);

  const handleRemovePost = async () => {
    await dispatch(removePost(_id));
    dispatch(getPosts());
    if (isFullPost) {
      navigate(routes.index);
    }
  };

  const wrapLink = (el: JSX.Element) => {
    return !isFullPost ? (
      <Link className={s.postItem} key={_id} to={`${routes.fullPost}/${_id}`}>
        {el}
      </Link>
    ) : (
      el
    );
  };
  return (
    <div className={clsx(s.postItem, className)}>
      {isAuthor && (
        <div className={s.controlBlock}>
          <Link to={`${routes.editPost}/${_id}`}>
            <AiOutlineEdit />
          </Link>
          <TiDeleteOutline onClick={handleRemovePost} />
        </div>
      )}
      {wrapLink(
        <>
          <div className={s.img}>{imageUrl && <img src={imageUrl} alt={title} />}</div>
          <div className={s.content}>
            <UserInfo
              className={s.userBlock}
              avatarUrl={author.avatarUrl}
              userName={author.userName}
              createdAt={createdAt}
            />
            <div className={s.tags}>
              {tags.map((tag, i) => (
                <span key={i} className={s.tag}>
                  #{tag}
                </span>
              ))}
            </div>
            <Title className={s.title}>{title}</Title>
            <div className={s.text}>{correctText}</div>
            <FeedbackBlock viewsCount={viewsCount} commentsCount={comments.length} />
          </div>
        </>
      )}
    </div>
  );
};
