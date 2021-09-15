import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'list',
    getView: () => import('./modules/partner-applications.list'),
  }),
  '/detail/:id': route({
    title: 'detail',
    getView: () => import('./modules/partner-applications.detail'),
  }),
});
