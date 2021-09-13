import {request} from '@services';
import {IPartnerUsers} from '@types';

export const loginVerifyOtp = async ({
  email,
  otpCode,
}: {
  email: string;
  otpCode: string;
}): Promise<{partnerUsers: IPartnerUsers; token: string}> => {
  const [res, err] = await request({
    method: 'POST',
    path: 'partnerUsers/loginVerifyOtp',
    option: {
      data: {
        email,
        otpCode,
      },
    },
  });
  if (err) return null;
  return res?.data?.data;
};
