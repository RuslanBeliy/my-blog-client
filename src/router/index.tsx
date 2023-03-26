import { createBrowserRouter } from 'react-router-dom';

import { routes } from './routes';

import { Layout, PrivateRoutes } from '../components';
import {
  AddPostPage,
  FullPostPage,
  HomePage,
  LoginPage,
  RegisterPage,
  EditPostPage,
  UserPage,
  NotFoundPage,
} from '../pages';

export const router = createBrowserRouter([
  {
    path: routes.index,
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: routes.login, element: <LoginPage /> },
      { path: routes.register, element: <RegisterPage /> },
      { path: routes.fullPost + '/:id', element: <FullPostPage /> },
      {
        element: <PrivateRoutes />,
        children: [
          { path: routes.addPost, element: <AddPostPage /> },
          { path: routes.userPage, element: <UserPage /> },
          { path: routes.editPost + '/:id', element: <EditPostPage /> },
        ],
      },
    ],
  },
]);
