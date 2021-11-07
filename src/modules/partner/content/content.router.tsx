import {mount, route} from 'navi';

export default mount({
  '/': route({
    title: 'splashScreen',
    getView: () => import('./pages/SplashScreen'),
  }),
  '/:lineOfBusinessId': route({
    title: 'list',
    getView: () => import('./pages/Main'),
  }),
  '/:lineOfBusinessId/:lineOfProductId': route({
    title: 'list',
    getView: () => import('./pages/LineOfProduct'),
  }),
  '/:lineOfBusinessId/:lineOfProductId/:productGroupId': route({
    title: 'list',
    getView: () => import('./pages/ProductGroup'),
  }),
  '/:lineOfBusinessId/:lineOfProductId/:productGroupId/:productId': route({
    title: 'list',
    getView: () => import('./pages/Product'),
  }),
  '/:lineOfBusinessId/:lineOfProductId/:productGroupId/:productId/:moduleId':
    route({
      title: 'list',
      getView: () => import('./pages/Module'),
    }),
});
