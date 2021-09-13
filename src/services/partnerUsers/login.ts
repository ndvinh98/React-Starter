import {request} from '@services';
import {IPartnerUsers} from '@types';

export const login = async (
  email: string,
  password: string,
): Promise<IPartnerUsers> => {
  const [res, err] = await request({
    method: 'POST',
    path: '/partnerUsers/login',
    option: {
      data: {
        email,
        password,
      },
    },
  });
  if (err) return;
  return res?.data?.data?.partnerUsers as IPartnerUsers;
};
