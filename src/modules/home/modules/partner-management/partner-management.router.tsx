import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'list',
    getView: () => import('./pages/partner-management.list'),
  }),
  '/company/:id': route({
    title: 'company-detail',
    // getView: () => import('./pages/partner-applications.detail'),
  }),
});
