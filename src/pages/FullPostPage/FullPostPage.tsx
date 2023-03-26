import { FC, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import s from './FullPostPage.module.scss';

import {
  Container,
  Error,
  ListOfComments,
  PostItem,
  SidebarBoxLayout,
  Spinner,
} from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postSelector } from '../../store/slices/post/postSelectors';
import { getOnePost, postActions } from '../../store/slices/post/postSlice';
import { FetchStatus } from '../../types';

interface Props {}

export const FullPostPage: FC<Props> = () => {
  const { id } = useParams();
  const { post, status, message } = useAppSelector(postSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    id && dispatch(getOnePost(id));

    return () => {
      dispatch(postActions.clearPostState());
    };
  }, []);

  if (status === FetchStatus.Error) {
    return <Error text={message} />;
  }

  return (
    <Container className={s.fullPostPage}>
      {status === FetchStatus.Loading || status === FetchStatus.Idle ? (
        <div className={s.spinner}>
          <Spinner />
        </div>
      ) : (
        <>
          <div className={s.post}>{post && <PostItem isFullPost {...post} />}</div>
          <div className={s.sidebarBoxLayout}>
            <SidebarBoxLayout isFullPost title='Комментарии'>
              {post && <ListOfComments comments={post.comments} isFullPost />}
            </SidebarBoxLayout>
          </div>
        </>
      )}
    </Container>
  );
};
