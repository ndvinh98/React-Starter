import {request} from '@services';
import {IMe} from '@types';
import {ELocalStorage} from '@constants';

export const fetchMe = (): Promise<IMe> => {
  return request({
    method: 'GET',
    path: '/partnerUsers/me',
  }).then(([res, err]) => {
    if (err) {
      localStorage.removeItem(ELocalStorage.ACCESS_TOKEN);
      return null;
    }
    return res?.data?.data;
  });
};
