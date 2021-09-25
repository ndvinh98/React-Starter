import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'main',
    getView: () => import('./pages/feedback-list'),
  }),
  '/:id': route({
    title: 'main',
    getView: () => import('./pages/feedback-list'),
  }),
});
