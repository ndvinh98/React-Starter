import {request} from '@services';
import {IPartnerUsers} from '@types';

export const loginVerifyOtp = async ({
  email,
  otpCode,
}: {
  email: string;
  otpCode: string;
}): Promise<{partnerUsers: IPartnerUsers; token: string} | null> => {
  return request({
    method: 'POST',
    path: 'partnerUsers/loginVerifyOtp',
    option: {
      data: {
        email,
        otpCode,
      },
    },
  }).then(([res, err]) => {
    if (err) return null;
    return res?.data?.data;
  });
};
