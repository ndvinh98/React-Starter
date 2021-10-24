import React from 'react';
import {mount, lazy, compose, withView, redirect} from 'navi';
import ContentMamagementLayout from './sales.layout';

export default compose(
  withView(<ContentMamagementLayout />),
  mount({
    '/': redirect('partner-information'),
    '/file-transfer': lazy(
      () => import('./file-transfer/file-transfer.router'),
    ),
    '/partner-content': lazy(
      () => import('./partner-content/partner-content.router'),
    ),
    '/partner-information': lazy(
      () => import('./partner-information/partner-information.router'),
    ),
    '/your-profile': lazy(() => import('./profile/profile.router')),
    '/notification': lazy(() => import('./notification/notification.router')),
  }),
);
