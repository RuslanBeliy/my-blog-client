import { FC, useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import s from './UpdatePost.module.scss';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { routes } from '../../router/routes';
import { postSelector } from '../../store/slices/post/postSelectors';
import { updatePost } from '../../store/slices/post/postSlice';
import { uploadImageSelector } from '../../store/slices/uploadImage/uploadImageSelector';
import { uploadImage, uploadImageActions } from '../../store/slices/uploadImage/uploadImageSlice';
import { AddTags } from '../AddPost/AddTags';
import { Button } from '../Button';

interface Props {
  id: string;
}

interface Inputs {
  title: string;
  text: string;
}

export const UpdatePost: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { post } = useAppSelector(postSelector);
  const { imageUrl } = useAppSelector(uploadImageSelector);
  const [tags, setTags] = useState<string[]>(post?.tags ?? []);
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const addTag = (tag: string) => {
    setTags((prev) => [...prev, tag]);
  };

  const removeTag = (idx: number) => {
    setTags((prev) => prev.filter((_, i) => idx !== i));
  };

  const clearUpload = () => {
    dispatch(uploadImageActions.clearUpload());
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await dispatch(updatePost({ id, body: { ...data, tags, imageUrl } }));
    navigate(routes.index);
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    dispatch(uploadImage(formData));
  };

  useEffect(() => {
    dispatch(uploadImageActions.setUpload(post?.imageUrl ?? ''));
    setValue('title', post?.title ?? '');
    setValue('text', post?.text ?? '');
  }, []);

  const titleError = errors.title && (
    <span className={s.lableError}>Заголовок должен содержать минимум 3 символа</span>
  );
  const textError = errors.text && (
    <span className={s.lableError}>Ваш пост должен содержать минимум 10 символов</span>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.updatePost}>
      <div>
        <input onChange={handleChangeFile} ref={fileRef} type='file' style={{ display: 'none' }} />
        <button type='button' onClick={() => fileRef.current?.click()} className={s.inputFile}>
          Загрузить превью
        </button>
      </div>
      {imageUrl && (
        <div className={s.img}>
          <span onClick={clearUpload}>Удалить фото</span>
          <img src={imageUrl} alt={imageUrl} />
        </div>
      )}
      <div className={s.inputTitle}>
        <input
          {...register('title', { required: true, minLength: 3 })}
          type='text'
          placeholder='Заголовок статьи...'
        />

        {titleError}
      </div>
      <div className={s.textAreaWrap}>
        <textarea
          {...register('text', { required: true, minLength: 10 })}
          placeholder='Введите текст...'
          className={s.textarea}
        />
        {textError}
      </div>
      <div className={s.wrap}>
        <AddTags tags={tags} addTag={addTag} removeTag={removeTag} />
        <Button>Изменить пост</Button>
      </div>
    </form>
  );
};
