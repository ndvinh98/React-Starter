import React from 'react';
import {mount, route, compose, withView, map, redirect} from 'navi';
import {View} from 'react-navi';

import AuthLayout from './auth.layout';

export default compose(
  withView((request) => (
    <AuthLayout mountpath={request.mountpath || '/'}>
      <View />
    </AuthLayout>
  )),
  mount({
    '*': map(() =>
      localStorage?.getItem('token')
        ? redirect('/dashboard', {exact: false})
        : mount({
            '/': route({
              title: 'Home',
              getView: () => import('./pages/Login'),
            }),
            '/login': route({
              title: 'Home',
              getView: () => import('./pages/Login'),
            }),
            '/register': route({
              title: 'Register',
              getView: () => import('./pages/Login'),
            }),
          }),
    ),
  }),
);
