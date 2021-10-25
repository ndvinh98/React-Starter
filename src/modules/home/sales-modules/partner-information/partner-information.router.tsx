import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'list',
    getView: () => import('./pages/list'),
  }),
  '/company/:id': route({
    title: 'company-detail',
    getView: () => import('./pages/company-detail'),
  }),
  '/company/:id/user/:userId': route({
    title: 'user-detail',
    getView: () => import('./pages/staff-sale-detail'),
  }),
});
