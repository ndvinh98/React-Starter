import React from 'react';
import {mount, route, compose, withView, map, redirect} from 'navi';
import {View} from 'react-navi';

import AuthLayout from './auth.layout';
import {useAuthStore} from '@modules/auth';

export default compose(
  withView((request) => (
    <AuthLayout mountpath={request.mountpath || '/'}>
      <View />
    </AuthLayout>
  )),
  mount({
    '*': map(() =>
      useAuthStore.getState().getToken()
        ? redirect('/home', {exact: false})
        : mount({
            '/': redirect('login'),
            '/login': route({
              title: 'Home',
              getView: () => import('./pages/Login'),
            }),
            '/2fa': route({
              title: '2FA',
              getView: () => import('./pages/FA2'),
            }),
          }),
    ),
  }),
);
