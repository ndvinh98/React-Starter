import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'list',
    getView: () => import('./pages/user-management.list'),
  }),
  '/:id': route({
    title: 'detail',
    // getView: () => import('./pages/partner-applications.detail'),
  }),
});
