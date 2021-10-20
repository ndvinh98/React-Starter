import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'line-of-group-list',
    getView: () => import('./pages/list'),
  }),
  '/detail/:id': route({
    title: 'line-of-group-detail',
    getView: () => import('./pages/detail'),
  }),
});
