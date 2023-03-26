import { FC } from 'react';

import s from './AddPostPage.module.scss';

import { AddPost, Container } from '../../components';

interface Props {}

export const AddPostPage: FC<Props> = () => {
  return (
    <Container className={s.addPostPage}>
      <AddPost />
    </Container>
  );
};
