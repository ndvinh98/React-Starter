import {mount, route, lazy} from 'navi';

export default mount({
  '/module/:id': route({
    title: 'line-of-business-list',
    getView: () => import('./list-resources'),
  }),
  '/add-video': route({
    title: 'line-of-business-list',
    getView: () => import('./videos/add-new'),
  }),
  '/add-brochures': route({
    title: 'line-of-business-list',
    getView: () => import('./brochures/add-new'),
  }),
});
