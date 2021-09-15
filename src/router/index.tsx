import {createBrowserNavigation, lazy, mount, redirect} from 'navi';
import {useRouterController} from '@modules/router';

export const routes = mount({
  '/home': lazy(() => import('@modules/home/home.router')),
  '/auth': lazy(() => import('@modules/auth/auth.router')),
  '/': redirect('/home'),
});

export const navigation = createBrowserNavigation({
  routes,
});

navigation.subscribe(() =>
  navigation
    .getRoute()
    .then((route) => useRouterController.getState().setCurrentRoute(route)),
);
