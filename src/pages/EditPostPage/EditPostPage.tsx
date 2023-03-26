import { FC, useEffect } from 'react';

import { Navigate, useParams } from 'react-router-dom';

import s from './EditPostPage.module.scss';

import { Container, Error, Spinner, UpdatePost } from '../../components';
import { useAppDispatch, useAppSelector, useAuthorPost } from '../../hooks';
import { routes } from '../../router/routes';
import { postSelector } from '../../store/slices/post/postSelectors';
import { getOnePost, postActions } from '../../store/slices/post/postSlice';
import { uploadImageActions } from '../../store/slices/uploadImage/uploadImageSlice';
import { FetchStatus } from '../../types';

interface Props {}

export const EditPostPage: FC<Props> = () => {
  const { id } = useParams();
  const { status, post, message } = useAppSelector(postSelector);
  const dispatch = useAppDispatch();
  const isAuthor = useAuthorPost(post?.author._id ?? '');

  useEffect(() => {
    id && dispatch(getOnePost(id));
    return () => {
      dispatch(uploadImageActions.clearUpload());
      dispatch(postActions.clearPostState());
    };
  }, []);

  if (status === FetchStatus.Error) {
    return <Error text={message} />;
  }

  return (
    <Container className={s.editPostPage}>
      {status === FetchStatus.Loading || status === FetchStatus.Idle ? (
        <div className={s.spinner}>
          <Spinner />
        </div>
      ) : (
        <>{isAuthor ? <UpdatePost id={id ?? ''} /> : <Navigate to={routes.index} />}</>
      )}
    </Container>
  );
};
