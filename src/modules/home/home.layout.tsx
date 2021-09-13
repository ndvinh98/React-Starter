import React from 'react';
import {NotFoundBoundary} from 'react-navi';
import NotFound from '@components/404NotFound';

function HomeLayout({children}: any) {
  return (
    <div>
      <div>This is home header</div>
      <NotFoundBoundary render={() => <NotFound />}>
        {children}
      </NotFoundBoundary>
    </div>
  );
}

export default HomeLayout;
