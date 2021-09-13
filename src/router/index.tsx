import {lazy, mount, redirect, route} from 'navi';

export const routes = mount({
  '/home': lazy(() => import('@modules/home/home.router')),
  '/auth': lazy(() => import('@modules/auth/auth.router')),
  '/': redirect('/home'),
});
