import {mount, map, redirect} from 'navi';
import {useHomeController} from './home.controller';
import {useConfigStore} from '@services/config';
import AdminRouter from './admin-modules/admin.router';
import SalesRouter from './sales-modules/sales.router';

useConfigStore.getState?.()?.initDashboardConfig?.();

export default mount({
  '*': map(async (request) => {
    const {guard} = useHomeController.getState();
    const ROUTER = {
      admin: AdminRouter,
      sales: SalesRouter,
      deactived: redirect(
        '/auth/login?redirectTo=' + encodeURIComponent(request.originalUrl),
        {exact: false},
      ),
      unauthorized: redirect(
        '/auth/login?redirectTo=' + encodeURIComponent(request.originalUrl),
        {exact: false},
      ),
    };
    return guard().then((res) => {
      return ROUTER?.[res];
    });
  }),
});
