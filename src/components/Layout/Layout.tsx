import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import s from './Layout.module.scss';

import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../../hooks';
import { userMe } from '../../store/slices/auth/authSlice';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { SpinnerDots } from '../Spinner';

interface Props {}

export const Layout: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const [firstLoading, setFirstLoading] = useState(true);
  useEffect(() => {
    (async () => {
      await dispatch(userMe());
      setFirstLoading(false);
    })();
  }, []);

  return (
    <>
      {firstLoading ? (
        <div className={s.spinner}>
          <SpinnerDots />
        </div>
      ) : (
        <div className={s.layout}>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
          <ToastContainer position='bottom-right' />
        </div>
      )}
    </>
  );
};
