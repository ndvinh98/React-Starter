import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'line-of-business-list',
    getView: () => import('./pages/list'),
  }),
  '/list-resources/product/:id': route({
    title: 'line-of-business-list',
    getView: () => import('./pages/list-resources'),
  }),
  '/add-new-video': route({
    title: 'line-of-business-list',
    getView: () => import('./pages/add-new-video'),
  }),
  '/add-new-document': route({
    title: 'line-of-business-list',
    getView: () => import('./pages/add-new-document'),
  }),
  '/add-new': route({
    title: 'line-of-business-add',
    getView: () => import('./pages/add-new'),
  }),
});
