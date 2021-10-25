import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'received-list',
    getView: () => import('./pages/received-list'),
  }),
  '/received': route({
    title: 'received-list',
    getView: () => import('./pages/received-list'),
  }),
  '/received/:id': route({
    title: 'detail',
    getView: () => import('./pages/received-detail'),
  }),
  '/sent': route({
    title: 'sent-list',
    getView: () => import('./pages/sent-list'),
  }),
  '/sent/:id': route({
    title: 'detail',
    getView: () => import('./pages/sent-detail'),
  }),
  '/send-file': route({
    title: 'send-file-transfer',
    getView: () => import('./pages/send-file-transfer'),
  }),
});
