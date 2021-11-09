import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'list',
    getView: () => import('./pages/company-list'),
  }),
  '/company/:companyId': route({
    title: 'company-detail',
    getView: () => import('./pages/company-detail'),
  }),

  '/company/:companyId/user/:userId': route({
    title: 'user-detail',
    getView: () => import('./pages/staff-detail'),
  }),
});
