import { FC, useRef } from 'react';
import { RxAvatar } from 'react-icons/rx';
import { TiDeleteOutline } from 'react-icons/ti';

import s from './RegisterForm.module.scss';

import { useAppDispatch } from '../../hooks';
import { uploadImage, uploadImageActions } from '../../store/slices/uploadImage/uploadImageSlice';

interface Props {
  imageUrl?: string;
}

export const AddAvatar: FC<Props> = ({ imageUrl }) => {
  const dispatch = useAppDispatch();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    dispatch(uploadImage(formData));
  };
  return (
    <div className={s.img}>
      <input onChange={handleChangeFile} ref={fileRef} type='file' style={{ display: 'none' }} />
      {imageUrl ? (
        <>
          <TiDeleteOutline
            className={s.clearUpload}
            onClick={() => dispatch(uploadImageActions.clearUpload())}
          />
          <img src={imageUrl} alt='' onClick={() => fileRef.current?.click()} />
        </>
      ) : (
        <RxAvatar className={s.templateAvatar} onClick={() => fileRef.current?.click()} />
      )}
    </div>
  );
};
