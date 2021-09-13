import create from 'zustand';
import {ELocalStorage} from '@constants';
import {navigation} from '@router';
import {login, loginVerifyOtp} from '@services';
import {IMe} from '@types';

export interface IAuthStore {
  me: IMe;
  isLoading: boolean;
  accessToken?: string;
  login: (email: string, password: string) => void;
  logout: () => void;
  getToken: () => string;
  loginVerifyOtp: (email: string, otp: string) => any;
}
const {ACCESS_TOKEN, REMEMBER_ACCESS_TOKEN} = ELocalStorage;

const useAuthStore = create<IAuthStore>((set, get) => ({
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
  loginVerifyOtp: async (email: string, otpCode: string) => {
    const auth = await loginVerifyOtp({email, otpCode});
    if (auth?.token) {
      localStorage.setItem(ELocalStorage.ACCESS_TOKEN, String(auth.token));
      set({accessToken: auth.token});
      navigation.navigate('/');
    }
  },
  logout: () => {
    set({me: {}, accessToken: ''});
    localStorage.removeItem(ACCESS_TOKEN);
    location.reload();
  },
  getToken: () => {
    const {accessToken} = get();
    const isRemember = !!+localStorage.getItem(REMEMBER_ACCESS_TOKEN);
    const localStorageToken = localStorage.getItem(ACCESS_TOKEN);
    return (isRemember && localStorageToken) || accessToken;
  },
}));

export default useAuthStore;
