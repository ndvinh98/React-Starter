import {mount, route} from 'navi';

export default mount({
  '/module/:id': route({
    title: 'line-of-business-list',
    getView: () => import('./pages/list-resources'),
  }),
  '/add-brochures/module/:id': route({
    title: 'line-of-business-list',
    getView: () => import('./pages/brochures/add-new'),
  }),
  'module/brochures/edit/:id': route({
    title: 'line-of-business-list',
    getView: () => import('./pages/brochures/edit'),
  }),
  '/add-videos/module/:id': route({
    title: 'line-of-business-list',
    getView: () => import('./pages/videos/add-new'),
  }),
  'module/videos/edit/:id': route({
    title: 'line-of-business-list',
    getView: () => import('./pages/videos/edit'),
  }),
});
