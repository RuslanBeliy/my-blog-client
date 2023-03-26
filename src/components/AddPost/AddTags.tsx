import { FC, useState } from 'react';

import s from './AddPost.module.scss';

import { Button } from '../Button';
import { TagItem } from '../ListOfTags/TagItem';

interface Props {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (idx: number) => void;
}

export const AddTags: FC<Props> = ({ addTag, removeTag, tags }) => {
  const [tagField, setTagField] = useState('');

  const onClick = () => {
    if (!tagField || tags.includes(tagField)) return;
    addTag(tagField);
    setTagField('');
  };

  return (
    <div className={s.addTags}>
      <div className={s.tags}>
        {tags.map((tag, i) => (
          <TagItem key={i} onClick={() => removeTag(i)} text={tag} closeTag />
        ))}
      </div>
      <div className={s.addTag}>
        <input
          placeholder='Добавить тэг'
          type='text'
          value={tagField}
          onChange={(e) => setTagField(e.target.value)}
        />{' '}
        <Button type='button' onClick={onClick} size='sm' variant='outline'>
          Добавить
        </Button>
      </div>
    </div>
  );
};
