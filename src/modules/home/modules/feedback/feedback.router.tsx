import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'main',
    getView: () => import('./pages/feedback-list'),
  }),
  '/:id': route({
    title: 'detail',
    getView: () => import('./pages/feedback-detail'),
  }),
});
