import { FC, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import s from './AddPost.module.scss';
import { AddTags } from './AddTags';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { routes } from '../../router/routes';
import { addPost } from '../../store/slices/post/postSlice';
import { uploadImageSelector } from '../../store/slices/uploadImage/uploadImageSelector';
import { uploadImage, uploadImageActions } from '../../store/slices/uploadImage/uploadImageSlice';
import { Button } from '../Button';

interface Props {}

interface Inputs {
  title: string;
  text: string;
}

export const AddPost: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { imageUrl } = useAppSelector(uploadImageSelector);
  const [tags, setTags] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    dispatch(uploadImage(formData));
  };

  const addTag = (tag: string) => {
    setTags((prev) => [...prev, tag]);
  };

  const removeTag = (idx: number) => {
    setTags((prev) => prev.filter((_, i) => idx !== i));
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await dispatch(addPost({ ...data, tags, imageUrl }));
    navigate(routes.index);
  };

  useEffect(() => {
    return () => {
      dispatch(uploadImageActions.clearUpload());
    };
  }, []);

  const titleError = errors.title && (
    <span className={s.lableError}>Заголовок должен содержать минимум 3 символа</span>
  );
  const textError = errors.text && (
    <span className={s.lableError}>Ваш пост должен содержать минимум 10 символов</span>
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.addPost}>
      <div>
        <input onChange={handleChangeFile} ref={fileRef} type='file' style={{ display: 'none' }} />
        <button type='button' onClick={() => fileRef.current?.click()} className={s.inputFile}>
          Загрузить превью
        </button>
      </div>
      {imageUrl && (
        <div className={s.img}>
          <span onClick={() => dispatch(uploadImageActions.clearUpload())}>Удалить фото</span>
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
        <Button>Опубликовать пост</Button>
      </div>
    </form>
  );
};
