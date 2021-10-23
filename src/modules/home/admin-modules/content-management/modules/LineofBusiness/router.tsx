import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'line-of-business-list',
    getView: () => import('./pages/list'),
  }),
  '/detail/:id': route({
    title: 'line-of-business-detail',
    getView: () => import('./pages/detail'),
  }),
});
