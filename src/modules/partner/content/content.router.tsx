import {mount, route} from 'navi';

export default mount({
  '/1': route({
    title: 'list',
    getView: () => import('./pages/Main'),
  }),
  '/1/:lineOfProductId': route({
    title: 'list',
    getView: () => import('./pages/LineOfProduct'),
  }),
  '/1/:lineOfProductId/:productGroupId': route({
    title: 'list',
    getView: () => import('./pages/ProductGroup'),
  }),
  '/1/:lineOfProductId/:productGroupId/:productId': route({
    title: 'list',
    getView: () => import('./pages/Product'),
  }),
  '/1/:lineOfProductId/:productGroupId/:productId/:moduleId': route({
    title: 'list',
    getView: () => import('./pages/Module'),
  }),
});
