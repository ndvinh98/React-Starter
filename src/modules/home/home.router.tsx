import React from 'react';
import {mount, route, map, redirect, withView, compose, lazy} from 'navi';
import HomeLayout from './home.layout';

import {useHomeController} from './controller';

export default compose(
  withView(<HomeLayout />),
  mount({
    '*': map(async (request) => {
      const {guard} = useHomeController.getState();
      return guard().then((res) => {
        return res
          ? mount({
              '/': route({
                title: 'Dashboard',
                getView: () => import('./modules/dashboard'),
              }),
              '/partner-applications': lazy(
                () =>
                  import(
                    './modules/partner-applications/partner-applications.router'
                  ),
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
