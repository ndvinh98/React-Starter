import {mount, route} from 'navi';

export default mount({
  '/appearance': route({
    title: 'appearance',
    getView: () => import('./pages/appearance'),
  }),
  '/domains': route({
    title: 'domains',
    getView: () => import('./pages/domains'),
  }),
});
