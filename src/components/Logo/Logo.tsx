import { FC } from 'react';
import { Link } from 'react-router-dom';

import s from './Logo.module.scss';

import { ReactComponent as LogoIcon } from '../../assets/blogger.svg';
import { routes } from '../../router/routes';

interface Props {}

export const Logo: FC<Props> = () => {
  return (
    <Link to={routes.index} className={s.logo}>
      <LogoIcon />
    </Link>
  );
};
