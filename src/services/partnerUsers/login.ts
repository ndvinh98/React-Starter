import {request} from '@services';
import {IPartnerUsers} from '@types';

export const login = (
  email: string,
  password: string,
): Promise<IPartnerUsers> => {
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
    return res?.data?.data?.partnerUsers as IPartnerUsers;
  });
};
