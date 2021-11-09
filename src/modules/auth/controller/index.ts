import {fetchMe} from '@services/partnerUsers/fetchMe';
import create from 'zustand';
import {ELocalStorage} from '@constants';
import {navigation} from '@router';
import {login, loginVerifyOtp} from '@services';
import {IMe} from '@types';

export interface IAuthController {
  me: IMe;
  isLoading: boolean;
  accessToken?: string;
  login: (email: string, password: string) => void;
  logout: () => void;
  getToken: () => string;
  loginVerifyOtp: (email: string, otp: string) => any;
  getMe?: () => Promise<IMe>;
}
const {ACCESS_TOKEN, REMEMBER_ACCESS_TOKEN} = ELocalStorage;

export const useAuthController = create<IAuthController>((set, get) => ({
  me: {},
  accessToken: '',
  isLoading: false,
  login: (email: string, password: string) => {
    set({isLoading: true});
    login(email, password)
      .then((user) => {
        if (user?.isActive) {
          navigation.navigate(`/auth/2fa?email=${user?.email}`);
        }
      })
      .finally(() => set({isLoading: false}));
  },
  loginVerifyOtp: (email: string, otpCode: string) => {
    loginVerifyOtp({email, otpCode}).then((auth) => {
      if (auth?.token) {
        localStorage.setItem(ELocalStorage.ACCESS_TOKEN, String(auth.token));
        set({accessToken: auth.token});
        navigation.navigate('/');
        // setTimeout(() => {
        //   location.reload();
        // }, 100);
      }
    });
  },
  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN);
    set({me: {}, accessToken: null});
    navigation.navigate(`/auth/login`);
    location.reload();
  },
  getToken: () => {
    const {accessToken} = get();
    const isRemember = !!+localStorage.getItem(REMEMBER_ACCESS_TOKEN);
    const localStorageToken = localStorage.getItem(ACCESS_TOKEN);
    return (isRemember && localStorageToken) || accessToken;
  },
  getMe: async () => {
    const me = await fetchMe();
    set({me});
    return me;
  },
}));
