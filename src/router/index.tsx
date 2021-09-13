import {createBrowserNavigation, lazy, mount, redirect} from 'navi';

export const routes = mount({
  '/home': lazy(() => import('@modules/home/home.router')),
  '/auth': lazy(() => import('@modules/auth/auth.router')),
  '/': redirect('/home'),
});

export const navigation = createBrowserNavigation({
  routes,
});
