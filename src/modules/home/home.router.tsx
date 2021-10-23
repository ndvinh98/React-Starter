import React from 'react';
import {mount, map, redirect, withView, compose, lazy} from 'navi';
import HomeLayout from './home.layout';
import {useHomeController} from './home.controller';
import {useConfigStore} from '@services/config';

useConfigStore.getState?.()?.initDashboardConfig?.();

export default compose(
  withView(<HomeLayout />),
  mount({
    '*': map(async (request) => {
      const {guard} = useHomeController.getState();
      return guard().then((res) => {
        console.log('🚀 ~ res', res);
        return res === 'admin'
          ? mount({
              '/': redirect('partner-applications'),
              '/partner-applications': lazy(
                () =>
                  import(
                    './admin-modules/partner-applications/partner-applications.router'
                  ),
              ),
              '/partner-management': lazy(
                () =>
                  import(
                    './admin-modules/partner-management/partner-management.router'
                  ),
              ),
              '/user-management': lazy(
                () =>
                  import(
                    './admin-modules/user-management/user-management.router'
                  ),
              ),
              '/content-management': lazy(
                () =>
                  import(
                    './admin-modules/content-management/content-mamagement.router'
                  ),
              ),
              '/tier-management': lazy(
                () =>
                  import(
                    './admin-modules/tier-management/tier-management.router'
                  ),
              ),
              '/feedback': lazy(
                () => import('./admin-modules/feedback/feedback.router'),
              ),
              '/your-profile': lazy(
                () => import('./admin-modules/profile/profile.router'),
              ),
              '/system-settings': lazy(
                () =>
                  import(
                    './admin-modules/system-settings/system-settings.router'
                  ),
              ),
            })
          : res === 'sales'
          ? mount({
              '/': redirect('partner-applications'),
              '/partner-applications': lazy(
                () =>
                  import(
                    './admin-modules/partner-applications/partner-applications.router'
                  ),
              ),
              '/partner-management': lazy(
                () =>
                  import(
                    './admin-modules/partner-management/partner-management.router'
                  ),
              ),
              '/user-management': lazy(
                () =>
                  import(
                    './admin-modules/user-management/user-management.router'
                  ),
              ),
              '/content-management': lazy(
                () =>
                  import(
                    './admin-modules/content-management/content-mamagement.router'
                  ),
              ),
              '/tier-management': lazy(
                () =>
                  import(
                    './admin-modules/tier-management/tier-management.router'
                  ),
              ),
              '/feedback': lazy(
                () => import('./admin-modules/feedback/feedback.router'),
              ),
              '/your-profile': lazy(
                () => import('./admin-modules/profile/profile.router'),
              ),
              '/system-settings': lazy(
                () =>
                  import(
                    './admin-modules/system-settings/system-settings.router'
                  ),
              ),
            })
          : res === 'deactived'
          ? redirect(
              '/auth/login?redirectTo=' +
                encodeURIComponent(request.originalUrl),
              {exact: false},
            )
          : res === 'unauthorized'
          ? redirect(
              '/auth/login?redirectTo=' +
                encodeURIComponent(request.originalUrl),
              {exact: false},
            )
          : null;
      });
    }),
  }),
);
