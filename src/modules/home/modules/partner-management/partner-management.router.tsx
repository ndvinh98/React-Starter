import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'list',
    getView: () => import('./pages/company-list'),
  }),
  '/company/:id': route({
    title: 'company-detail',
    getView: () => import('./pages/company-detail'),
  }),
  '/company/:id/user/:id': route({
    title: 'user-detail',
    getView: () => import('./pages/staff-detail'),
  }),
});
