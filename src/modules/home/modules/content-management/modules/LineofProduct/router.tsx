import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'line-of-product-list',
    getView: () => import('./pages/list'),
  }),
  '/add-new': route({
    title: 'line-of-product-add',
    getView: () => import('./pages/add-new'),
  }),
  '/edit/:id': route({
    title: 'line-of-business-add',
    getView: () => import('./pages/edit'),
  }),
});
