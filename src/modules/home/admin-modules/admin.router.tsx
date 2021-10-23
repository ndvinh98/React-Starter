import React from 'react';
import {mount, lazy, compose, withView, redirect} from 'navi';
import ContentMamagementLayout from './admin.layout';

export default compose(
  withView(<ContentMamagementLayout />),
  mount({
    '/': redirect('partner-applications'),
    '/partner-applications': lazy(
      () => import('./partner-applications/partner-applications.router'),
    ),
    '/partner-management': lazy(
      () => import('./partner-management/partner-management.router'),
    ),
    '/user-management': lazy(
      () => import('./user-management/user-management.router'),
    ),
    '/content-management': lazy(
      () => import('./content-management/content-mamagement.router'),
    ),
    '/tier-management': lazy(
      () => import('./tier-management/tier-management.router'),
    ),
    '/feedback': lazy(() => import('./feedback/feedback.router')),
    '/your-profile': lazy(() => import('./profile/profile.router')),
    '/system-settings': lazy(
      () => import('./system-settings/system-settings.router'),
    ),
  }),
);
