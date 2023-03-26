import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { routes } from '../../router/routes';

interface Props {}

export const PrivateRoutes: FC<Props> = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={routes.login} />;
};
