import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'list',
    getView: () => import('./pages/partner-applications.list'),
  }),
  '/:id': route({
    title: 'detail',
    getView: () => import('./pages/partner-applications.detail'),
  }),
});
