import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'list',
    getView: () => import('./pages/list'),
  }),
});
