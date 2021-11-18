import {mount, route, Params } from 'navi';

export default mount({
  '/': route({
    title: 'list',
    getView: () => import('./pages/user-management.list'),
  }),
  '/:id': route({
    title: 'detail',
    getView: () => import('./pages/user-management.detail'),
  }),
  '/create-user': route({
    title: 'new',
    getView: () => import('./pages/user-management.new'),
  }),
});
