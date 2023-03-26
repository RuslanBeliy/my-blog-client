import { FC } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import s from './Spinner.module.scss';

interface Props {}

export const SpinnerDots: FC<Props> = () => {
  return (
    <ThreeDots
      height='80'
      width='80'
      radius='9'
      color='#7982ff'
      ariaLabel='three-dots-loading'
      wrapperStyle={{}}
      wrapperClassName=''
      visible={true}
    />
  );
};
