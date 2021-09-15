import {useHomeController} from '../home';

export const logs = () => {
  useHomeController.subscribe(($new) => {
    console.log('🚀 ~ $useHomeController', $new);
  });
};
