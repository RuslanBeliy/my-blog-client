import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/es/exports';
import { RouterProvider } from 'react-router-dom';

import './index.scss';
import { router } from './router';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
