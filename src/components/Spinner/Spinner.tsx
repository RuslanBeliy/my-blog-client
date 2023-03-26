import { FC } from 'react';
import { Triangle } from 'react-loader-spinner';

import s from './Spinner.module.scss';

interface Props {}

export const Spinner: FC<Props> = () => {
  return (
    <Triangle
      height='80'
      width='80'
      color='#7982ff'
      ariaLabel='triangle-loading'
      wrapperStyle={{}}
      wrapperClassName=''
      visible={true}
    />
  );
};
