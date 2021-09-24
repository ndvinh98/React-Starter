import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'list',
    getView: () => import('./pages/tier-list'),
  }),
  '/:id': route({
    title: 'detail',
    getView: () => import('./pages/tier-detail'),
  }),
});
