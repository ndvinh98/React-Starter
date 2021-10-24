import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'deatail',
    getView: () => import('./pages/profile-detail'),
  }),
});
