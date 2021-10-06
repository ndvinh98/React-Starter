import React from 'react';
import {mount, map, redirect, withView, compose, lazy} from 'navi';
import HomeLayout from './home.layout';
import {useHomeController} from './controller';
import {useConfigStore} from '@services/config';

useConfigStore.getState?.()?.initDashboardConfig?.();
export default compose(
  withView(<HomeLayout />),
  mount({
    '*': map(async (request) => {
      const {guard} = useHomeController.getState();
      return guard().then((res) => {
        return res
          ? mount({
              '/': redirect('partner-applications'),
              '/partner-applications': lazy(
                () =>
                  import(
                    './modules/partner-applications/partner-applications.router'
                  ),
              ),
              '/partner-management': lazy(
                () =>
                  import(
                    './modules/partner-management/partner-management.router'
                  ),
              ),
              '/user-management': lazy(
                () =>
                  import('./modules/user-management/user-management.router'),
              ),
              '/tier-management': lazy(
                () =>
                  import('./modules/tier-management/tier-management.router'),
              ),
              '/feedback': lazy(
                () => import('./modules/feedback/feedback.router'),
              ),
            })
          : redirect(
              '/auth/login?redirectTo=' +
                encodeURIComponent(request.originalUrl),
              {exact: false},
            );
      });
    }),
  }),
);
