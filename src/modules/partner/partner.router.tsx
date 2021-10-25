import React from 'react';
import {mount, lazy, compose, withView} from 'navi';
import PartnerLayout from './partner.layout';

export default compose(
  withView(<PartnerLayout />),
  mount({
    '/:partnerId': lazy(() => import('./content/content.router')),
  }),
);
