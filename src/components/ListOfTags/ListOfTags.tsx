import { FC } from 'react';

import s from './ListOfTags.module.scss';
import { TagItem } from './TagItem';

import { useAppSelector } from '../../hooks';
import { tagsSelector } from '../../store/slices/tags/tagsSelector';
import { FetchStatus } from '../../types';
import { SpinnerDots } from '../Spinner';

interface Props {
  activeTag: string;
  handleActiveTag: (tag: string) => void;
}

export const ListOfTags: FC<Props> = ({ activeTag, handleActiveTag }) => {
  const { status, tags } = useAppSelector(tagsSelector);

  return (
    <div className={s.wrap}>
      {status === FetchStatus.Loading || status === FetchStatus.Idle ? (
        <div className={s.spinner}>
          <SpinnerDots />
        </div>
      ) : (
        tags.map((el, i) => (
          <TagItem onClick={() => handleActiveTag(el)} key={i} text={el} activeTag={activeTag} />
        ))
      )}
    </div>
  );
};
