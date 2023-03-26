import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import s from './SidebarBoxLayout.module.scss';

import { Button, Textarea } from '..';
import { useAppDispatch } from '../../hooks';
import { addComment } from '../../store/slices/post/postSlice';

interface Props {}

export const AddComment: FC<Props> = () => {
  const { id } = useParams();

  const [comment, setComment] = useState('');
  const dispatch = useAppDispatch();

  const onClick = () => {
    if (comment && id) {
      dispatch(addComment({ comment, postId: id }));
      setComment('');
    }
  };
  return (
    <div className={s.addComment}>
      <Textarea
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder='Оставить комментарий'
        className={s.textarea}
      />
      <Button onClick={onClick} variant='outline' size='sm'>
        Отправить
      </Button>
    </div>
  );
};
