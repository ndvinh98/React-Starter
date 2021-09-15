import React from 'react';
import {useRouter} from '@utils/hooks';
import {useRouterController} from '@modules/router';

function Main() {
  const {push} = useRouter();
  const {path} = useRouterController();
  return (
    <div>
      This is list page
      <button onClick={() => push(path + '/detail/1')}>go 1</button>
    </div>
  );
}

export default Main;
