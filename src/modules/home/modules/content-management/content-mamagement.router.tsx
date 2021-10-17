import {mount, lazy} from 'navi';

export default mount({
  '/line-of-business': lazy(() => import('./modules/LineofBusiness/router')),
  '/line-of-product': lazy(() => import('./modules/LineofProduct/router')),
  '/product-group': lazy(() => import('./modules/ProductGroup/router')),
  '/products': lazy(() => import('./modules/Products/router')),
  '/modules': lazy(() => import('./modules/Modules/router')),
  '/resources': lazy(() => import('./modules/Resources/router')),
});
