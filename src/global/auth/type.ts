import {IMe} from '@types';

export interface IAuthStore {
  isLoading?: boolean;
  isChecked?: boolean;
  toPath?: string;
  me?: IMe;
  accessToken?: string;
  logout?: () => void;
  getMe?: () => Promise<IMe>;
  clearMe?: () => void;
  loginVerifyOtp?: ({email, otpCode}: {email: string; otpCode: string}) => void;
  getToken?: () => boolean | string;
  setToken?: (token: string) => void;
  checkUserRole?: () => any;
}
