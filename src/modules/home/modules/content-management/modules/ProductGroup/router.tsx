import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'line-of-group-list',
    getView: () => import('./pages/list'),
  }),
  '/add-new': route({
    title: 'line-of-group-add',
    getView: () => import('./pages/add-new'),
  }),
});
