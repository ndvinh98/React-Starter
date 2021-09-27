import {request} from '@services';
import {IUsers} from '@types';

export const login = (email: string, password: string): Promise<IUsers> => {
  return request({
    method: 'POST',
    path: '/users/login',
    option: {
      data: {
        email,
        password,
      },
    },
  }).then(([res, err]) => {
    if (err) return null;
    return res?.data?.data?.users as IUsers;
  });
};
