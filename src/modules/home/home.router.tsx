import React from 'react';
import {mount, route, map, redirect, withView, compose} from 'navi';
import HomeLayout from './home.layout';
import {View} from 'react-navi';

export default compose(
  withView((request) => (
    <HomeLayout mountpath={request.mountpath || '/'}>
      <View />
    </HomeLayout>
  )),
  mount({
    '*': map((request) =>
      !localStorage.getItem('token')
        ? redirect(
            '/auth/login?redirectTo=' + encodeURIComponent(request.originalUrl),
            {exact: false},
          )
        : mount({
            '/': route({
              title: 'Main',
              getView: () => import('./pages/Main'),
            }),
            '/use-manager': route({
              title: 'Main',
              getView: () => import('./pages/Main'),
            }),
          }),
    ),
  }),
);
