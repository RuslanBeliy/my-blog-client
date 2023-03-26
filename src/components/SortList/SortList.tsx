import clsx from 'clsx';
import { FC} from 'react';

import s from './SortList.module.scss';

import { ISortList, sortList } from '../../constants';

interface Props {
  className?: string;
  activeSort: ISortList;
  handleActiveSort: (item: ISortList) => void;
}

export const SortList: FC<Props> = ({ className, activeSort, handleActiveSort }) => {
  return (
    <div className={clsx(s.sortList, className)}>
      {sortList.map((el, i) => (
        <div
          onClick={() => handleActiveSort(el)}
          className={clsx(s.sortItem, activeSort.name === el.name && s.active)}
          key={i}
        >
          {el.name}
        </div>
      ))}
    </div>
  );
};
