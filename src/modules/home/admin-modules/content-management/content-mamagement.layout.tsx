import React from 'react';
import {View, NotFoundBoundary} from 'react-navi';
import NotFound from '@components/404NotFound';

import {useContentManagementController} from './content-mamagement.controller';

function ContentMamagementLayout() {
  const {getAllLineBusiness} = useContentManagementController();

  React.useEffect(() => {
    getAllLineBusiness();
  }, []);

  return (
    <NotFoundBoundary render={() => <NotFound />}>
      <View />
    </NotFoundBoundary>
  );
}

export default React.memo(ContentMamagementLayout);
