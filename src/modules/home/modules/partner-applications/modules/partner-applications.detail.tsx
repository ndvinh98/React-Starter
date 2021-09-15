import React from 'react';
import {useRouterController} from '@modules/router';

function Detail() {
  const {params} = useRouterController();
  return <div>This is detail page {params?.id}</div>;
}

export default Detail;
