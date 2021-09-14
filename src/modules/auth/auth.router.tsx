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
            '/change-password': route({
              title: '2FA',
              getView: () => import('./pages/ChangePassword'),
            }),
            '/forgot-password': route({
              title: 'Forgot Password',
              getView: () => import('./pages/ForgotPassword'),
            }),

            '/forgot-password-verify': route({
              title: 'Forgot Password',
              getView: () => import('./pages/ForgotPasswordVerify'),
            }),

            '/change-password-done': route({
              title: 'Change Password Done',
              getView: () => import('./pages/ChangePasswordDone'),
            }),
          }),
    ),
  }),
);
