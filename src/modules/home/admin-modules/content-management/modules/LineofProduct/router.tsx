import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'line-of-product-list',
    getView: () => import('./pages/list'),
  }),
  '/detail/:id': route({
    title: 'line-of-product-add',
    getView: () => import('./pages/detail'),
  }),
});
